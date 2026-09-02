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
