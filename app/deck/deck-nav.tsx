"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

/** The 9 deck sections, in order. slug "" === /deck (Overview). */
export const DECK_SECTIONS = [
  { slug: "", label: "Overview" },
  { slug: "product", label: "Product" },
  { slug: "market", label: "Market" },
  { slug: "model", label: "Model" },
  { slug: "why-now", label: "Why now" },
  { slug: "plan", label: "Plan" },
  { slug: "team", label: "Team" },
  { slug: "financials", label: "Financials" },
  { slug: "ask", label: "The ask" },
] as const;

/** Build an internal deck href that preserves the per-recipient token. */
export function deckHref(slug: string, v: string | null): string {
  const path = slug ? `/deck/${slug}` : "/deck";
  return v ? `${path}?v=${encodeURIComponent(v)}` : path;
}

function useToken(): string | null {
  return useSearchParams().get("v");
}

function activeSlug(pathname: string): string {
  return pathname === "/deck" ? "" : pathname.replace(/^\/deck\/?/, "");
}

const C = {
  ink: "#292928",
  cream: "#FDFAF6",
  orange: "#E88D0E",
  line: "#E6E5E3",
  muted: "#676563",
};

/** Top nav — logo + section pills + Book-a-call CTA. Token-preserving. */
export function DeckNav() {
  const pathname = usePathname();
  const v = useToken();
  const active = activeSlug(pathname);
  return (
    <header
      style={{
        borderBottom: `1px solid ${C.line}`,
        background: "rgba(253,250,246,0.9)",
        backdropFilter: "saturate(1.4) blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <Link
          href={deckHref("", v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flex: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Conductor"
            src="/deck/images/conductor-wordmark.svg"
            style={{ height: 26, display: "block" }}
          />
        </Link>
        <nav
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            fontSize: 14,
            fontWeight: 600,
            order: 3,
            flex: "1 1 100%",
            margin: "0 -8px",
          }}
        >
          {DECK_SECTIONS.map((s) => {
            const on = s.slug === active;
            return (
              <Link
                href={deckHref(s.slug, v)}
                key={s.slug || "overview"}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  textDecoration: "none",
                  color: on ? "#fff" : C.ink,
                  background: on ? C.ink : "transparent",
                }}
              >
                {s.label}
              </Link>
            );
          })}
        </nav>
        <a
          data-cta="book_call"
          href="mailto:admin@conductor.ng?subject=Conductor%20%E2%80%94%20investor%20call"
          style={{
            flex: "none",
            order: 2,
            marginLeft: "auto",
            background: C.orange,
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            padding: "10px 18px",
            borderRadius: 999,
            textDecoration: "none",
          }}
        >
          Book a call
        </a>
      </div>
    </header>
  );
}

/** Bottom prev/next pager. Token-preserving. */
export function DeckPager({
  prev,
  next,
}: {
  prev?: { slug: string; label: string };
  next?: { slug: string; label: string };
}) {
  const v = useToken();
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, background: "#fff" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 32px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        {prev ? (
          <Link
            href={deckHref(prev.slug, v)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: 24,
              border: `1px solid ${C.line}`,
              borderRadius: 16,
              textDecoration: "none",
              color: C.ink,
              background: C.cream,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#909596",
              }}
            >
              ← Previous
            </span>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{prev.label}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={deckHref(next.slug, v)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: 24,
              borderRadius: 16,
              textDecoration: "none",
              color: "#fff",
              background: C.ink,
              textAlign: "right",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#ACA9A6",
              }}
            >
              Next →
            </span>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{next.label}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px 32px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          fontSize: 13,
          color: "#909596",
        }}
      >
        <span>
          Conductor Technology International Services Ltd · Investor briefing ·
          Confidential
        </span>
        <span>admin@conductor.ng · +234 810 690 2386</span>
      </div>
    </footer>
  );
}
