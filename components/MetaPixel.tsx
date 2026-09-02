"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Fire a Meta PageView on every App-Router navigation. The init snippet fires
// the first PageView, so the very first effect run is skipped to avoid a double.
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
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof w.fbq === "function") w.fbq("track", "PageView");
  }, [pathname, search]);
  return null;
}

/**
 * Meta (Facebook / Instagram) Pixel — for ad conversion tracking.
 * Disabled unless NEXT_PUBLIC_META_PIXEL_ID is set, so it never loads in
 * environments where it isn't configured.
 */
export function MetaPixel() {
  if (!PIXEL_ID) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <Suspense fallback={null}>
        <Pageviews />
      </Suspense>
    </>
  );
}
