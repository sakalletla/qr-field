"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  addCode,
  canCreateDynamic,
  dynamicCount,
  getCodes,
  getPlan,
} from "@/lib/demo-storage";
import type { QrKind } from "@/lib/demo-types";
import { FREE_DYNAMIC_LIMIT } from "@/lib/demo-types";

const steps = ["Type", "Content", "Design", "Review"] as const;

export function CreateWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<QrKind>("static");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("https://");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const plan = getPlan();
  const codes = getCodes();
  const dynamicBlocked = kind === "dynamic" && !canCreateDynamic(plan, codes);
  const dynUsed = dynamicCount(codes);
  const afterSaveDynamic = kind === "dynamic" ? dynUsed + 1 : dynUsed;
  const slotsLeft =
    plan === "pro" ? null : Math.max(0, FREE_DYNAMIC_LIMIT - afterSaveDynamic);

  function next() {
    setError(null);
    if (step === 0 && dynamicBlocked) {
      setError(
        "You’re at 3/3 dynamic codes on Free. Upgrade to Pro for unlimited, or choose Static.",
      );
      return;
    }
    if (step === 1) {
      const t = title.trim();
      if (!t) {
        setError("Enter a display name.");
        return;
      }
      let u = url.trim();
      if (!u) {
        setError("Enter a destination URL.");
        return;
      }
      if (!/^https:\/\//i.test(u)) {
        u = `https://${u.replace(/^\/+/, "")}`;
      }
      try {
        new URL(u);
      } catch {
        setError("Enter a valid https URL.");
        return;
      }
      setUrl(u);
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  function finish() {
    if (kind === "dynamic" && !canCreateDynamic(getPlan(), getCodes())) {
      setError("Dynamic code limit reached. Upgrade on Billing or choose Static.");
      setStep(0);
      return;
    }
    const scansLabel = kind === "dynamic" ? "0 scans (30d)" : null;
    const record = addCode({
      title: title.trim(),
      kind,
      scansLabel,
      payloadSummary: url.trim(),
      fg,
      bg,
    });
    setCreatedId(record.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetWizard() {
    setCreatedId(null);
    setStep(0);
    setKind("static");
    setTitle("");
    setUrl("https://");
    setFg("#000000");
    setBg("#ffffff");
    setError(null);
  }

  if (createdId) {
    return (
      <div className="px-4 pt-6">
        <div
          className="border border-primary bg-surface-container-low px-4 py-4 text-sm hairline"
          role="status"
        >
          <p className="font-semibold text-primary">QR code created</p>
          <p className="mt-1 text-on-surface-variant">Saved in this browser (demo).</p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push(`/codes/${createdId}`)}
            className="flex-1 bg-primary py-3 text-xs font-semibold uppercase tracking-wider text-on-primary"
          >
            View code
          </button>
          <button
            type="button"
            onClick={resetWizard}
            className="flex-1 border border-outline-variant py-3 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Create another
          </button>
        </div>
        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm font-medium text-primary underline underline-offset-2"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">
          Step {step + 1} / {steps.length} · {steps[step]}
        </p>
        <Link
          href="/dashboard"
          className="text-xs font-semibold text-primary underline underline-offset-2"
        >
          Cancel
        </Link>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight text-primary">Create QR code</h1>

      {error && (
        <p className="mt-4 text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}

      {step === 0 && (
        <div className="mt-8 space-y-6">
          <p className="text-sm text-on-surface-variant">Choose how this code behaves.</p>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3 border border-outline-variant bg-surface-container-lowest p-4 hairline">
              <input
                type="radio"
                name="kind"
                checked={kind === "static"}
                onChange={() => setKind("static")}
                className="mt-1"
              />
              <div>
                <span className="font-semibold text-primary">Static</span>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Encodes your content directly. Best for Wi‑Fi-style payloads; URL won’t change
                  without a new print.
                </p>
              </div>
            </label>
            <label className="flex cursor-pointer items-start gap-3 border border-outline-variant bg-surface-container-lowest p-4 hairline">
              <input
                type="radio"
                name="kind"
                checked={kind === "dynamic"}
                onChange={() => setKind("dynamic")}
                className="mt-1"
              />
              <div>
                <span className="font-semibold text-primary">Dynamic</span>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Short link you can change later; scan analytics on Pro (teaser on Free).
                </p>
              </div>
            </label>
          </div>
          {dynamicBlocked && (
            <p className="text-sm text-on-surface-variant">
              You’ve reached the Free limit for dynamic codes.{" "}
              <Link href="/billing" className="font-semibold text-primary underline">
                Upgrade to Pro
              </Link>{" "}
              or choose Static.
            </p>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="mt-8 space-y-4">
          <label className="block text-sm">
            <span className="text-on-surface-variant">Display name</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full border border-outline-variant bg-surface px-3 py-2 text-sm"
              placeholder="Spring campaign landing"
            />
          </label>
          <label className="block text-sm">
            <span className="text-on-surface-variant">Destination URL (https)</span>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 w-full border border-outline-variant bg-surface px-3 py-2 font-mono text-sm"
              placeholder="https://example.com"
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-4">
          <p className="text-sm text-on-surface-variant">
            These colors are saved with the code and used for PNG/SVG on the code detail page.
          </p>
          <label className="block text-sm">
            <span className="text-on-surface-variant">Foreground</span>
            <input
              type="color"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="mt-1 h-10 w-full cursor-pointer border border-outline-variant bg-surface"
            />
          </label>
          <label className="block text-sm">
            <span className="text-on-surface-variant">Background</span>
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="mt-1 h-10 w-full cursor-pointer border border-outline-variant bg-surface"
            />
          </label>
          <div
            className="flex aspect-square max-w-[200px] items-center justify-center border border-outline-variant text-xs font-medium"
            style={{ backgroundColor: bg, color: fg }}
          >
            Preview
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 space-y-4 border border-outline-variant bg-surface-container-lowest p-6 hairline text-sm">
          <p>
            <span className="text-on-surface-variant">Name: </span>
            <span className="font-medium text-primary">{title.trim() || "—"}</span>
          </p>
          <p>
            <span className="text-on-surface-variant">Type: </span>
            <span className="font-medium text-primary">{kind}</span>
          </p>
          <p>
            <span className="text-on-surface-variant">URL: </span>
            <span className="break-all font-mono text-xs">{url.trim()}</span>
          </p>
          <p>
            <span className="text-on-surface-variant">Colors: </span>
            <span className="font-mono text-xs">
              {fg} on {bg}
            </span>
          </p>
          {plan === "free" && kind === "dynamic" && slotsLeft !== null && (
            <p className="border-t border-outline-variant pt-4 text-on-surface-variant">
              Slot usage: after save you’ll use{" "}
              <span className="font-semibold text-primary">
                {afterSaveDynamic} of {FREE_DYNAMIC_LIMIT}
              </span>{" "}
              dynamic slots on Free
              {slotsLeft > 0 ? ` (${slotsLeft} left).` : " (at limit)."}
            </p>
          )}
          {plan === "pro" && kind === "dynamic" && (
            <p className="border-t border-outline-variant pt-4 text-on-surface-variant">
              Pro: unlimited dynamic codes.
            </p>
          )}
        </div>
      )}

      <div className="mt-10 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="border border-outline-variant bg-surface px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="flex-1 bg-primary py-3 text-xs font-semibold uppercase tracking-wider text-on-primary"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            className="flex-1 bg-primary py-3 text-xs font-semibold uppercase tracking-wider text-on-primary"
          >
            Create QR code
          </button>
        )}
      </div>
    </div>
  );
}
