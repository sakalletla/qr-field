import type { PlanId, QrCodeRecord } from "./demo-types";
import { FREE_DYNAMIC_LIMIT } from "./demo-types";
import { registerDynamicSlugOnServer } from "./slug-sync-client";

const CODES_KEY = "qrfield_codes";
const PLAN_KEY = "qrfield_plan";
const PROFILE_KEY = "qrfield_profile";

function randomSlug(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return s;
}

const DEMO_CODES: QrCodeRecord[] = [
  {
    id: "1",
    title: "Restaurant Menu Fall 2024",
    kind: "dynamic",
    scansLabel: "1,240 scans (30d)",
    payloadSummary: "https://example.com/menu",
    slug: "menu24",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "WIFI Guest Access",
    kind: "static",
    scansLabel: null,
    payloadSummary: "WIFI:T:MyGuest;;;",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "LinkedIn Portfolio Link",
    kind: "dynamic",
    scansLabel: "89 scans (30d)",
    payloadSummary: "https://linkedin.com/in/you",
    slug: "in-you",
    createdAt: new Date().toISOString(),
  },
];

function parseCodes(raw: string | null): QrCodeRecord[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? (v as QrCodeRecord[]) : [];
  } catch {
    return [];
  }
}

export function getCodes(): QrCodeRecord[] {
  if (typeof window === "undefined") return [];
  return parseCodes(window.localStorage.getItem(CODES_KEY));
}

export function setCodes(codes: QrCodeRecord[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CODES_KEY, JSON.stringify(codes));
  window.dispatchEvent(new Event("qrfield-storage"));
}

export function addCode(
  input: Omit<QrCodeRecord, "id" | "createdAt" | "slug"> & {
    id?: string;
    slug?: string;
  },
): QrCodeRecord {
  const id =
    input.id ??
    (typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `id-${Date.now()}`);
  const slug =
    input.kind === "dynamic" ? (input.slug ?? randomSlug()) : undefined;
  const record: QrCodeRecord = {
    ...input,
    id,
    slug,
    createdAt: new Date().toISOString(),
  };
  const next = [...getCodes(), record];
  setCodes(next);
  if (
    record.kind === "dynamic" &&
    record.slug &&
    record.payloadSummary &&
    /^https:/i.test(record.payloadSummary)
  ) {
    void registerDynamicSlugOnServer(record.slug, record.payloadSummary);
  }
  return record;
}

export function getCodeById(id: string): QrCodeRecord | undefined {
  return getCodes().find((c) => c.id === id);
}

/** Seeds sample rows only when the user has never had local storage for codes (first login on device). */
export function seedDemoCodesIfEmpty(): void {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(CODES_KEY) !== null) return;
  window.localStorage.setItem(CODES_KEY, JSON.stringify(DEMO_CODES));
  window.dispatchEvent(new Event("qrfield-storage"));
}

export function getPlan(): PlanId {
  if (typeof window === "undefined") return "free";
  const v = window.localStorage.getItem(PLAN_KEY);
  return v === "pro" ? "pro" : "free";
}

export function setPlan(plan: PlanId): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PLAN_KEY, plan);
  window.dispatchEvent(new Event("qrfield-storage"));
}

export type DemoProfile = { email: string };

export function getProfile(): DemoProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as DemoProfile;
    return v?.email ? v : null;
  } catch {
    return null;
  }
}

export function setProfile(profile: DemoProfile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("qrfield-storage"));
}

export function dynamicCount(codes: QrCodeRecord[]): number {
  return codes.filter((c) => c.kind === "dynamic").length;
}

export function canCreateDynamic(plan: PlanId, codes: QrCodeRecord[]): boolean {
  if (plan === "pro") return true;
  return dynamicCount(codes) < FREE_DYNAMIC_LIMIT;
}

