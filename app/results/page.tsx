import type { Metadata } from "next";
import Link from "next/link";
import templates from "@/content/templates.json";
import { Answer, Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Results and evidence log",
  description: "What LeadGenLab has actually tested, how results are recorded, and which workflows are still untested. No testimonials or results are published unless real.",
  alternates: { canonical: "/results" },
};

export default function Results() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Evidence</p>
          <h1>Results and evidence log</h1>
          <p className="lede">What we have tested, how we record it, and what is still unproven.</p>
        </div>
      </section>
      <div className="wrap sim-stack">
        <Answer>We publish a result only when it is real and recorded: date, sample size, setup and outcome. One workflow has a single small recorded run (details below). No workflow has a proven performance result, and we have no client testimonials or case studies to show.</Answer>
        <section className="sim">
          <p className="eyebrow">Current status</p>
          <h2>Workflow templates</h2>
          <div className="table-wrap">
            <table className="audit-table">
              <thead><tr><th>Template</th><th>Status</th><th>Recorded runs</th></tr></thead>
              <tbody>
                {templates.map((t) => (
                  <tr key={t.slug}>
                    <th scope="row"><Link href={`/templates/${t.slug}`}>{t.name}</Link></th>
                    <td><span className="badge badge-warn">{t.status}</span></td>
                    <td>{(t.runs as unknown[]).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 12 }}>One run is recorded for ICP and account research. It was scored by Claude against a written rubric and has not yet been reviewed by a person, so treat it as directional.</p>
        </section>
        <section className="sim">
          <p className="eyebrow">Method</p>
          <h2>How a result gets onto this page</h2>
          <ol className="next">
            <li>The setup is written down before the test: sample, source, success measure.</li>
            <li>A person reviews and scores the output.</li>
            <li>Counts are published as counts, with the sample size and any limits.</li>
            <li>Small samples are labelled directional, not proof.</li>
          </ol>
        </section>
        <Faq items={[
          ["Do you have client case studies?", "Not yet. We will publish them only with the client's permission and real, recorded outcomes."],
          ["Why no testimonials?", "We do not publish quotes we cannot attribute and verify."],
          ["Can I share my own result?", "Yes. If you have run a template, send the sample size, setup and outcome through the contact page and we may feature it with your permission."],
        ]} />
        <section className="cta-band">
          <h2>Ran one of our templates?</h2>
          <p>Share what happened, including what did not work.</p>
          <Link className="btn" href="/contact">Share a result</Link>
        </section>
      </div>
    </>
  );
}
