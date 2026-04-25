import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold text-primary">Sign-in could not be completed</h1>
      <p className="mt-4 text-sm text-on-surface-variant">
        The sign-in code was missing or invalid. Check Supabase Authentication → URL
        configuration and Google OAuth redirect URLs, then try again.
      </p>
      <Link
        href="/login"
        className="mt-8 inline-block text-sm font-semibold text-primary underline underline-offset-2"
      >
        Back to log in
      </Link>
    </div>
  );
}
