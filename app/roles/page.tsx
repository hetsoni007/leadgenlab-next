import type { Metadata } from "next";
import Link from "next/link";
import roles from "@/content/roles.json";
import { Answer, Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "ChatGPT and Claude guides by role",
  description: "Practical ChatGPT and Claude guides for sales, marketing, HR, finance, support, operations, founders, students, creators and developers.",
  alternates: { canonical: "/roles" },
};

export default function Roles() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">By role</p>
          <h1>Start with the tasks that fit your job</h1>
          <p className="lede">Each guide gives you five or six high-value tasks, the prompt for each, a two-week pilot you can run, and the risks to watch.</p>
        </div>
      </section>
      <div className="wrap sim-stack" style={{ paddingBottom: 56 }}>
        <Answer>Each guide gives you five or six high-value tasks for one job, a ready prompt for each, a two-week pilot and the risks to watch. Start with the guide closest to your role and run the pilot before you roll anything out.</Answer>
        <div className="cards">
          {roles.map((r) => (
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
