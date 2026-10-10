import type { Metadata } from "next";
import Link from "next/link";
import roles from "@/content/roles.json";

export const metadata: Metadata = {
  title: "ChatGPT and Claude guides by role",
  description: "Practical guides for sales, marketing, founders, students, creators and developers: the best tasks to start with, ready prompts, a pilot plan and the risks to watch.",
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
      <div className="wrap" style={{ paddingBottom: 56 }}>
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
      </div>
    </>
  );
}
