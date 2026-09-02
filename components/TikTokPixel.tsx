"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

// Fire a TikTok page view on every App-Router navigation. The init snippet
// fires the first one, so the first effect run is skipped to avoid a double.
function Pageviews() {
  const pathname = usePathname();
  const search = useSearchParams();
  const first = useRef(true);
  useEffect(() => {
    if (!PIXEL_ID) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const w = window as unknown as { ttq?: { page?: () => void } };
    if (w.ttq && typeof w.ttq.page === "function") w.ttq.page();
  }, [pathname, search]);
  return null;
}

/**
 * TikTok Pixel — for ad conversion tracking on TikTok campaigns.
 * Disabled unless NEXT_PUBLIC_TIKTOK_PIXEL_ID is set.
 */
export function TikTokPixel() {
  if (!PIXEL_ID) return null;
  return (
    <>
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var a=d.createElement("script");a.type="text/javascript",a.async=!0,a.src=r+"?sdkid="+e+"&lib="+t;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)};ttq.load('${PIXEL_ID}');ttq.page();}(window,document,'ttq');`}
      </Script>
      <Suspense fallback={null}>
        <Pageviews />
      </Suspense>
    </>
  );
}
