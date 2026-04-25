"use client";

import Link from "next/link";
import { MaterialIcon } from "./material-icon";

/** Matches Stitch `pricing` HTML — quick links into the app shell. */
export function StitchMarketingBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full justify-around border-t border-outline-variant bg-surface">
      <Link
        href="/dashboard"
        className="flex flex-col items-center justify-center px-2 pb-3 pt-2 text-outline transition-colors hover:text-primary"
      >
        <MaterialIcon name="grid_view" />
        <span className="mt-1 text-[10px] font-medium uppercase tracking-widest">
          Dashboard
        </span>
      </Link>
      <Link
        href="/create"
        className="flex flex-col items-center justify-center px-2 pb-3 pt-2 text-outline transition-colors hover:text-primary"
      >
        <MaterialIcon name="add_box" />
        <span className="mt-1 text-[10px] font-medium uppercase tracking-widest">
          Create
        </span>
      </Link>
      <Link
        href="/settings"
        className="flex flex-col items-center justify-center px-2 pb-3 pt-2 text-outline transition-colors hover:text-primary"
      >
        <MaterialIcon name="account_circle" />
        <span className="mt-1 text-[10px] font-medium uppercase tracking-widest">
          Account
        </span>
      </Link>
    </nav>
  );
}
