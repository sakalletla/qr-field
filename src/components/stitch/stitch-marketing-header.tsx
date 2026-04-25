import Link from "next/link";

type Variant = "home" | "inner";

export function StitchMarketingHeader({ variant }: { variant: Variant }) {
  if (variant === "home") {
    return (
      <header className="fixed top-0 z-50 flex h-14 w-full items-center justify-between border-b border-neutral-300 bg-[#f9f9f9] px-4 dark:border-neutral-700 dark:bg-neutral-900">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tighter text-black dark:text-white"
        >
          QRField
        </Link>
        <button
          type="button"
          className="material-symbols-outlined p-2 text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
          aria-label="Menu"
        >
          menu
        </button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-neutral-300 bg-[#f9f9f9] px-4 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="material-symbols-outlined text-black dark:text-white"
          aria-label="Menu"
        >
          menu
        </button>
        <Link
          href="/"
          className="text-lg font-semibold tracking-tighter text-black dark:text-white"
        >
          QRField
        </Link>
      </div>
      <Link
        href="/login"
        className="text-base font-semibold tracking-tight text-neutral-500 dark:text-neutral-400"
      >
        Log in
      </Link>
    </header>
  );
}
