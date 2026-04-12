import { StitchAppChrome } from "@/components/stitch/stitch-app-chrome";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <StitchAppChrome>{children}</StitchAppChrome>;
}
