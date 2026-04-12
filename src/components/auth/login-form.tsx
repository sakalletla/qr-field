"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("from")?.startsWith("/")
    ? searchParams.get("from")!
    : "/dashboard";

  return (
    <>
      <p className="mt-2 text-sm text-on-surface-variant">
        Sign in with <strong className="text-primary">Google</strong> to continue.
      </p>

      <div className="mt-8">
        <GoogleSignInButton label="Continue with Google" callbackUrl={callbackUrl} />
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-on-surface-variant">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="font-medium text-primary underline underline-offset-2">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="font-medium text-primary underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <p className="mt-6 text-center text-sm text-on-surface-variant">
        No account?{" "}
        <Link href="/signup" className="font-semibold text-primary underline underline-offset-2">
          Sign up
        </Link>
      </p>
    </>
  );
}
