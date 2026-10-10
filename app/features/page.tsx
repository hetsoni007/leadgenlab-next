import type { Metadata } from "next";
import Link from "next/link";
import features from "@/content/features.json";

export const metadata: Metadata = {
  title: "AI assistant features explained",
  description: "Projects, file uploads, memory and agents explained in plain English, with how to test each one safely and what to verify on official pages.",
  alternates: { canonical: "/features" },
};

export default function Features() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Features</p>
          <h1>The features that matter, explained and tested</h1>
          <p className="lede">Names and limits differ between ChatGPT and Claude and change often. These guides explain the idea, how to test it safely, and what to confirm on the official pages.</p>
        </div>
      </section>
      <div className="wrap" style={{ paddingBottom: 56 }}>
        <div className="cards">
          {features.map((f) => (
            <Link key={f.slug} href={`/features/${f.slug}`} className="card">
              <span className="tag">Feature guide</span>
              <h3>{f.title}</h3>
              <p>{f.what}</p>
              <span className="more">Read the guide →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
