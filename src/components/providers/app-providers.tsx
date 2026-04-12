"use client";

import type { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { getCodes, seedDemoCodesIfEmpty, setProfile } from "@/lib/demo-storage";
import { syncDynamicSlugsToServer } from "@/lib/slug-sync-client";

function ProfileSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;
    setProfile({ email: session.user.email });
    seedDemoCodesIfEmpty();
  }, [session?.user?.email, status]);

  return null;
}

/** Push dynamic slugs to Redis whenever local storage changes (demo login seed, create, etc.). */
function SlugSyncWatcher() {
  useEffect(() => {
    const run = () => {
      void syncDynamicSlugsToServer(getCodes());
    };
    run();
    window.addEventListener("qrfield-storage", run);
    return () => window.removeEventListener("qrfield-storage", run);
  }, []);

  return null;
}

export function AppProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  /** From `await auth()` in the root layout — keeps SSR and client hydration in sync. */
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <ProfileSync />
      <SlugSyncWatcher />
      {children}
    </SessionProvider>
  );
}
