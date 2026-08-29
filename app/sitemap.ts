import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, freq: "weekly" },
  { path: "/car-owners", priority: 0.9, freq: "weekly" },
  { path: "/fares", priority: 0.9, freq: "weekly" },
  { path: "/how-it-works", priority: 0.8, freq: "monthly" },
  { path: "/safety", priority: 0.8, freq: "monthly" },
  { path: "/about", priority: 0.6, freq: "monthly" },
  { path: "/corridors", priority: 0.7, freq: "weekly" },
  { path: "/faq", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.4, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
