export type TocItem = { id: string; text: string; level: 2 | 3 };

const strip = (s: string) =>
  s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x?\w+;/g, "").trim();

export function headingsOf(html: string): TocItem[] {
  const out: TocItem[] = [];
  const seen = new Set<string>();
  for (const m of html.matchAll(/<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/g)) {
    const text = strip(m[3]);
    if (text && !seen.has(text.toLowerCase())) {
      seen.add(text.toLowerCase());
      out.push({ id: m[2], text, level: Number(m[1]) as 2 | 3 });
    }
  }
  return out;
}

export function readingMinutes(html: string): number {
  const words = strip(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 210));
}
