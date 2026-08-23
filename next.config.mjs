/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Old WordPress URLs → new IA. Preserves SEO equity on cutover.
  // (Passenger page is now the root; /passengers 301s home.)
  async redirects() {
    return [
      { source: "/passengers", destination: "/", permanent: true },
      { source: "/hello-world", destination: "/", permanent: true },
      { source: "/terms-of-service", destination: "/legal/terms", permanent: true },
      { source: "/privacy-policy", destination: "/legal/privacy", permanent: true },
      { source: "/refund-policy", destination: "/legal/refunds", permanent: true },
      { source: "/code-of-conduct", destination: "/legal/conduct", permanent: true },
      { source: "/car-owner-policy", destination: "/legal/car-owner", permanent: true },
      { source: "/passenger-policy", destination: "/legal/passenger", permanent: true },
      { source: "/how-to-delete-profile", destination: "/legal/delete-profile", permanent: true },
    ];
  },
};

export default nextConfig;
