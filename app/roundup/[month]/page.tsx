import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import daily from "@/content/daily.json";
import { allPages, childrenOf, dateOf, formatDate } from "@/lib/content";
import { Answer } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { abs } from "@/lib/seo";

type Props = { params: Promise<{ month: string }> };
type Row = { date: string; tool: string; title: string; summary: string; url: string; ours?: string; external: boolean };

function rows(): Row[] {
  const out: Row[] = [];
  const seen = new Set<string>();
  for (const p of childrenOf("ai-updates")) {
    const d = dateOf(p);
    if (!d) continue;
    const t = /claude|anthropic|haiku|sonnet|opus/i.test(p.title + p.path) ? "Claude" : "ChatGPT";
    out.push({ date: d, tool: t, title: p.title.replace(/\.$/, ""), summary: p.description, url: p.path, ours: p.path, external: false });
    seen.add(p.title.toLowerCase().slice(0, 24));
  }
  for (const i of daily.items as (typeof daily.items[number] & { ours?: string })[]) {
    if (i.ours) continue;
    out.push({ date: i.date, tool: i.tool, title: i.title, summary: i.summary, url: i.url, external: true });
  }
  return out;
}
const months = () => Array.from(new Set(rows().map((r) => r.date.slice(0, 7)))).sort().reverse();
const label = (m: string) => new Date(m + "-01T00:00:00Z").toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export function generateStaticParams() { return months().map((month) => ({ month })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { month } = await params;
  if (!months().includes(month)) return {};
  const title = `AI assistant updates: ${label(month)}`;
  const description = `Everything that changed in Claude and ChatGPT in ${label(month)}, with plain-English explainers and source links.`;
  return { title, description, alternates: { canonical: `/roundup/${month}` },
    openGraph: { title, description, url: `/roundup/${month}`, images: [{ url: "/opengraph-image", width: 1200, height: 630 }] } };
}

export default async function Roundup({ params }: Props) {
  const { month } = await params;
  if (!months().includes(month)) notFound();
  const all = rows().filter((r) => r.date.startsWith(month)).sort((a, b) => b.date.localeCompare(a.date));
  const claude = all.filter((r) => r.tool === "Claude");
  const gpt = all.filter((r) => r.tool !== "Claude");
  const now = new Date().toISOString().slice(0, 7);
  const inProgress = month === now;
  const withExplainer = all.filter((r) => r.ours).length;
  void allPages;

  const Col = ({ title, list }: { title: string; list: Row[] }) => (
    <section className="sim">
      <h2>{title} ({list.length})</h2>
      <ul className="lu" style={{ boxShadow: "none", background: "transparent", border: 0 }}>
        {list.map((r) => (
          <li key={r.title + r.date} className="lu-row" style={{ gridTemplateColumns: "96px minmax(0,1fr) auto" }}>
            <time className="lu-date" dateTime={r.date}>{formatDate(r.date)}</time>
            <div className="lu-main">
              {r.external
                ? <a className="lu-title" href={r.url} rel="noopener noreferrer" target="_blank">{r.title}</a>
                : <Link className="lu-title" href={r.url}>{r.title}</Link>}
              <p className="lu-sum">{r.summary}</p>
            </div>
            <div className="lu-meta">{r.external ? <span className="badge badge-warn">Source only</span> : <span className="badge">Explainer</span>}</div>
          </li>
        ))}
        {list.length === 0 && <li className="lu-row"><span className="muted">Nothing recorded.</span></li>}
      </ul>
    </section>
  );

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: `AI assistant updates: ${label(month)}`,
        itemListElement: all.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.title, url: r.external ? r.url : abs(r.url) })) }} />
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/ai-updates">Updates</Link></nav>
          <p className="eyebrow">Monthly roundup{inProgress ? " · month in progress" : ""}</p>
          <h1>Claude and ChatGPT updates: {label(month)}</h1>
        </div>
      </section>
      <div className="wrap sim-stack">
        <Answer label={`What changed in ${label(month)}`}>
          {all.length} updates are recorded for {label(month)}: {claude.length} for Claude and {gpt.length} for ChatGPT.
          {withExplainer > 0 ? ` ${withExplainer} have a plain-English explainer on this site.` : ""}
          {inProgress ? " The month is still in progress, so this page updates as new items are confirmed." : ""}
        </Answer>
        <Col title="Claude" list={claude} />
        <Col title="ChatGPT and OpenAI" list={gpt} />
        <section className="sim">
          <h2>How this roundup is made</h2>
          <p className="muted">Items come from official vendor pages and are checked daily. Anything seen only on a secondary source is labelled on the homepage feed. Read our <Link href="/about/editorial-standards">editorial standards</Link>.</p>
        </section>
      </div>
    </>
  );
}
