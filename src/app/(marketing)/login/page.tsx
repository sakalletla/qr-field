import { Suspense } from "react";
import { StitchMarketingHeader } from "@/components/stitch/stitch-marketing-header";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <StitchMarketingHeader variant="inner" />
      <div className="mx-auto max-w-sm px-6 pb-12 pt-20">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Log in</h1>
        <Suspense
          fallback={<p className="mt-2 text-sm text-on-surface-variant">Loading…</p>}
        >
          <LoginForm />
        </Suspense>
      </div>
    </>
  );
}
