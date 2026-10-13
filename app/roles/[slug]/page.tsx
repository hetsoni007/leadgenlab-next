import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import roles from "@/content/roles.json";
import prompts from "@/content/prompts.json";
import { Answer, Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PromptActions } from "@/components/interactive/GuidedPrompt";
import { shortDesc, shortTitle } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return roles.map((r) => ({ slug: r.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = roles.find((x) => x.slug === slug);
  if (!r) return {};
  const title = shortTitle(`AI for ${r.title}`);
  return {
    title, description: shortDesc(r.short + " " + r.why),
    alternates: { canonical: `/roles/${r.slug}` },
    openGraph: { title, description: shortDesc(r.short), url: `/roles/${r.slug}`, images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  };
}

export default async function RolePage({ params }: Props) {
  const { slug } = await params;
  const r = roles.find((x) => x.slug === slug);
  if (!r) notFound();
  const byId = new Map(prompts.map((p) => [p.id, p]));
  const others = roles.filter((x) => x.slug !== slug).slice(0, 3);
  const who = r.title.toLowerCase();
  const faq: [string, string][] = [
    [`What are the best ChatGPT and Claude tasks for ${who}?`, `Start with: ${r.tasks.map((t) => t.name.toLowerCase()).join(", ")}. Each has a ready prompt and a check to run before you rely on the result.`],
    [`How do ${who} run a safe AI pilot?`, r.pilot.join(" ")],
    [`What should ${who} measure?`, `Track: ${r.metrics.map((m) => m.toLowerCase()).join("; ")}.`],
    [`What are the main risks for ${who}?`, `${r.risks.join("; ")}.`],
  ];

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/roles">Role guides</Link></nav>
          <p className="eyebrow">Role guide</p>
          <h1>ChatGPT and Claude for {r.title.toLowerCase()}</h1>
          <p className="lede">{r.why}</p>
        </div>
      </section>

      <JsonLd data={{ "@context": "https://schema.org", "@type": "HowTo", name: `Run an AI pilot for ${who}`, description: r.short,
        step: r.pilot.map((t, i) => ({ "@type": "HowToStep", position: i + 1, text: t })) }} />
      <div className="wrap sim-stack">
        <Answer>{r.short} {r.why}</Answer>
        <section className="sim">
          <p className="eyebrow">Where to start</p>
          <h2>High-value tasks</h2>
          <div className="pcards" style={{ marginTop: 16 }}>
            {r.tasks.map((t) => {
              const p = byId.get(t.prompt);
              return (
                <article key={t.name} className="pcard">
                  <h3>{t.name}</h3>
                  <p className="muted" style={{ margin: 0 }}>{t.what}</p>
                  {p && <pre className="prompt-text">{p.prompt}</pre>}
                  <p className="check"><b>Check:</b> {t.check}</p>
                  {p && <PromptActions prompt={p.prompt} title={t.name} />}
                </article>
              );
            })}
          </div>
        </section>

        <section className="sim">
          <p className="eyebrow">Prove it</p>
          <h2>A two-week pilot</h2>
          <ol className="next">{r.pilot.map((s) => <li key={s}>{s}</li>)}</ol>
          <h3 style={{ margin: "18px 0 8px" }}>What to measure</h3>
          <ul className="next">{r.metrics.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>

        <section className="sim">
          <p className="eyebrow">Be careful</p>
          <h2>Risks to watch</h2>
          <ul className="next">{r.risks.map((s) => <li key={s}>{s}</li>)}</ul>
          <div className="actions">
            <Link className="btn btn-ghost btn-sm" href="/safety">Safety and privacy guide</Link>
            <Link className="btn btn-ghost btn-sm" href="/compare">Test ChatGPT vs Claude on your task</Link>
          </div>
        </section>
        <Faq items={faq} />
      </div>

      <div className="wrap">
        <section className="related">
          <h2 style={{ fontSize: 26, marginBottom: 16 }}>Other role guides</h2>
          <div className="cards">
            {others.map((o) => (
              <Link key={o.slug} href={`/roles/${o.slug}`} className="card"><span className="tag">Role guide</span><h3>{o.title}</h3><p>{o.short}</p></Link>
            ))}
          </div>
        </section>
        <section className="cta-band">
          <h2>Want this set up for your team?</h2>
          <p>Request an AI workflow audit and get a short, practical read on where to start.</p>
          <Link className="btn" href="/contact">Request an AI workflow audit</Link>
        </section>
      </div>
    </>
  );
}
