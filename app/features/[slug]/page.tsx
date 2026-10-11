import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import features from "@/content/features.json";
import { Answer, Faq } from "@/components/Faq";
import { OFFICIAL } from "@/lib/official";
import { shortDesc, shortTitle } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return features.map((f) => ({ slug: f.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = features.find((x) => x.slug === slug);
  if (!f) return {};
  const title = shortTitle(f.title);
  return {
    title, description: shortDesc(f.what + " " + f.why),
    alternates: { canonical: `/features/${f.slug}` },
    openGraph: { title, description: shortDesc(f.what), url: `/features/${f.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  };
}

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params;
  const f = features.find((x) => x.slug === slug);
  if (!f) notFound();
  const others = features.filter((x) => x.slug !== slug);
  const faq: [string, string][] = [
    [`What are ${f.title.toLowerCase()} in AI assistants?`, f.what],
    [`Why do ${f.title.toLowerCase()} matter?`, f.why],
    [`How do I test ${f.title.toLowerCase()} safely?`, f.test.join(" ")],
    [`What can go wrong with ${f.title.toLowerCase()}?`, `${f.risks.join("; ")}.`],
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/features">Features</Link></nav>
          <p className="eyebrow">Feature guide</p>
          <h1>{f.title}</h1>
          <p className="lede">{f.what}</p>
        </div>
      </section>
      <div className="wrap sim-stack">
        <Answer>{f.what} {f.why}</Answer>
        <section className="sim">
          <h2>Why it matters</h2>
          <p>{f.why}</p>
          <h3 style={{ margin: "18px 0 8px" }}>Common uses</h3>
          <ul className="next">{f.use.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>
        <section className="sim">
          <p className="eyebrow">Try it safely</p>
          <h2>A 10-minute test</h2>
          <ol className="next">{f.test.map((s) => <li key={s}>{s}</li>)}</ol>
        </section>
        <section className="sim">
          <p className="eyebrow">Be careful</p>
          <h2>What can go wrong</h2>
          <ul className="next">{f.risks.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>
        <section className="sim">
          <p className="eyebrow">Check the current facts</p>
          <h2>Verify on the official pages</h2>
          <ul className="next">{f.verify.map((s) => <li key={s}>{s}</li>)}</ul>
          <div className="actions">
            {OFFICIAL.filter((o) => /Help|privacy|^ChatGPT$|^Claude$/.test(o.label)).map((o) => (
              <a key={o.href} className="btn btn-ghost btn-sm" href={o.href} rel="noopener noreferrer" target="_blank">{o.label} ↗</a>
            ))}
          </div>
          <p className="muted" style={{ fontSize: 14, marginTop: 12 }}>
            We describe the idea, not each product&apos;s exact limits, because they change. Latest changes are in our <Link href="/ai-updates">release explainers</Link>.
          </p>
        </section>
        <Faq items={faq} />
      </div>
      <div className="wrap">
        <section className="related">
          <h2 style={{ fontSize: 26, marginBottom: 16 }}>More feature guides</h2>
          <div className="cards">
            {others.map((o) => (<Link key={o.slug} href={`/features/${o.slug}`} className="card"><span className="tag">Feature guide</span><h3>{o.title}</h3></Link>))}
          </div>
        </section>
      </div>
    </>
  );
}
