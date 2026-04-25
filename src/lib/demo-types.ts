export type PlanId = "free" | "pro";

export type QrKind = "static" | "dynamic";

export type QrCodeRecord = {
  id: string;
  title: string;
  kind: QrKind;
  /** Teaser label for list; static codes use null (shown as —). */
  scansLabel: string | null;
  payloadSummary: string;
  createdAt: string;
  /** Public short path for dynamic codes (`/r/{slug}`). */
  slug?: string;
  /** Module (foreground) and background hex for PNG/SVG generation; defaults to black on white if omitted. */
  fg?: string;
  bg?: string;
};

export const FREE_DYNAMIC_LIMIT = 3;
