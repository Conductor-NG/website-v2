// Content-Security-Policy. 'unsafe-inline' is required for the inline GA / Meta /
// TikTok pixel snippets, JSON-LD, and React inline styles (no nonce pipeline).
// Third-party origins are allowlisted per integration — add here when a new one
// is introduced, and watch the browser console for CSP violations after enabling
// it. A stricter nonce-based CSP is a possible future upgrade.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://analytics.tiktok.com https://*.tiktok.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "media-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.tiktok.com https://*.tiktok.com https://www.facebook.com https://connect.facebook.net https://*.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'self' https://www.facebook.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Slim, self-contained server bundle for a container (Cloud Run / Firebase App Hosting).
  // Vercel builds its own output and its Next 16 adapter is incompatible with
  // standalone (the standalone step reads a build trace Vercel's build never
  // writes), so leave `output` unset there. VERCEL=1 is set on Vercel builds.
  output: process.env.VERCEL ? undefined : "standalone",
  // Baseline security headers. No Content-Security-Policy here — the site
  // loads GA / Meta / TikTok / Vercel + Google Fonts, so a strict CSP needs
  // its own careful allowlist and testing; add it as a dedicated follow-up.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  // Old WordPress URLs → new IA. Preserves SEO equity on cutover.
  // (Passenger page is now the root; /passengers 301s home.)
  async redirects() {
    return [
      { source: "/passengers", destination: "/", permanent: true },
      { source: "/hello-world", destination: "/", permanent: true },
      { source: "/terms-of-service", destination: "/legal/terms", permanent: true },
      { source: "/privacy-policy", destination: "/legal/privacy", permanent: true },
      { source: "/code-of-conduct", destination: "/legal/code-of-conduct", permanent: true },
      { source: "/how-to-delete-profile", destination: "/delete-profile", permanent: true },
      // Policies not yet rebuilt as their own pages — send to Terms, which incorporates them.
      { source: "/refund-policy", destination: "/legal/terms", permanent: false },
      { source: "/car-owner-policy", destination: "/legal/terms", permanent: false },
      { source: "/passenger-policy", destination: "/legal/terms", permanent: false },
    ];
  },
};

export default nextConfig;
