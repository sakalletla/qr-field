"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { CodeQrPreview } from "@/components/qr/code-qr-preview";
import { CODE_DETAIL_BOOT_SNAPSHOT, useCodeDetailSnapshot } from "@/lib/qrfield-sync";
import type { PlanId, QrCodeRecord } from "@/lib/demo-types";

type Tab = "overview" | "analytics";

function shortUrlFor(code: QrCodeRecord): string {
  if (typeof window === "undefined") return "";
  const slug = code.slug ?? code.id.slice(0, 8);
  return `${window.location.origin}/r/${slug}`;
}

export function CodeDetailView({ id }: { id: string }) {
  const router = useRouter();
  const snap = useCodeDetailSnapshot(id);
  const [tab, setTab] = useState<Tab>("overview");
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, []);

  if (snap === CODE_DETAIL_BOOT_SNAPSHOT) {
    return (
      <div className="px-4 py-16 text-center text-sm text-on-surface-variant">Loading…</div>
    );
  }

  const { code, plan } = JSON.parse(snap) as {
    code: QrCodeRecord | null;
    plan: PlanId;
  };

  if (code === null) {
    return (
      <div className="px-4 pt-6">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-primary underline-offset-2 hover:underline"
        >
          ← Dashboard
        </Link>
        <h1 className="mt-8 text-2xl font-semibold text-primary">Not found</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          This QR code isn’t in your workspace (or was removed).
        </p>
      </div>
    );
  }

  const shortUrl = shortUrlFor(code);
  /** Static / URL payloads encode the destination; dynamic codes encode the short link for printing. */
  const qrEncodeValue = code.kind === "dynamic" ? shortUrl : code.payloadSummary;
  const showAnalyticsTab = code.kind === "dynamic";

  return (
    <div className="px-4 pt-6">
      <Link
        href="/dashboard"
        className="text-sm font-medium text-primary underline-offset-2 hover:underline"
      >
        ← Dashboard
      </Link>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-primary">{code.title}</h1>
      <p className="mt-1 font-mono text-xs text-on-surface-variant">id: {code.id}</p>

      <nav className="mt-8 flex gap-8 border-b border-outline-variant text-sm">
        <button
          type="button"
          onClick={() => setTab("overview")}
          className={`pb-3 ${
            tab === "overview"
              ? "border-b-2 border-primary font-semibold text-primary"
              : "text-on-surface-variant"
          }`}
        >
          Overview
        </button>
        {showAnalyticsTab && (
          <button
            type="button"
            onClick={() => setTab("analytics")}
            className={`pb-3 ${
              tab === "analytics"
                ? "border-b-2 border-primary font-semibold text-primary"
                : "text-on-surface-variant"
            }`}
          >
            Analytics
          </button>
        )}
      </nav>

      {tab === "overview" && (
        <div className="mt-6 space-y-6">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-on-surface-variant">Type</dt>
              <dd className="mt-1 font-medium capitalize text-primary">{code.kind}</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">
                {code.kind === "dynamic" ? "Destination" : "Encoded content"}
              </dt>
              <dd className="mt-1 break-all font-mono text-xs">{code.payloadSummary}</dd>
            </div>
            {code.kind === "dynamic" && (
              <>
                <div>
                  <dt className="text-on-surface-variant">Short URL</dt>
                  <dd className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <span className="break-all font-mono text-xs">{shortUrl}</span>
                    <button
                      type="button"
                      onClick={() => onCopy(shortUrl)}
                      className="shrink-0 border border-outline-variant px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary hairline"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </dd>
                </div>
                <div>
                  <dt className="text-on-surface-variant">Quick scan stats</dt>
                  <dd className="mt-1 font-medium text-primary">{code.scansLabel ?? "—"}</dd>
                </div>
              </>
            )}
          </dl>

          <div className="border border-outline-variant bg-surface-container-lowest p-4 hairline">
            <p className="text-sm font-medium text-primary">QR preview</p>
            <div className="mt-4">
              <CodeQrPreview
                value={qrEncodeValue}
                title={code.title}
                foreground={code.fg}
                background={code.bg}
              />
            </div>
          </div>
        </div>
      )}

      {tab === "analytics" && showAnalyticsTab && (
        <div className="mt-6 space-y-6">
          {plan === "free" && (
            <div className="border border-outline-variant bg-surface-container-low px-4 py-3 text-sm hairline">
              <p className="font-medium text-primary">Unlock full analytics</p>
              <p className="mt-1 text-on-surface-variant">
                Countries, devices, date ranges, and export are on Pro.
              </p>
              <Link
                href="/billing"
                className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-primary underline underline-offset-2"
              >
                Upgrade to Pro
              </Link>
            </div>
          )}
          {plan === "pro" && (
            <p className="text-sm text-on-surface-variant">
              Chart area placeholder — connect real analytics when the API is ready.
            </p>
          )}
          <div className="flex h-40 items-center justify-center border border-dashed border-outline-variant text-xs text-on-surface-variant">
            {plan === "free" ? "Teaser / empty chart (Free)" : "Sample chart area (demo)"}
          </div>
          <p className="text-xs text-on-surface-variant">Export CSV — Pro only (not wired).</p>
        </div>
      )}

      <div className="mt-10">
        <button
          type="button"
          onClick={() => router.push("/create")}
          className="text-sm font-semibold text-primary underline underline-offset-2"
        >
          Create another QR
        </button>
      </div>
    </div>
  );
}
