import { StitchMarketingHeader } from "@/components/stitch/stitch-marketing-header";
import { StitchMarketingBottomNav } from "@/components/stitch/stitch-marketing-bottom-nav";
import { PricingPlans } from "./pricing-plans";

export default function PricingPage() {
  return (
    <>
      <StitchMarketingHeader variant="inner" />
      <main className="mx-auto max-w-md px-6 pt-12 pb-24">
        <section className="mb-12">
          <h1 className="mb-2 text-4xl font-semibold tracking-tight text-primary">Pricing</h1>
          <p className="font-medium leading-relaxed text-on-surface-variant">
            Fair limits—no surprises
          </p>
        </section>
        <PricingPlans />
      </main>
      <StitchMarketingBottomNav />
    </>
  );
}
