import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import compare from "@/content/compare.json";
import { Answer, Faq } from "@/components/Faq";
import { Scorecard } from "@/components/interactive/Scorecard";
import { OFFICIAL } from "@/lib/official";
import { shortDesc, shortTitle } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return compare.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = compare.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: shortTitle(c.title),
    description: shortDesc(c.intro),
    alternates: { canonical: `/compare/${c.slug}` },
    openGraph: { title: shortTitle(c.title), description: shortDesc(c.intro), url: `/compare/${c.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const c = compare.find((x) => x.slug === slug);
  if (!c) notFound();
  const others = compare.filter((x) => x.slug !== slug);
  const faq: [string, string][] = [
    [c.title + "?", "It depends on your own work, so the reliable method is to run the same prompt in both tools and score the results. This page gives you the prompt, a sample input and a scorecard."],
    ["How do I compare them fairly?", "Use a fresh conversation in each, the same plan tier if possible, and identical text. Read both answers fully, check any fact you can, and repeat with a second task."],
    ["What should I verify on the official pages?", c.verify.join("; ") + "."],
  ];

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/compare">Comparisons</Link></nav>
          <h1>{c.title}</h1>
          <p className="lede">{c.intro}</p>
        </div>
      </section>
      <div className="wrap sim-stack">
        <Answer>{c.intro} Run the test below with your own material: it takes about 15 minutes.</Answer>
        <section className="sim">
          <p className="eyebrow">Step 1 · The task</p>
          <h2>{c.task}</h2>
          <p className="muted">Use a fresh conversation in each tool, the same plan tier if you can, and paste exactly the same text.</p>
          <h3 style={{ margin: "18px 0 8px" }}>Prompt to paste</h3>
          <pre className="prompt-text">{c.prompt}</pre>
          <h3 style={{ margin: "18px 0 8px" }}>Sample input</h3>
          <pre className="prompt-text">{c.sample}</pre>
        </section>

        <section className="sim">
          <p className="eyebrow">Step 2 · Run it</p>
          <ol className="next">
            <li>Open ChatGPT and Claude in two tabs and start a new conversation in each.</li>
            <li>Paste the prompt and the sample input. Do not edit between tools.</li>
            <li>Read both answers fully before scoring, and check any fact you can.</li>
            <li>Repeat once with a second task of your own to avoid judging on one example.</li>
          </ol>
        </section>

        <Scorecard criteria={c.criteria} />

        <section className="sim">
          <p className="eyebrow">Step 3 · Check the current facts</p>
          <h2>Things that change, so verify them on the official pages</h2>
          <ul className="next">{c.verify.map((v) => <li key={v}>{v}</li>)}</ul>
          <div className="actions" style={{ marginTop: 16 }}>
            {OFFICIAL.map((o) => (
              <a key={o.href} className="btn btn-ghost btn-sm" href={o.href} rel="noopener noreferrer" target="_blank">{o.label} ↗</a>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 14, fontSize: 14 }}>
            We don&apos;t publish a fixed winner or price table here because both change often. Treat any ranking you see elsewhere as a snapshot.
          </p>
        </section>
        <Faq items={faq} />
      </div>

      <div className="wrap" style={{ paddingBottom: 24 }}>
        <section className="related">
          <h2 style={{ fontSize: 26, marginBottom: 16 }}>More test kits</h2>
          <div className="cards">
            {others.map((o) => (
              <Link key={o.slug} href={`/compare/${o.slug}`} className="card"><span className="tag">Test kit</span><h3>{o.title}</h3></Link>
            ))}
            <Link href="/prompts" className="card"><span className="tag">Library</span><h3>Copy-ready prompts for your own tests</h3></Link>
          </div>
        </section>
      </div>
    </>
  );
}
