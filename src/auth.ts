import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const googleId = process.env.AUTH_GOOGLE_ID;
const googleSecret = process.env.AUTH_GOOGLE_SECRET;

/**
 * Auth.js requires a non-empty secret. Locally, use AUTH_SECRET in `.env.local`
 * (see `.env.example`). Without it, this dev-only fallback avoids 500s on
 * `/api/auth/session` — replace with a real secret before production.
 */
function authSecret(): string {
  const fromEnv = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  if (process.env.NODE_ENV !== "production") {
    return "qrfield-dev-only-secret-min-32-characters-long!";
  }
  return "";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: authSecret(),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/login" },
  providers: [
    Google({
      clientId: googleId ?? "",
      clientSecret: googleSecret ?? "",
    }),
  ],
});
