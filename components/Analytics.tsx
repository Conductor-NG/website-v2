"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Fire a GA4 page_view on every App-Router navigation (config runs with
// send_page_view:false, so this is the single source of pageviews).
function Pageviews() {
  const pathname = usePathname();
  const search = useSearchParams();
  useEffect(() => {
    if (!GA_ID) return;
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    if (typeof w.gtag !== "function") return;
    const qs = search?.toString();
    const path = qs ? `${pathname}?${qs}` : pathname;
    w.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);
  return null;
}

/** Google Analytics 4 — reuses your existing GA4 property via NEXT_PUBLIC_GA_ID. */
export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false});`}
      </Script>
      <Suspense fallback={null}>
        <Pageviews />
      </Suspense>
    </>
  );
}
