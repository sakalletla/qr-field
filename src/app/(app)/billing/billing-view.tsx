"use client";

import Link from "next/link";
import { useState } from "react";
import { setPlan } from "@/lib/demo-storage";
import { usePlanSnapshot } from "@/lib/qrfield-sync";

export function BillingView() {
  const plan = usePlanSnapshot();
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3200);
  }

  function goPro() {
    setPlan("pro");
    showToast("Pro enabled for this browser (demo). Stripe checkout comes later.");
  }

  function goFree() {
    setPlan("free");
    showToast("Switched back to Free (demo).");
  }

  return (
    <div className="px-4 pt-6">
      {toast && (
        <div
          className="mb-4 border border-primary bg-surface-container-low px-4 py-3 text-sm text-primary hairline"
          role="status"
        >
          {toast}
        </div>
      )}
      <h1 className="text-2xl font-semibold tracking-tight text-primary">Billing</h1>
      <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
        Current plan: <span className="font-semibold text-primary">{plan}</span>. Stripe Customer
        Portal and webhooks are not wired yet—use the buttons below to simulate plan changes locally.
      </p>

      <p className="mt-6">
        <Link href="/pricing" className="text-sm font-semibold text-primary underline underline-offset-2">
          View full pricing (marketing)
        </Link>
      </p>

      <div className="mt-10 grid gap-6">
        <section className="border border-outline-variant bg-surface-container-lowest p-6 hairline">
          <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Free</h2>
          <p className="mt-2 text-sm text-on-surface-variant">3 dynamic codes, unlimited static.</p>
          {plan !== "free" && (
            <button
              type="button"
              onClick={goFree}
              className="mt-6 w-full border border-outline-variant py-3 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              Simulate downgrade
            </button>
          )}
          {plan === "free" && (
            <p className="mt-6 text-xs font-medium text-primary">Your current plan</p>
          )}
        </section>

        <section className="border border-primary bg-primary p-6 text-on-primary hairline">
          <h2 className="text-xs font-bold uppercase tracking-widest opacity-90">Pro</h2>
          <p className="mt-2 text-sm opacity-90">Unlimited dynamic, full analytics, higher export quality.</p>
          {plan !== "pro" && (
            <button
              type="button"
              onClick={goPro}
              className="mt-6 w-full bg-on-primary py-3 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              Upgrade to Pro
            </button>
          )}
          {plan === "pro" && (
            <p className="mt-6 text-xs font-semibold opacity-90">Your current plan (demo)</p>
          )}
        </section>

        <p className="text-xs text-on-surface-variant">
          Business tier later — same as{" "}
          <Link href="/pricing" className="text-primary underline">
            pricing page
          </Link>
          .
        </p>
      </div>

      <p className="mt-10 text-xs text-on-surface-variant">
        Production: Checkout + Customer Portal + webhooks per QRField-Technical-Stack.md.
      </p>
    </div>
  );
}
