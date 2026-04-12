import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/demo-session";

const protectedPaths = ["/dashboard", "/create", "/settings", "/billing"];
const codesPrefix = "/codes/";

function isProtected(pathname: string): boolean {
  if (protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true;
  if (pathname.startsWith(codesPrefix) && pathname !== "/codes") return true;
  return false;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const nextAuthUser = !!req.auth?.user;
  const demoSession = !!req.cookies.get(SESSION_COOKIE)?.value;
  const signedIn = nextAuthUser || demoSession;

  if (pathname === "/login" || pathname === "/signup") {
    if (signedIn) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  if (!signedIn) {
    const login = new URL("/login", req.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/create",
    "/create/:path*",
    "/settings",
    "/settings/:path*",
    "/billing",
    "/billing/:path*",
    "/codes/:path*",
    "/login",
    "/signup",
  ],
};
