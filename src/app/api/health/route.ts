import { NextResponse } from "next/server";

/**
 * Liveness for load balancers / orchestrators (K8s, OpenShift, etc.).
 * Intentionally does not check DB or Redis so the pod stays up during dependency blips.
 */
export function GET() {
  return NextResponse.json({ ok: true, service: "qr-field" }, { status: 200 });
}
