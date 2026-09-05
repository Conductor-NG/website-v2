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
      {/* iPhone-17 device frame for app screenshots (reused from the website). */}
      {/* biome-ignore lint/a11y/useHtmlLang: stylesheet link, not a lang concern */}
      <link href="/deck/phone.css" rel="stylesheet" />
      {/* ds.css forces p/h{color:var(--fg-1)} (dark ink), which makes any
          uncoloured text on a dark section invisible. Make deck text INHERIT
          its section's colour instead, so light sections get ink and dark
          sections get their cream/light colour automatically. Explicit inline
          colours still win. */}
      <style>{`.deck-scope p,.deck-scope h1,.deck-scope h2,.deck-scope h3,.deck-scope h4,.deck-scope small{color:inherit}`}</style>
      <div
        className="deck-scope"
        style={{
          fontFamily: "'Roboto Flex', system-ui, sans-serif",
          color: "#211A14",
          background: "#FFF8F0",
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
