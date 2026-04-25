"use client";

import { useEffect, useMemo, useState } from "react";

const QR_BASE = {
  width: 240,
  margin: 2,
  errorCorrectionLevel: "M" as const,
};

function qrOptions(foreground: string, background: string) {
  return {
    ...QR_BASE,
    color: { dark: foreground, light: background },
  };
}

function safeFileBase(name: string): string {
  const s = name.replace(/[^a-z0-9-_]+/gi, "-").replace(/^-|-$/g, "");
  return s.slice(0, 48) || "qr-code";
}

type Props = {
  /** Raw string encoded into the QR symbol (URL, short link, Wi‑Fi payload, etc.). */
  value: string;
  /** Used for download filenames. */
  title: string;
  /** Module color (QR “dark”); default `#000000`. */
  foreground?: string;
  /** Background color (QR “light”); default `#ffffff`. */
  background?: string;
};

export function CodeQrPreview({
  value,
  title,
  foreground = "#000000",
  background = "#ffffff",
}: Props) {
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const [svgText, setSvgText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const base = useMemo(() => safeFileBase(title), [title]);

  useEffect(() => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Nothing to encode in this QR code.");
      setPngDataUrl(null);
      setSvgText(null);
      return;
    }

    let cancelled = false;
    setError(null);
    setPngDataUrl(null);
    setSvgText(null);

    const opts = qrOptions(foreground, background);
    import("qrcode")
      .then((QR) => {
        const mod = QR.default ?? QR;
        return Promise.all([
          mod.toDataURL(trimmed, opts),
          mod.toString(trimmed, { ...opts, type: "svg" }),
        ]);
      })
      .then(([dataUrl, svg]) => {
        if (!cancelled) {
          setPngDataUrl(dataUrl);
          setSvgText(svg);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Could not generate QR. Check the encoded content.");
      });

    return () => {
      cancelled = true;
    };
  }, [value, foreground, background]);

  if (error) {
    return <p className="text-sm text-red-700">{error}</p>;
  }

  if (!pngDataUrl) {
    return (
      <p className="text-sm text-on-surface-variant" aria-live="polite">
        Generating QR…
      </p>
    );
  }

  const svgHref = svgText
    ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`
    : null;

  return (
    <div className="space-y-4">
      <div className="inline-block border border-outline-variant bg-surface-container-lowest p-4 hairline">
        {/* eslint-disable-next-line @next/next/no-img-element -- data URL from qrcode */}
        <img src={pngDataUrl} alt="" width={240} height={240} className="block" />
      </div>
      <p className="text-xs text-on-surface-variant">
        Scanners read the value shown under Encoded content / Short URL. Print or save below.
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={pngDataUrl}
          download={`${base}.png`}
          className="inline-flex border border-outline-variant bg-surface px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-primary hairline"
        >
          Download PNG
        </a>
        {svgHref && (
          <a
            href={svgHref}
            download={`${base}.svg`}
            className="inline-flex border border-outline-variant bg-surface px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-primary hairline"
          >
            Download SVG
          </a>
        )}
      </div>
    </div>
  );
}
