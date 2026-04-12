"use client";

import Link from "next/link";
import { useState } from "react";

export function PricingPlans() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <div className="mb-12 flex w-fit items-center gap-4 border border-outline-variant bg-surface-container-high p-1 hairline">
        <button
          type="button"
          onClick={() => setAnnual(false)}
          className={`px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
            !annual
              ? "bg-primary text-on-primary"
              : "text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setAnnual(true)}
          className={`px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
            annual
              ? "bg-primary text-on-primary"
              : "text-on-surface-variant hover:bg-surface-container-highest"
          }`}
        >
          Annual
        </button>
      </div>

      <div className="space-y-8">
        <div className="hairline border-outline-variant bg-surface-container-lowest p-8">
          <div className="mb-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              Free
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tighter">$0</span>
            </div>
          </div>
          <ul className="mb-10 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-primary">check</span>
              <span>3 dynamic codes</span>
            </li>
            <li className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined mt-0.5">check</span>
              <span>Unlimited static codes</span>
            </li>
            <li className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined mt-0.5">check</span>
              <span>Analytics teaser</span>
            </li>
            <li className="flex items-start gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined mt-0.5">check</span>
              <span>PNG/SVG export</span>
            </li>
          </ul>
          <Link
            href="/signup"
            className="block w-full border border-primary bg-surface-container-lowest py-4 text-center text-sm font-semibold uppercase tracking-widest text-primary transition-all hover:bg-surface-container-low"
          >
            Start free
          </Link>
        </div>

        <div className="relative overflow-hidden border border-primary bg-primary p-8 text-on-primary hairline">
          <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 opacity-10">
            <svg fill="none" height="128" viewBox="0 0 128 128" width="128" aria-hidden>
              <path d="M0 0H128V128H0V0Z" fill="url(#paint0_linear)" />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="0"
                  x2="128"
                  y1="0"
                  y2="128"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="relative mb-8">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-on-primary">Pro</h2>
              <span className="bg-on-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-primary">
                Most Popular
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tighter">
                {annual ? "$45" : "$5"}
              </span>
              <span className="text-sm font-medium opacity-70">{annual ? "/yr" : "/mo"}</span>
            </div>
            {annual && (
              <p className="mt-2 text-xs opacity-80">Saves vs paying monthly — billed once per year.</p>
            )}
          </div>
          <ul className="relative mb-10 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-on-primary">check</span>
              <span>Unlimited dynamic codes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-on-primary">check</span>
              <span>10K scans/mo</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-on-primary">check</span>
              <span>Full analytics</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-on-primary">check</span>
              <span>PNG/SVG high-res</span>
            </li>
          </ul>
          <Link
            href="/billing"
            className="relative block w-full bg-on-primary py-4 text-center text-sm font-semibold uppercase tracking-widest text-primary transition-all hover:bg-surface-container-highest"
          >
            Choose Pro
          </Link>
        </div>
      </div>

      <section className="mt-24 border-t border-outline-variant pt-12">
        <h3 className="mb-12 text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
          The Fine Print
        </h3>
        <div className="space-y-12">
          <div>
            <h4 className="text-base font-semibold tracking-tight">Billing via Stripe</h4>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              Secure payment processing. Cancel anytime from your account settings.
            </p>
          </div>
          <div>
            <h4 className="text-base font-semibold tracking-tight">Need more volume?</h4>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              More than 10K scans/mo or bulk workflows—Business tier and enterprise options later.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-24 mb-24 flex flex-col gap-6 text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
        <div className="flex gap-8">
          <Link href="/terms" className="transition-colors hover:text-primary">
            Terms
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-primary">
            Privacy
          </Link>
        </div>
        <p>© 2024 QRField</p>
      </footer>
    </>
  );
}
