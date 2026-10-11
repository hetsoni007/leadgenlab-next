import type { Metadata } from "next";
import Link from "next/link";
import { Answer, Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Sample AI workflow audit: what you get",
  description: "See what an AI workflow audit looks like: workflow inventory, fit and risk scoring, a pilot plan and metrics. Illustrative example with invented numbers.",
  alternates: { canonical: "/sample-audit" },
};

const ROWS = [
  ["Weekly sales report", "3 hrs", "High", "Low", "1", "Draft from exported data, human checks numbers"],
  ["First-response to enquiries", "6 hrs", "Medium", "Medium", "2", "Draft replies from approved answers; person sends"],
  ["Meeting notes and follow-ups", "4 hrs", "High", "Low", "1", "Structured minutes with owners and dates"],
  ["Supplier contract review", "2 hrs", "Low", "High", "Not now", "Needs legal review; keep human-led"],
  ["Monthly KPI commentary", "2 hrs", "Medium", "Medium", "3", "Draft explanation, finance verifies figures"],
];

export default function SampleAudit() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Sample audit</p>
          <h1>What an AI workflow audit looks like</h1>
          <p className="lede">A short, practical read on where AI helps, where it doesn&apos;t, and what to try first. This example is fictional.</p>
        </div>
      </section>
      <div className="wrap sim-stack">
        <Answer label="Read this first">
          This is an illustrative example for a made-up company. The numbers are invented to show the format, not results from a real client.
          A real audit uses your own workflows and your own measurements.
        </Answer>
        <section className="sim">
          <p className="eyebrow">Example company</p>
          <h2>Northwind Logistics (fictional): 40 people</h2>
          <p><span className="badge badge-warn">Invented example</span> The leadership team wanted to know where AI could save time without adding risk.</p>
        </section>
        <section className="sim">
          <p className="eyebrow">1 · Workflow inventory</p>
          <h2>Where the time goes, and how well AI fits</h2>
          <div className="table-wrap">
            <table className="audit-table">
              <thead><tr><th>Workflow</th><th>Time / week</th><th>AI fit</th><th>Risk</th><th>Priority</th><th>Suggested approach</th></tr></thead>
              <tbody>{ROWS.map((r) => (<tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th scope="row" key={i}>{c}</th> : <td key={i}>{c}</td>))}</tr>))}</tbody>
            </table>
          </div>
        </section>
        <section className="sim">
          <p className="eyebrow">2 · Recommendation</p>
          <h2>Pilot two workflows, not five</h2>
          <ol className="next">
            <li><b>Weekly sales report</b> and <b>meeting notes</b>: low risk, clear before-and-after measures.</li>
            <li>Run for two weeks with a named owner and a human review step.</li>
            <li>Keep contract review human-led; revisit after the pilot.</li>
          </ol>
        </section>
        <section className="sim">
          <p className="eyebrow">3 · How success is measured</p>
          <h2>Metrics agreed before the pilot starts</h2>
          <ul className="next">
            <li>Minutes per report before and after</li>
            <li>Number of factual corrections found in review</li>
            <li>Owner and team confidence score at week two</li>
          </ul>
        </section>
        <section className="sim">
          <p className="eyebrow">4 · Risks and rules</p>
          <h2>Guardrails for the pilot</h2>
          <ul className="next">
            <li>No customer personal data in consumer AI accounts</li>
            <li>A person approves anything sent outside the company</li>
            <li>Stop and review if two corrections of the same kind appear in a week</li>
          </ul>
        </section>
        <Faq
          items={[
            ["What is an AI workflow audit?", "A short review of your team's repeated work that identifies which tasks suit AI, which carry risk, and what to pilot first, with measures agreed in advance."],
            ["What do I need to prepare?", "A list of recurring tasks, roughly how long each takes, who does them, and what data they involve. No technical knowledge is required."],
            ["Does the audit include building anything?", "No. It ends with a prioritised pilot plan. Build work is separate and optional."],
            ["Is this sample a real client?", "No. The company and figures are invented to show the format."],
          ]}
        />
        <section className="cta-band">
          <h2>Want an audit of your own workflows?</h2>
          <p>Tell us about your team in a few lines and we will reply with how an audit would work for you.</p>
          <Link className="btn" href="/contact">Request an AI workflow audit</Link>
        </section>
      </div>
    </>
  );
}
