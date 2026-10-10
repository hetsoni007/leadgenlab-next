import { SITE } from "@/lib/content";

/** Keep the SERP title under ~60 chars including the " | LeadGenLab" suffix. */
export function shortTitle(title: string, max = 47): string {
  const t = title.replace(/\s+/g, " ").trim().replace(/[.!]+$/, "");
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const i = cut.lastIndexOf(" ");
  let out = cut.slice(0, i > 20 ? i : max).replace(/[\s,;:–—-]+$/, "");
  // Don't end on a dangling connector word.
  const tail = /\s+(for|more|to|and|the|of|a|an|in|with|on|by|its|their|as|at|from|that|or|is|are|not|just|but|than|your|can|when|what|how)$/i;
  while (tail.test(out) && out.length > 20) out = out.replace(tail, "").replace(/[\s,;:–—-]+$/, "");
  return out;
}

export function shortDesc(desc: string, max = 155): string {
  const d = desc.replace(/\s+/g, " ").trim();
  if (d.length <= max) return d;
  const cut = d.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:–—-]+$/, "") + "…";
}

export const abs = (path: string) => SITE.url + (path === "/" ? "" : path);

export function dateFromPath(path: string): string | null {
  return path.match(/(\d{4}-\d{2}-\d{2})$/)?.[1] ?? null;
}
