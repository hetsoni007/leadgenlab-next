import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dev from "@/content/developers.json";
import { Answer, Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { abs, shortDesc, shortTitle } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return dev.map((d) => ({ slug: d.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = dev.find((x) => x.slug === slug);
  if (!d) return {};
  const title = shortTitle(d.title);
  return {
    title, description: shortDesc(d.answer),
    alternates: { canonical: `/developers/${d.slug}` },
    openGraph: { title, description: shortDesc(d.answer), url: `/developers/${d.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  };
}

const DOCS = [
  { label: "Claude developer docs", href: "https://platform.claude.com/docs" },
  { label: "OpenAI developer docs", href: "https://platform.openai.com/docs" },
  { label: "Anthropic news", href: "https://www.anthropic.com/news" },
];

export default async function DevPage({ params }: Props) {
  const { slug } = await params;
  const d = dev.find((x) => x.slug === slug);
  if (!d) notFound();
  const others = dev.filter((x) => x.slug !== slug);
  const faq = d.faq as [string, string][];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TechArticle", headline: d.title, description: d.answer,
        mainEntityOfPage: abs(`/developers/${d.slug}`), author: { "@type": "Organization", name: "LeadGenLab" },
        publisher: { "@type": "Organization", name: "LeadGenLab", url: abs("/") }, dateModified: "2026-10-11" }} />
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/developers">Developers</Link></nav>
          <p className="eyebrow">Developer guide</p>
          <h1>{d.title}</h1>
        </div>
      </section>
      <div className="wrap sim-stack">
        <Answer>{d.answer}</Answer>
        {d.sections.map((s) => (
          <section key={s.h} className="sim">
            <h2>{s.h}</h2>
            <p>{s.p}</p>
            {s.l.length > 0 && <ul className="next">{s.l.map((i) => <li key={i}>{i}</li>)}</ul>}
          </section>
        ))}
        <section className="sim">
          <p className="eyebrow">Check the current facts</p>
          <h2>Verify on the official pages</h2>
          <ul className="next">{d.verify.map((v) => <li key={v}>{v}</li>)}</ul>
          <div className="actions">
            {DOCS.map((o) => (<a key={o.href} className="btn btn-ghost btn-sm" href={o.href} rel="noopener noreferrer" target="_blank">{o.label} ↗</a>))}
          </div>
        </section>
        <Faq items={faq} />
      </div>
      <div className="wrap">
        <section className="related">
          <h2 style={{ fontSize: 26, marginBottom: 16 }}>More developer guides</h2>
          <div className="cards">
            {others.map((o) => (<Link key={o.slug} href={`/developers/${o.slug}`} className="card"><span className="tag">Developer guide</span><h3>{o.title}</h3></Link>))}
          </div>
        </section>
      </div>
    </>
  );
}
