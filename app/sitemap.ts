import type { MetadataRoute } from "next";
import { allPages, SITE } from "@/lib/content";
import compare from "@/content/compare.json";
import roles from "@/content/roles.json";
import features from "@/content/features.json";
import templates from "@/content/templates.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/contact", "/quiz", "/learn", "/voices", "/prompts", "/compare", "/roles", "/features", "/templates", ...templates.map((t) => `/templates/${t.slug}`), "/safety", "/pricing", "/india", "/glossary", ...roles.map((r) => `/roles/${r.slug}`), ...features.map((f) => `/features/${f.slug}`), ...compare.map((c) => `/compare/${c.slug}`), ...allPages.map((p) => p.path)]);
  return [...paths].map((p) => ({ url: SITE.url + (p === "/" ? "" : p) }));
}
