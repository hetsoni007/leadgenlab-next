import type { Metadata } from "next";
import Link from "next/link";
import { OFFICIAL } from "@/lib/official";

export const metadata: Metadata = {
  title: "Using ChatGPT and Claude in India",
  description: "A practical checklist for Indian users and teams: availability, payments, languages and data considerations, with how to verify each on official pages.",
  alternates: { canonical: "/india" },
};

const SECTIONS = [
  { h: "Availability", items: ["Confirm on the official sign-up page that your country and plan are supported.", "Note which features are available to you, since some roll out by region and plan.", "Check release notes for regional availability before you plan around a feature."] },
  { h: "Payments", items: ["Check which payment methods and currencies the plan accepts.", "Look for any taxes or GST shown at checkout and how invoices are issued.", "If you need invoices for your business, confirm that before you subscribe."] },
  { h: "Language", items: ["Test the tool in your own language with a real task, and compare against English.", "Try mixed language (for example Hindi and English) if that is how your team writes.", "Ask for both an English and a local-language version of important text, and have a fluent reader check it."] },
  { h: "Data and compliance", items: ["For business use, read the provider's terms for business or enterprise accounts.", "Check where data may be processed and your obligations under Indian data-protection rules.", "Ask your legal or compliance contact before using personal data of customers or employees."] },
];

export default function India() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">India</p>
          <h1>Using ChatGPT and Claude in India</h1>
          <p className="lede">Availability, payments and features can differ by country and change over time. Use this checklist and confirm each point on the official pages.</p>
        </div>
      </section>
      <div className="wrap sim-stack">
        {SECTIONS.map((s) => (
          <section key={s.h} className="sim">
            <h2>{s.h}</h2>
            <ul className="next">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </section>
        ))}
        <section className="sim">
          <p className="eyebrow">Good first uses</p>
          <h2>Practical examples</h2>
          <ul className="next">
            <li>Summarise a long notice or circular in plain language, then confirm details with a qualified professional.</li>
            <li>Draft and polish professional emails in English from rough notes in your language.</li>
            <li>Prepare study material and practice questions for exams, then check them against your syllabus.</li>
          </ul>
          <div className="actions">
            {OFFICIAL.map((o) => (
              <a key={o.href} className="btn btn-ghost btn-sm" href={o.href} rel="noopener noreferrer" target="_blank">{o.label} ↗</a>
            ))}
          </div>
          <p className="muted" style={{ fontSize: 14, marginTop: 12 }}>
            We don&apos;t state availability or prices here because they change. Start with the <Link href="/learn">Learn hub</Link> if you are new.
          </p>
        </section>
      </div>
    </>
  );
}
