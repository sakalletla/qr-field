"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "./material-icon";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: "grid_view" as const },
  { href: "/create", label: "Create", icon: "add_box" as const },
  { href: "/settings", label: "Account", icon: "account_circle" as const },
];

export function StitchAppBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-neutral-300 bg-white dark:border-neutral-700 dark:bg-black">
      {items.map(({ href, label, icon }) => {
        const active =
          href === "/dashboard"
            ? pathname === "/dashboard" || pathname.startsWith("/codes/")
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center px-2 pb-3 pt-2 transition-all duration-200 ${
              active
                ? "border-t-2 border-black text-black dark:border-white dark:text-white"
                : "text-neutral-400 hover:text-black dark:text-neutral-500 dark:hover:text-white"
            }`}
          >
            <MaterialIcon
              name={icon}
              className="mb-1 !text-2xl"
              filled={active}
            />
            <span className="text-[10px] font-medium uppercase tracking-widest">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
