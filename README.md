# Conductor.ng — website v2

Marketing + onboarding site for Conductor (Nigerian same-route carpooling).
Rebuild of the WordPress site as a fast, self-hosted Next.js app so tracking,
consent, live app-priced quotes, and SEO are all first-class.

## Stack
- **Next.js (App Router) + TypeScript**
- **Design system ported 1:1 from the mobile app** (`packages/mobile-shared/src/theme/tokens.ts`):
  burnt-orange primary `#8C4F00`, signature `#EE4643`, orange→red CTA gradient,
  warm cream surfaces, **Roboto Flex** body / **Instrument Serif** headlines / Roboto Mono.
- Plain CSS design tokens in `app/globals.css` (no Tailwind — the app system is token-based).

## Structure
```
app/            routes (App Router)
  layout.tsx    fonts, metadata, Organization/WebSite schema
  page.tsx      / — passenger homepage (IA v2)
  globals.css   design system (app theme)
components/      Header, Footer, FareQuote
lib/site.ts      links, nav, socials, store URLs, contact
public/images/   logo + app-store badges
```

## Info architecture (IA v2 — passenger-first)
`/` is the passenger page. Car owners get one door (`/car-owners`) via the nav
switch — not a role chooser. Shared depth: How it works · Fares · Safety · About.

## Pricing
No fare is hard-coded. `FareQuote` calls the app's pricing engine at
`${NEXT_PUBLIC_PRICING_API}/api/pricing/estimate` and shows what the app quotes,
with an honest empty state when the service isn't set.

## Dev
```
bun install
bun run dev        # http://localhost:3000
bun run build
bun run typecheck
```

## Env
- `NEXT_PUBLIC_PRICING_API` — base URL of the app API for live fare quotes.

## Migration notes
- `next.config.mjs` 301-redirects the old WordPress URLs to the new IA.
- Reuse the existing GA4 (`GT-TWTDWZ8S`) on cutover; add Meta/TikTok/Ads pixels
  (the WP site had none) + Matomo + Clarity + a consent layer.
