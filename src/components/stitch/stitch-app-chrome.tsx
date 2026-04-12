import { AppHeader } from "@/components/app/app-header";
import { StitchAppBottomNav } from "./stitch-app-bottom-nav";

export function StitchAppChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface text-on-surface">
      <AppHeader />
      <div className="flex flex-1 flex-col pb-20">{children}</div>
      <StitchAppBottomNav />
    </div>
  );
}
