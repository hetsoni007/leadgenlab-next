import type { Metadata } from "next";
import Link from "next/link";
import { ToolMatcher } from "@/components/interactive/ToolMatcher";
import { PromptLab } from "@/components/interactive/PromptLab";
import { SpotTheError } from "@/components/interactive/SpotTheError";
import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/lib/faq";
import { FaqBrowser } from "@/components/interactive/FaqBrowser";

export const metadata: Metadata = {
  title: "Learn ChatGPT and Claude: start here",
  description: "Pick the right assistant, practise writing prompts, learn to spot errors, and get answers to the questions newcomers ask most.",
  alternates: { canonical: "/learn" },
};

export default function Learn() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Start here</p>
          <h1>New to ChatGPT or Claude? Learn by doing.</h1>
          <p className="lede">
            Choose a starting tool, practise on safe examples, and get plain answers to the questions people ask most.
            Everything on this page runs in your browser and sends nothing anywhere.
          </p>
          <ol className="learn-steps" aria-label="How this page works">
            <li><a href="#matcher"><span>1</span>Pick a tool</a></li>
            <li><a href="#prompt-lab"><span>2</span>Practise a prompt</a></li>
            <li><a href="#spot"><span>3</span>Learn to verify</a></li>
            <li><a href="#faq"><span>4</span>Get answers</a></li>
          </ol>
        </div>
      </section>
      <div className="wrap sim-stack" style={{ paddingBottom: 24 }}>
        <ToolMatcher />
        <PromptLab />
        <SpotTheError />
      </div>
      <div className="wrap" style={{ paddingBottom: 24 }}>
        <FaqBrowser />
      </div>
      <div className="wrap">
        <section className="cta-band">
          <h2>Ready to go one level deeper?</h2>
          <p>Follow a role-based route, read the beginner guides, or take the readiness quiz for your team.</p>
          <div className="actions">
            <Link className="btn" href="/roadmaps">Role-based routes</Link>
            <Link className="btn" href="/guides">Beginner guides</Link>
            <Link className="btn" href="/quiz">Team readiness quiz</Link>
          </div>
        </section>
      </div>
    </>
  );
}
