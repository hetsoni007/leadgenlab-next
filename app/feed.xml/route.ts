import { childrenOf, dateOf, SITE } from "@/lib/content";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const dynamic = "force-static";

export function GET() {
  const items = childrenOf("ai-updates")
    .map((p) => {
      const d = dateOf(p);
      return `<item><title>${esc(p.title)}</title><link>${SITE.url}${p.path}</link><guid>${SITE.url}${p.path}</guid>${
        d ? `<pubDate>${new Date(d + "T08:00:00Z").toUTCString()}</pubDate>` : ""
      }<description>${esc(p.description)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>LeadGenLab: Claude and ChatGPT updates</title><link>${SITE.url}</link><description>Plain-English explainers for Claude and ChatGPT releases.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
