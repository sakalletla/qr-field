/**
 * Marketing routes: each page includes its own top bar (Stitch mobile-first).
 * Reference HTML: Downloads/stitch/stitch (see qr-something/QRField-Stitch-Export-Validation.md)
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-surface text-on-surface">{children}</div>
  );
}
