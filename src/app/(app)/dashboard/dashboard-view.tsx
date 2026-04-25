"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MaterialIcon } from "@/components/stitch/material-icon";
import { dynamicCount } from "@/lib/demo-storage";
import { FREE_DYNAMIC_LIMIT, type QrCodeRecord, type QrKind } from "@/lib/demo-types";
import { useDashboardSnapshot } from "@/lib/qrfield-sync";

type FilterKind = "all" | QrKind;
type SortKey = "updated" | "name";

export function DashboardView() {
  const { codes, plan } = useDashboardSnapshot();
  const [filter, setFilter] = useState<FilterKind>("all");
  const [sort, setSort] = useState<SortKey>("updated");

  const visible = useMemo(() => {
    const list =
      filter === "all" ? [...codes] : codes.filter((c) => c.kind === filter);
    list.sort((a, b) => {
      if (sort === "name") return a.title.localeCompare(b.title);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return list;
  }, [codes, filter, sort]);

  const usedDynamic = dynamicCount(codes);

  return (
    <>
      <div className="border-b border-outline-variant bg-surface-container-highest px-4 py-3">
        {plan === "pro" ? (
          <p className="text-[11px] font-medium leading-snug tracking-wide text-on-surface-variant uppercase">
            Pro · Unlimited dynamic codes · Full analytics
          </p>
        ) : (
          <p className="text-[11px] font-medium leading-snug tracking-wide text-on-surface-variant uppercase">
            Free · {usedDynamic}/{FREE_DYNAMIC_LIMIT} dynamic codes used ·{" "}
            <Link
              href="/billing"
              className="font-semibold text-primary underline underline-offset-2"
            >
              Upgrade to Pro for analytics
            </Link>
          </p>
        )}
      </div>

      <div className="flex items-baseline justify-between px-4 py-8">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Your QR codes</h1>
        <Link
          href="/create"
          className="flex items-center gap-2 bg-primary px-5 py-2 text-xs font-semibold tracking-wider text-on-primary uppercase"
        >
          <MaterialIcon name="add" className="!text-base" />
          Create
        </Link>
      </div>

      {codes.length > 0 && (
        <div className="flex flex-col gap-3 border-b border-outline-variant px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            <span className="self-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Filter
            </span>
            {(["all", "static", "dynamic"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider hairline ${
                  filter === f
                    ? "border-primary bg-primary text-on-primary"
                    : "border-outline-variant text-on-surface-variant"
                }`}
              >
                {f === "all" ? "All" : f === "static" ? "Static" : "Dynamic"}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Sort
            </span>
            <button
              type="button"
              onClick={() => setSort("updated")}
              className={`border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider hairline ${
                sort === "updated"
                  ? "border-primary text-primary"
                  : "border-outline-variant text-on-surface-variant"
              }`}
            >
              Updated
            </button>
            <button
              type="button"
              onClick={() => setSort("name")}
              className={`border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider hairline ${
                sort === "name"
                  ? "border-primary text-primary"
                  : "border-outline-variant text-on-surface-variant"
              }`}
            >
              Name
            </button>
          </div>
        </div>
      )}

      <section className="w-full border-t border-outline-variant">
        {codes.length === 0 ? (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <MaterialIcon name="qr_code_2" className="!text-5xl text-outline-variant" />
            <p className="max-w-xs text-sm leading-relaxed text-on-surface-variant">
              No QR codes yet. Create your first static or dynamic code to see it here.
            </p>
            <Link
              href="/create"
              className="bg-primary px-6 py-3 text-xs font-semibold tracking-wider text-on-primary uppercase"
            >
              Create your first QR
            </Link>
          </div>
        ) : visible.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-on-surface-variant">
            No codes match this filter.
          </p>
        ) : (
          visible.map((row) => <CodeRow key={row.id} row={row} />)
        )}
      </section>

      {plan === "free" && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <MaterialIcon
            name="insights"
            className="mb-4 !text-4xl text-outline-variant"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24" }}
          />
          <p className="mb-2 text-xs font-medium tracking-widest text-on-surface-variant uppercase">
            Advanced Analytics
          </p>
          <p className="max-w-[200px] text-[11px] leading-relaxed text-outline">
            Unlock full analytics — countries, devices, date ranges — on Pro.
          </p>
          <Link
            href="/billing"
            className="mt-4 text-xs font-semibold tracking-wide text-primary uppercase underline underline-offset-2"
          >
            Upgrade to Pro
          </Link>
        </div>
      )}
    </>
  );
}

function CodeRow({ row }: { row: QrCodeRecord }) {
  return (
    <Link
      href={`/codes/${row.id}`}
      className="group flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-4 py-5 transition-colors hover:bg-surface-container-low"
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold tracking-tight text-primary">{row.title}</h3>
        <div className="flex items-center gap-3">
          <span
            className={`border px-1.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase ${
              row.kind === "dynamic"
                ? "border-primary text-primary"
                : "border-outline-variant text-on-surface-variant"
            }`}
          >
            {row.kind === "dynamic" ? "Dynamic" : "Static"}
          </span>
          <span className="text-[10px] font-medium tracking-widest text-on-surface-variant uppercase">
            Scans (30d):{" "}
            {row.kind === "dynamic" && row.scansLabel ? row.scansLabel : "—"}
          </span>
        </div>
      </div>
      <MaterialIcon
        name="chevron_right"
        className="text-outline transition-colors group-hover:text-primary"
      />
    </Link>
  );
}
