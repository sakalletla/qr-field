"use client";

import type { QrCodeRecord } from "@/lib/demo-types";

/**
 * Registers one dynamic code’s slug with the server (Redis). Fire-and-forget from the client.
 */
export async function registerDynamicSlugOnServer(
  slug: string,
  destinationUrl: string,
): Promise<void> {
  const res = await fetch("/api/slugs/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, destinationUrl }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.warn("[slug-sync]", res.status, err);
  }
}

export async function syncDynamicSlugsToServer(codes: QrCodeRecord[]): Promise<void> {
  const dynamics = codes.filter(
    (c) => c.kind === "dynamic" && c.slug && c.payloadSummary && /^https:/i.test(c.payloadSummary),
  );
  await Promise.all(
    dynamics.map((c) => registerDynamicSlugOnServer(c.slug!, c.payloadSummary)),
  );
}
