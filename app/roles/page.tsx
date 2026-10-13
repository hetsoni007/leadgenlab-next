import type { Metadata } from "next";
import Link from "next/link";
import roles from "@/content/roles.json";
import { Answer, Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "ChatGPT and Claude guides by role",
  description: "Practical ChatGPT and Claude guides for HR, developers, and UI/UX designers, plus other roles. Copy prompts, see sample outputs, and follow a productivity pilot.",
  alternates: { canonical: "/roles" },
};

export default function Roles() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">By role</p>
          <h1>Practical AI workflows for your role</h1>
          <p className="lede">Start with focused guides for HR, developers, and UI/UX designers. Each includes copy-ready prompts, sample outputs, a step-by-step productivity pilot, and checks to keep the work reliable.</p>
        </div>
      </section>
      <div className="wrap sim-stack" style={{ paddingBottom: 56 }}>
        <Answer>Choose your role to see practical tasks, ready-to-use prompts with example outputs, and a two-week pilot to measure productivity gains safely.</Answer>
        <div className="cards">
          {roles.filter((r) => ["hr", "developers", "ui-ux-designers"].includes(r.slug)).map((r) => (
            <Link key={r.slug} href={`/roles/${r.slug}`} className="card"><span className="tag">Featured role guide</span><h3>{r.title}</h3><p>{r.short}</p><span className="more">Explore prompts and workflow →</span></Link>
          ))}
        </div>
        <h2>More role guides</h2>
        <div className="cards">
          {roles.filter((r) => !["hr", "developers", "ui-ux-designers"].includes(r.slug)).map((r) => (
            <Link key={r.slug} href={`/roles/${r.slug}`} className="card">
              <span className="tag">Role guide</span>
              <h3>{r.title}</h3>
              <p>{r.short}</p>
              <span className="more">Open the guide →</span>
            </Link>
          ))}
        </div>
        <Faq items={[
          ["Which ChatGPT or Claude tasks should I start with at work?", "Pick repeated, low-risk tasks you can check yourself, such as drafting, summarising and structuring notes. Each role guide lists the best starting tasks."],
          ["How long should an AI pilot run?", "Two weeks on one real workflow is enough to see time saved and errors caught, if you measure before and after."],
          ["Do these guides recommend one tool?", "No. The prompts work in ChatGPT and Claude, and the compare pages show how to test both on your own work."],
        ]} />
      </div>
    </>
  );
}
