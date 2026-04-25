"use client";

import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { getCodes, seedDemoCodesIfEmpty, setProfile } from "@/lib/demo-storage";
import { syncDynamicSlugsToServer } from "@/lib/slug-sync-client";

const AppAuthContext = createContext<User | null>(null);

export function useAppAuth() {
  return useContext(AppAuthContext);
}

function ProfileSync() {
  const user = useAppAuth();

  useEffect(() => {
    if (!user?.email) return;
    setProfile({ email: user.email });
    seedDemoCodesIfEmpty();
  }, [user?.email]);

  return null;
}

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
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  const sync = useCallback((next: User | null) => {
    setUser(next);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      sync(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [sync]);

  return (
    <AppAuthContext.Provider value={user}>
      <ProfileSync />
      <SlugSyncWatcher />
      {children}
    </AppAuthContext.Provider>
  );
}
