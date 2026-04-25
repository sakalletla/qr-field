import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/demo-session";

const protectedPaths = ["/dashboard", "/create", "/settings", "/billing"];
const codesPrefix = "/codes/";

function isProtected(pathname: string): boolean {
  if (protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;
  if (pathname.startsWith(codesPrefix) && pathname !== "/codes") return true;
  return false;
}

/**
 * Refreshes Supabase session cookies and applies route protection (Supabase or demo cookie).
 */
export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabaseUser: { id: string } | null = null;
  let supabaseResponse = NextResponse.next({ request });

  if (url && key) {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    supabaseUser = user;
  }

  const { pathname } = request.nextUrl;
  const demoSession = !!request.cookies.get(SESSION_COOKIE)?.value;
  const signedIn = !!supabaseUser || demoSession;

  if (pathname === "/login" || pathname === "/signup") {
    if (signedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return supabaseResponse;
  }

  if (!isProtected(pathname)) {
    return supabaseResponse;
  }

  if (!signedIn) {
    const login = new URL("/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  return supabaseResponse;
}
