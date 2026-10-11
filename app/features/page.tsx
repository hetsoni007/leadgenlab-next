import type { Metadata } from "next";
import Link from "next/link";
import features from "@/content/features.json";
import { Answer, Faq } from "@/components/Faq";

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
      <div className="wrap sim-stack" style={{ paddingBottom: 56 }}>
        <Answer>Features such as projects, file uploads, memory and agents are named and limited differently in ChatGPT and Claude, and they change often. Learn the idea here, test it safely, then confirm names and limits on the official pages.</Answer>
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
        <Faq items={[
          ["Do ChatGPT and Claude have the same features?", "Many are similar in idea but differ in name, limits and availability by plan. Always check the official pages for your plan."],
          ["Which feature should I try first?", "File uploads on a document you know well. It is easy to check and shows quickly how well the assistant works from your own material."],
          ["Are agents safe to use at work?", "They can be, with narrow scope, least-privilege access and human approval for consequential actions. See the agents guide."],
        ]} />
      </div>
    </>
  );
}
