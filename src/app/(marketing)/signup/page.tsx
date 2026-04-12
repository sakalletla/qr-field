import { StitchMarketingHeader } from "@/components/stitch/stitch-marketing-header";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <>
      <StitchMarketingHeader variant="inner" />
      <div className="mx-auto max-w-sm px-6 pb-12 pt-20">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Create account</h1>
        <SignupForm />
      </div>
    </>
  );
}
