"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "default";

// The investor deck is confidential material shown in meetings — a support
// bubble has no business floating over it (and /deck/print renders to PDF).
const HIDDEN_ON = ["/deck"];

/**
 * tawk.to live chat.
 *
 * Disabled unless NEXT_PUBLIC_TAWK_PROPERTY_ID is set, so it never loads in
 * environments where it isn't configured. Questions asked here become ClickUp
 * tickets via the webhook at /api/tawk — see docs/go-live-config.md.
 */
export function TawkTo() {
  const pathname = usePathname();
  if (!PROPERTY_ID) return null;
  if (HIDDEN_ON.some((p) => pathname === p || pathname?.startsWith(`${p}/`))) {
    return null;
  }
  return (
    // lazyOnload: the widget is ~200KB of third-party JS and nobody chats in
    // the first second, so it waits for browser idle time rather than
    // competing with the page itself.
    <Script id="tawk-to" strategy="lazyOnload">
      {`var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src='https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);})();`}
    </Script>
  );
}
