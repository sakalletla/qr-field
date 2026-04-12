"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { clearDemoSessionCookie } from "@/lib/demo-session";
import { useProfileEmailSnapshot } from "@/lib/qrfield-sync";

export function SettingsView() {
  const router = useRouter();
  const { data: session } = useSession();
  const storedEmail = useProfileEmailSnapshot();
  const email = session?.user?.email ?? storedEmail;

  async function onSignOut() {
    clearDemoSessionCookie();
    if (session) {
      await signOut({ callbackUrl: "/" });
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">Settings</h1>
      <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
        Signed in with Google uses a real session; demo mode uses a cookie + local storage only.
      </p>

      <div className="mt-10 border border-outline-variant bg-surface-container-lowest p-6 hairline">
        <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          Account
        </h2>
        <p className="mt-3 text-sm">
          <span className="text-on-surface-variant">Email: </span>
          <span className="font-medium text-primary">{email || "—"}</span>
        </p>
        {session && (
          <p className="mt-2 text-xs text-on-surface-variant">Provider: Google (Auth.js)</p>
        )}
        <label className="mt-6 flex cursor-pointer items-start gap-2 text-sm text-on-surface-variant">
          <input type="checkbox" defaultChecked className="hairline mt-0.5 border-outline-variant" />
          <span>Email me when I’m close to my scan limit (stub — not sent in demo)</span>
        </label>
        <button
          type="button"
          onClick={() => void onSignOut()}
          className="mt-8 w-full border border-outline-variant py-3 text-xs font-semibold uppercase tracking-wider text-primary"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
