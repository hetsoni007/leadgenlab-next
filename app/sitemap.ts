import type { MetadataRoute } from "next";
import { allPages, SITE } from "@/lib/content";
import compare from "@/content/compare.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/contact", "/quiz", "/learn", "/voices", "/prompts", "/compare", ...compare.map((c) => `/compare/${c.slug}`), ...allPages.map((p) => p.path)]);
  return [...paths].map((p) => ({ url: SITE.url + (p === "/" ? "" : p) }));
}
