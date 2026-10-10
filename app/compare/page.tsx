import type { Metadata } from "next";
import Link from "next/link";
import compare from "@/content/compare.json";

export const metadata: Metadata = {
  title: "ChatGPT vs Claude: test it yourself",
  description: "Hands-on comparisons with a ready prompt, a sample task and a scorecard. Find which assistant fits your work instead of trusting a ranking.",
  alternates: { canonical: "/compare" },
};

export default function CompareHub() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Comparisons</p>
          <h1>ChatGPT vs Claude: test, don&apos;t guess</h1>
          <p className="lede">
            Both products change often, so a fixed &ldquo;winner&rdquo; goes stale. Each guide gives you the same prompt,
            a sample task and a scorecard, so you can decide with your own work.
          </p>
        </div>
      </section>
      <div className="wrap" style={{ paddingBottom: 56 }}>
        <div className="cards">
          {compare.map((c) => (
            <Link key={c.slug} href={`/compare/${c.slug}`} className="card">
              <span className="tag">Test kit</span>
              <h3>{c.title}</h3>
              <p>{c.intro}</p>
              <span className="more">Open the test kit →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
