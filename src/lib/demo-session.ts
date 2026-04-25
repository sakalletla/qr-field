/** Demo session cookie read by `middleware`; set/cleared from client only. */

export const SESSION_COOKIE = "qrfield_session";

export function setDemoSessionCookie(): void {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * 30;
  document.cookie = `${SESSION_COOKIE}=1; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function clearDemoSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE}=; Path=/; Max-Age=0`;
}
