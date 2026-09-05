import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { DeckEnhancer } from "./deck-client";
import { DeckNav } from "./deck-nav";

export const metadata: Metadata = {
  title: "Conductor — Investor Deck",
  // Confidential investor material — never index it.
  robots: { index: false, follow: false },
};

export default function DeckLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Deck design system (colors + type). Served from /public/deck. */}
      {/* biome-ignore lint/a11y/useHtmlLang: stylesheet link, not a lang concern */}
      <link href="/deck/ds.css" rel="stylesheet" />
      {/* ds.css forces p/h{color:var(--fg-1)} (dark ink), which makes any
          uncoloured text on a dark section invisible. Make deck text INHERIT
          its section's colour instead, so light sections get ink and dark
          sections get their cream/light colour automatically. Explicit inline
          colours still win. */}
      <style>{`.deck-scope p,.deck-scope h1,.deck-scope h2,.deck-scope h3,.deck-scope h4,.deck-scope small{color:inherit}`}</style>
      <div
        className="deck-scope"
        style={{
          fontFamily: "'Satoshi','Manrope',system-ui,sans-serif",
          color: "#292928",
          background: "#FDFAF6",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Suspense fallback={null}>
          <DeckNav />
          <DeckEnhancer />
          {children}
        </Suspense>
      </div>
    </>
  );
}
