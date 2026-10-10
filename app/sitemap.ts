import type { MetadataRoute } from "next";
import { allPages, SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/contact", "/quiz", ...allPages.map((p) => p.path)]);
  return [...paths].map((p) => ({ url: SITE.url + (p === "/" ? "" : p) }));
}
