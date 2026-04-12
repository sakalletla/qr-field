"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { clearDemoSessionCookie } from "@/lib/demo-session";
import { MaterialIcon } from "@/components/stitch/material-icon";

export function AppHeader() {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(ev: KeyboardEvent) {
      if (ev.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    function onPointer(ev: MouseEvent) {
      if (!panelRef.current?.contains(ev.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onPointer);
      return () => document.removeEventListener("mousedown", onPointer);
    }
  }, [open]);

  async function onSignOut() {
    setOpen(false);
    clearDemoSessionCookie();
    if (session) {
      await signOut({ callbackUrl: "/" });
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-outline-variant bg-surface px-4">
      <div className="relative flex items-center gap-3" ref={panelRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-primary"
          aria-expanded={open}
          aria-label="Menu"
        >
          <MaterialIcon name="menu" className="!text-2xl" />
        </button>
        <Link href="/dashboard" className="text-lg font-semibold tracking-tighter text-primary">
          QRField
        </Link>
        {open && (
          <div
            className="absolute top-full left-0 z-50 mt-1 min-w-[220px] border border-outline-variant bg-surface-container-lowest py-2 shadow-lg hairline"
            role="menu"
          >
            <Link
              href="/dashboard"
              className="block px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/create"
              className="block px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              Create QR
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>
            <Link
              href="/billing"
              className="block px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              Billing
            </Link>
            <button
              type="button"
              className="w-full px-4 py-2.5 text-left text-sm font-semibold text-primary hover:bg-surface-container-low"
              role="menuitem"
              onClick={() => void onSignOut()}
            >
              Log out
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 text-primary">
        <span className="material-symbols-outlined !text-2xl opacity-40" aria-hidden>
          search
        </span>
      </div>
    </header>
  );
}
