import type { Metadata } from "next";
import Link from "next/link";
import dev from "@/content/developers.json";
import { Answer, Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "AI developer guides: models, APIs, agents",
  description: "Practical guides for teams building with Claude and ChatGPT APIs: choosing a model, API basics, building agents safely, and evaluating changes before you ship.",
  alternates: { canonical: "/developers" },
};

export default function Developers() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">For developers and technical teams</p>
          <h1>Build with AI models, and ship with confidence</h1>
          <p className="lede">Method-first guides for choosing a model, calling an API, building agents safely and evaluating changes. We link to each vendor&apos;s official docs for names, limits and prices.</p>
        </div>
      </section>
      <div className="wrap sim-stack" style={{ paddingBottom: 56 }}>
        <Answer label="In short">Pick the smallest model that passes your own tests, keep keys and permissions tight, add human approval for consequential actions, and evaluate every change before rollout.</Answer>
        <div className="cards">
          {dev.map((d) => (
            <Link key={d.slug} href={`/developers/${d.slug}`} className="card">
              <span className="tag">Developer guide</span>
              <h3>{d.title}</h3>
              <p>{d.answer}</p>
              <span className="more">Read the guide →</span>
            </Link>
          ))}
        </div>
        <section className="sim">
          <h2>Related tools on this site</h2>
          <div className="actions">
            <Link className="btn btn-ghost btn-sm" href="/compare/coding">ChatGPT vs Claude: coding test kit</Link>
            <Link className="btn btn-ghost btn-sm" href="/roles/developers">Developer role guide</Link>
            <Link className="btn btn-ghost btn-sm" href="/roadmaps">Evaluate, prototype, ship: roadmap</Link>
            <Link className="btn btn-ghost btn-sm" href="/glossary">AI glossary</Link>
          </div>
        </section>
        <Faq items={[
          ["Which AI model should my product use?", "The smallest model that passes your own test set. Larger models cost more and respond slower, so prove you need them."],
          ["Can I put my API key in front-end code?", "No. Keep keys on the server and load them from environment variables."],
          ["How do I keep an AI agent safe?", "Narrow its scope, give least-privilege access, require approval for consequential actions and log every step."],
        ]} />
      </div>
    </>
  );
}
