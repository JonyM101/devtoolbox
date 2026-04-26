"use client";

import { useEffect } from "react";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
  style?: React.CSSProperties;
  className?: string;
}

export function AdUnit({
  slot,
  format = "auto",
  style,
  className = "",
}: AdUnitProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may not be loaded in dev mode
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style || { display: "block" }}
        data-ad-client="ca-pub-4375033257757811"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

/** Horizontal banner ad (top/bottom of pages) */
export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center py-2 ${className}`}>
      <AdUnit
        slot="auto"
        format="horizontal"
        style={{ display: "block", minHeight: "90px", maxWidth: "728px", width: "100%" }}
      />
    </div>
  );
}

/** Sidebar ad (rectangle, for tool pages) */
export function AdSidebar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <AdUnit
        slot="auto"
        format="rectangle"
        style={{ display: "block", width: "300px", minHeight: "250px" }}
      />
    </div>
  );
}

/** In-article ad (embedded within content) */
export function AdInArticle({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center py-4 ${className}`}>
      <AdUnit
        slot="auto"
        format="fluid"
        style={{ display: "block", textAlign: "center" }}
      />
    </div>
  );
}
