import type { Metadata } from "next";
import Link from "next/link";
import templates from "@/content/templates.json";
import { ResultsCalculator } from "@/components/interactive/ResultsCalculator";

export const metadata: Metadata = {
  title: "Outbound lead generation templates with Claude",
  description: "Four review-first outbound workflows: ICP and account research, signal-based first touch, follow-ups with stop rules, and reply triage. Each has prompts, gates and a test log.",
  alternates: { canonical: "/templates" },
};

export default function Templates() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Outbound workflow templates</p>
          <h1>Outbound templates you can test, not just copy</h1>
          <p className="lede">
            Four workflows for B2B outreach with Claude. Every template has the prompt, the steps across LinkedIn, Apollo, your email tool and your CRM,
            human review gates, stop rules, and a results log. We label each one by what has actually been tested.
          </p>
        </div>
      </section>
      <div className="wrap sim-stack">
        <section className="sim">
          <p className="eyebrow">How we label evidence</p>
          <h2>No result is published until it is real</h2>
          <ul className="next">
            <li><b>Untested draft:</b> built from sound practice, not yet run by us.</li>
            <li><b>Tested by us:</b> run on a real sample with the sample size, setup and outcome recorded below the template.</li>
            <li>We never state a reply rate or a number of meetings we have not recorded.</li>
          </ul>
        </section>
        <div className="cards">
          {templates.map((t) => (
            <Link key={t.slug} href={`/templates/${t.slug}`} className="card">
              <span className="tag">Workflow {t.n} · {t.status}</span>
              <h3>{t.name}</h3>
              <p>{t.goal}</p>
              <span className="more">Open the template →</span>
            </Link>
          ))}
        </div>
        <ResultsCalculator />
        <section className="sim">
          <p className="eyebrow">Before you send anything</p>
          <h2>Ground rules</h2>
          <ul className="next">
            <li>Contact people only where you have a lawful basis, and include a clear way to opt out.</li>
            <li>Respect the terms of LinkedIn, your email provider and any data tool you use.</li>
            <li>Use only information you are allowed to use. Never paste private or sensitive data into a consumer AI account.</li>
            <li>A person reviews and sends every message. These templates draft and organise; they do not decide who is contacted.</li>
          </ul>
          <p className="muted" style={{ fontSize: 14 }}>General guidance, not legal advice. Rules vary by country and industry.</p>
        </section>
      </div>
    </>
  );
}
