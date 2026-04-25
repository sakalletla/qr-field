"use client";

import Link from "next/link";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

export function SignupForm() {
  return (
    <>
      <p className="mt-2 text-sm text-on-surface-variant">
        Sign in with <strong className="text-primary">Google</strong> to create your account.
      </p>

      <div className="mt-8">
        <GoogleSignInButton label="Continue with Google" callbackPath="/dashboard" />
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
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary underline underline-offset-2">
          Log in
        </Link>
      </p>
    </>
  );
}
