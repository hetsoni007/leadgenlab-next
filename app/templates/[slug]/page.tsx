import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import templates from "@/content/templates.json";
import { PromptActions } from "@/components/interactive/GuidedPrompt";
import { ResultsCalculator } from "@/components/interactive/ResultsCalculator";
import { shortDesc, shortTitle } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return templates.map((t) => ({ slug: t.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = templates.find((x) => x.slug === slug);
  if (!t) return {};
  const title = shortTitle(`${t.name}: outbound template`);
  return {
    title, description: shortDesc(t.goal),
    alternates: { canonical: `/templates/${t.slug}` },
    openGraph: { title, description: shortDesc(t.goal), url: `/templates/${t.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  };
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const t = templates.find((x) => x.slug === slug);
  if (!t) notFound();
  const others = templates.filter((x) => x.slug !== slug);
  const runs = t.runs as { date: string; sample: string; setup: string; result: string; notes: string }[];

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/templates">Outbound templates</Link></nav>
          <p className="eyebrow">Workflow {t.n} of {templates.length} · {t.status}</p>
          <h1>{t.name}</h1>
          <p className="lede">{t.goal}</p>
          <p className="meta"><span>When: {t.when}</span></p>
        </div>
      </section>
      <div className="wrap sim-stack">
        <section className="sim">
          <p className="eyebrow">Inputs</p>
          <h2>What you need first</h2>
          <ul className="next">{t.inputs.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>

        <section className="sim">
          <p className="eyebrow">Steps</p>
          <h2>The workflow</h2>
          <ol className="wf">
            {t.steps.map((s, i) => (
              <li key={i}>
                <span className="wf-tool">{s.tool}</span>
                <p>{s.do}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="sim">
          <p className="eyebrow">Claude prompt</p>
          <h2>Answer a few questions, then run</h2>
          <pre className="prompt-text">{t.prompt}</pre>
          <PromptActions prompt={t.prompt} title={t.name} />
        </section>

        <section className="sim">
          <p className="eyebrow">Control points</p>
          <h2>Review gate and stop rules</h2>
          <p><b>Human review:</b> {t.review}</p>
          <h3 style={{ margin: "14px 0 8px" }}>Stop when</h3>
          <ul className="next">{t.stop.map((s) => <li key={s}>{s}</li>)}</ul>
          <h3 style={{ margin: "14px 0 8px" }}>Risks</h3>
          <ul className="next">{t.risks.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>

        <section className="sim">
          <p className="eyebrow">Measure it</p>
          <h2>What to track</h2>
          <ul className="next">{t.metrics.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>

        <section className="sim" aria-labelledby="log-h">
          <p className="eyebrow">Test log · status: {t.status}</p>
          <h2 id="log-h">What has actually been tested</h2>
          {runs.length === 0 ? (
            <p>
              No runs recorded yet, so we make no performance claim for this workflow. When we run it, the date, sample size, setup and
              result are added here exactly as recorded.
            </p>
          ) : (
            <div className="table-wrap">
              <table className="score">
                <thead><tr><th>Date</th><th>Sample</th><th>Setup</th><th>Result</th><th>Notes</th></tr></thead>
                <tbody>{runs.map((r) => (<tr key={r.date + r.setup}><td>{r.date}</td><td>{r.sample}</td><td>{r.setup}</td><td>{r.result}</td><td>{r.notes}</td></tr>))}</tbody>
              </table>
            </div>
          )}
        </section>

        <ResultsCalculator />
      </div>
      <div className="wrap">
        <section className="related">
          <h2 style={{ fontSize: 26, marginBottom: 16 }}>Next in the series</h2>
          <div className="cards">
            {others.map((o) => (<Link key={o.slug} href={`/templates/${o.slug}`} className="card"><span className="tag">Workflow {o.n}</span><h3>{o.name}</h3><p>{o.goal}</p></Link>))}
          </div>
        </section>
        <section className="cta-band">
          <h2>Want this run for you?</h2>
          <p>Request an AI workflow audit and we will map which of these fits your pipeline.</p>
          <Link className="btn" href="/contact">Request an AI workflow audit</Link>
        </section>
      </div>
    </>
  );
}
