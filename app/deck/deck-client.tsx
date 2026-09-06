"use client";

import { track } from "@vercel/analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Per-recipient tracking. The token comes from the `?v=<token>` on the link
 * you send each investor — every event carries it, so page-to-page flow and
 * conversions are attributable to a named recipient (you hold the token→name
 * map). Uses Vercel Analytics custom events; no PII, just the token you minted.
 */

function useToken(): string {
  return useSearchParams().get("v") || "anon";
}

/**
 * Fire-and-forget ingest into our own store (alongside Vercel `track()`).
 * Prefers `navigator.sendBeacon` so events still flush on page unload;
 * falls back to keepalive fetch. Never throws into the render path.
 */
type EvBody = {
  v: string;
  type: "view" | "dwell" | "cta";
  slide: string;
  seconds?: number;
  cta?: string;
};

function sendEv(body: EvBody): void {
  try {
    const json = JSON.stringify(body);
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([json], { type: "application/json" });
      navigator.sendBeacon("/api/deck/ev", blob);
      return;
    }
    void fetch("/api/deck/ev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore — analytics must never break the deck
  }
}

/** Fire a slide view on mount and a dwell (seconds) on leave. */
export function DeckTracker({ slide }: { slide: string }) {
  const v = useToken();
  useEffect(() => {
    const startedAt = Date.now();
    track("deck_view", { v, slide });
    sendEv({ v, type: "view", slide });
    return () => {
      const seconds = Math.round((Date.now() - startedAt) / 1000);
      if (seconds > 0 && seconds < 3600) {
        track("deck_dwell", { v, slide, seconds });
        sendEv({ v, type: "dwell", slide, seconds });
      }
    };
  }, [v, slide]);
  return null;
}

/**
 * Enhancer mounted once in the deck layout:
 *   1. Propagates the `?v` token onto every in-content deck link (the nav /
 *      pager already carry it; this covers links inside the ported page HTML).
 *   2. Delegates CTA click tracking — any `[data-cta]` or `mailto:` link fires
 *      a `deck_cta` event with the token + which section it was clicked on.
 */
export function DeckEnhancer() {
  const pathname = usePathname();
  const v = useToken();
  const slide = pathname === "/deck" ? "overview" : pathname.replace(/^\/deck\/?/, "");

  useEffect(() => {
    if (v !== "anon") {
      // Append ?v to internal deck links that don't already carry it.
      const links = document.querySelectorAll<HTMLAnchorElement>(
        'a[href^="/deck"]'
      );
      for (const a of links) {
        const href = a.getAttribute("href") || "";
        if (href.startsWith("/deck") && !href.includes("v=")) {
          a.setAttribute(
            "href",
            href + (href.includes("?") ? "&" : "?") + "v=" + encodeURIComponent(v)
          );
        }
      }
    }

    // Point every "Book a call" CTA at the configured Cal.com/Calendly URL,
    // carrying the recipient token as utm_content so the booking attributes
    // back to the named investor. Falls back to the SSR mailto when unset.
    const bookUrl = process.env.NEXT_PUBLIC_BOOK_CALL_URL;
    if (bookUrl) {
      const bookLinks = document.querySelectorAll<HTMLAnchorElement>(
        'a[data-cta="book_call"]'
      );
      const sep = bookUrl.includes("?") ? "&" : "?";
      const tagged = `${bookUrl}${sep}utm_source=deck&utm_campaign=investor-deck&utm_content=${encodeURIComponent(v)}`;
      for (const a of bookLinks) {
        a.setAttribute("href", tagged);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    }

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a");
      if (!el) {
        return;
      }
      const href = el.getAttribute("href") || "";
      const cta = el.getAttribute("data-cta");
      if (cta) {
        track("deck_cta", { v, cta, slide });
        sendEv({ v, type: "cta", slide, cta });
      } else if (href.startsWith("mailto:")) {
        track("deck_cta", { v, cta: "email", slide });
        sendEv({ v, type: "cta", slide, cta: "email" });
      } else if (href.startsWith("tel:")) {
        track("deck_cta", { v, cta: "call", slide });
        sendEv({ v, type: "cta", slide, cta: "call" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [v, slide]);

  return null;
}
