import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@/components/Analytics";
import { MetaPixel } from "@/components/MetaPixel";
import { TikTokPixel } from "@/components/TikTokPixel";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE, SOCIALS } from "@/lib/site";
// Export design system, then the app-theme re-skin (must load last).
import "./design-css/colors_and_type.css";
import "./design-css/site.css";
import "./design-css/pages.css";
import "./design-css/theme-override.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Conductor — share the ride on your route, split the cost",
    template: "%s · Conductor",
  },
  description:
    "Someone is already driving your route this morning. Book a seat for a share of the cost — verified both ways, fare agreed up front.",
  applicationName: SITE.name,
  keywords: [
    "carpool Lagos",
    "ride share Nigeria",
    "commute Lagos",
    "cheaper than Uber Lagos",
    "corridor ride Lagos",
  ],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "Conductor — share the ride on your route, split the cost",
    description:
      "Book a seat on a car already going your way. Verified both ways, fare agreed up front.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conductor — share the ride, split the cost",
    description: "A seat on a car already going your way.",
  },
  alternates: { canonical: "/" },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#8C4F00",
  width: "device-width",
  initialScale: 1,
};

/** Organization + WebSite schema (ports the Yoast structured data). */
function OrgSchema() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: "Conductor NG",
        url: SITE.url,
        email: SITE.email,
        sameAs: SOCIALS.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is static + trusted
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG">
      <body>
        <OrgSchema />
        {children}
        <GoogleAnalytics />
        <MetaPixel />
        <TikTokPixel />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
