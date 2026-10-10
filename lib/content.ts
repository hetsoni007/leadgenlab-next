import pages from "@/content/pages.json";

export type Page = {
  path: string;
  section: string;
  title: string;
  description: string;
  intro: string;
  html: string;
  legacy: string;
};

export const SITE = {
  name: "LeadGenLab",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://leadgenlab.vercel.app",
  email: "het.soni@soniconsultancyservices.com",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
};

export const allPages = pages as Page[];

export function getPage(path: string): Page | undefined {
  return allPages.find((p) => p.path === path);
}

export function dateOf(p: Page): string | null {
  return p.path.match(/(\d{4}-\d{2}-\d{2})$/)?.[1] ?? null;
}

export function childrenOf(section: string): Page[] {
  return allPages
    .filter((p) => p.path.startsWith(`/${section}/`))
    .sort((a, b) => (dateOf(b) ?? "").localeCompare(dateOf(a) ?? "") || a.title.localeCompare(b.title));
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  });
}

export const SECTION_LABEL: Record<string, string> = {
  "ai-updates": "Release updates",
  "weekly-reset": "Weekly reset",
  guides: "Guides",
  workflows: "Workflows",
  insights: "Field notes",
  tools: "Tools",
  roadmaps: "Roadmaps",
  about: "About",
};

/** Resolve legacy relative links (../contact/index.html, foo.html) to clean site paths. */
export function rewriteLinks(html: string, legacy: string): string {
  const base = "http://x" + legacy;
  return html.replace(/(href|src)="([^"]*)"/g, (m, attr: string, val: string) => {
    if (!val || /^(https?:|mailto:|tel:|#|data:)/.test(val)) return m;
    try {
      const u = new URL(val, base);
      let p = u.pathname.replace(/index\.html$/, "").replace(/\.html$/, "");
      if (p.length > 1) p = p.replace(/\/$/, "");
      if (attr === "src") return `${attr}="${p}"`;
      return `${attr}="${p}${u.hash}"`;
    } catch {
      return m;
    }
  });
}
