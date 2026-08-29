/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Slim, self-contained server bundle for a container (Cloud Run / Firebase App Hosting).
  output: "standalone",
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
