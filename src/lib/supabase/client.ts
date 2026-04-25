import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for Client Components. Pair with
 * `createServer` in `src/lib/supabase/server.ts` (Server Components / Route Handlers).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createBrowserClient(url, key);
}
