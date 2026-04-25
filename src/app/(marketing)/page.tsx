import Image from "next/image";
import Link from "next/link";
import { StitchMarketingHeader } from "@/components/stitch/stitch-marketing-header";

export default function HomePage() {
  return (
    <>
      <StitchMarketingHeader variant="home" />
      <main className="pb-8 pt-14">
        <section className="flex flex-col items-start bg-surface-container-lowest px-6 py-16">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-primary">
            QR codes that grow with your business
          </h1>
          <p className="mb-8 max-w-[320px] text-base leading-relaxed text-on-surface-variant">
            Unlimited static codes. Dynamic links and full analytics on Pro.
          </p>
          <div className="flex w-full flex-col gap-4">
            <Link
              href="/signup"
              className="border border-primary bg-primary py-4 px-8 text-center font-semibold tracking-tight text-on-primary transition-all active:scale-[0.98]"
            >
              Start free
            </Link>
            <Link
              href="/pricing"
              className="py-2 text-center font-semibold text-primary underline decoration-1 underline-offset-4"
            >
              Pricing
            </Link>
          </div>
        </section>

        <section className="border-t border-outline-variant bg-surface p-4">
          <div className="flex flex-col items-center border border-outline-variant bg-surface-container-lowest p-8">
            <div className="mb-4 border border-primary bg-white p-6">
              <Image
                src="/qr-sample.svg"
                alt=""
                width={128}
                height={128}
                className="h-32 w-32"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-tighter text-on-surface-variant">
              Asset ID: QRF-9920-X
            </span>
          </div>
        </section>

        <section className="bg-surface-container-lowest">
          <div className="border-t border-outline-variant px-6 py-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Standard
              </span>
            </div>
            <h2 className="mb-3 text-2xl font-semibold tracking-tight">Static free forever</h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Create permanent QR codes that never expire. Perfect for menus, contact details, and
              WiFi access points. Zero monthly fees.
            </p>
          </div>
          <div className="border-t border-outline-variant px-6 py-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Advanced
              </span>
            </div>
            <h2 className="mb-3 text-2xl font-semibold tracking-tight">Dynamic URLs</h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Change the destination link without reprinting your QR code. Switch campaigns on the fly
              and track scan trends on Pro.
            </p>
          </div>
          <div className="border-y border-outline-variant px-6 py-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Pro
              </span>
            </div>
            <h2 className="mb-3 text-2xl font-semibold tracking-tight">Branding</h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Logo and colors on your QR codes on Pro—minimal, print-ready exports (PNG/SVG).
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant bg-surface p-8 text-center">
        <p className="mb-4 text-sm font-semibold tracking-tighter">QRField © 2024</p>
        <div className="flex justify-center gap-6 text-[10px] font-medium uppercase tracking-widest text-on-surface-variant">
          <Link href="/privacy" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary">
            Terms
          </Link>
          <span className="cursor-default">Contact</span>
        </div>
      </footer>
    </>
  );
}
