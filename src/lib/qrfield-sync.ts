import { useSyncExternalStore } from "react";
import type { PlanId, QrCodeRecord } from "./demo-types";
import { getCodeById, getCodes, getPlan, getProfile } from "./demo-storage";

/** Server / hydration placeholder for detail view until client reads localStorage. */
export const CODE_DETAIL_BOOT_SNAPSHOT = "__qrfield_boot__";

export function subscribeQrField(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("qrfield-storage", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("qrfield-storage", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useDashboardSnapshot(): { codes: QrCodeRecord[]; plan: PlanId } {
  const json = useSyncExternalStore(
    subscribeQrField,
    () => JSON.stringify({ codes: getCodes(), plan: getPlan() }),
    () => JSON.stringify({ codes: [] as QrCodeRecord[], plan: "free" as PlanId }),
  );
  return JSON.parse(json) as { codes: QrCodeRecord[]; plan: PlanId };
}

export function usePlanSnapshot(): PlanId {
  return useSyncExternalStore(
    subscribeQrField,
    () => getPlan(),
    () => "free",
  );
}

export function useProfileEmailSnapshot(): string {
  return useSyncExternalStore(
    subscribeQrField,
    () => getProfile()?.email ?? "",
    () => "",
  );
}

export function useCodeDetailSnapshot(id: string): string {
  return useSyncExternalStore(
    subscribeQrField,
    () =>
      JSON.stringify({
        code: getCodeById(id) ?? null,
        plan: getPlan(),
      }),
    () => CODE_DETAIL_BOOT_SNAPSHOT,
  );
}
