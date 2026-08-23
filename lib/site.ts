/** Shared site constants — single source for links, nav, contact. */

export const SITE = {
  name: "Conductor",
  domain: "conductor.ng",
  url: "https://conductor.ng",
  tagline: "Share the ride. Split the cost.",
  email: "support@conductor.ng",
  phone: "+2348131500124",
  phoneDisplay: "+234 813 150 0124",
} as const;

/** Real app-store listings (verified from the live site). */
export const APPS = {
  passenger: {
    ios: "https://apps.apple.com/ng/app/conductor-ng/id6747010463",
    android:
      "https://play.google.com/store/apps/details?id=ng.conductor.passenger",
  },
  driver: {
    ios: "https://apps.apple.com/ng/app/conductor-ng-driver/id6747726138",
    android: "https://play.google.com/store/apps/details?id=ng.conductor.driver",
  },
} as const;

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/conductornaija" },
  { label: "Facebook", href: "https://www.facebook.com/conductornaija" },
  { label: "X", href: "https://x.com/conductorng_" },
  { label: "TikTok", href: "https://www.tiktok.com/@conductorng" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/conductor-nigeria/" },
] as const;

/** IA v2: passenger-first. Nav is lean; the role switch is a mirror. */
export const NAV = {
  passenger: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Fares", href: "/fares" },
    { label: "Safety", href: "/safety" },
    { label: "About", href: "/about" },
  ],
  owner: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Requirements", href: "/car-owners#requirements" },
    { label: "Safety", href: "/safety" },
    { label: "About", href: "/about" },
  ],
} as const;

export const SWITCH = {
  passenger: { label: "I have a car", href: "/car-owners" },
  owner: { label: "I need a ride", href: "/" },
} as const;

export const FOOTER_NAV = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Fares", href: "/fares" },
      { label: "Corridors", href: "/corridors" },
      { label: "Safety", href: "/safety" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "For car owners", href: "/car-owners" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Code of conduct", href: "/legal/conduct" },
      { label: "Delete profile", href: "/legal/delete-profile" },
    ],
  },
] as const;
