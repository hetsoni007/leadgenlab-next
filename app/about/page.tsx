import type { Metadata } from "next";
import Link from "next/link";
import { Answer, Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About LeadGenLab",
  description: "LeadGenLab explains Claude and ChatGPT releases in plain English and helps teams build measurable AI workflows. Published by Soni Consultancy Services.",
  alternates: { canonical: "/about" },
};

const LINKEDIN = "https://www.linkedin.com/newsletters/lead-gen-lab-7452722488368644096/";

export default function About() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "AboutPage", name: "About LeadGenLab", url: SITE.url + "/about",
        mainEntity: {
          "@type": "Organization", name: "LeadGenLab", url: SITE.url, email: SITE.email,
          parentOrganization: { "@type": "Organization", name: "Soni Consultancy Services", url: "https://soniconsultancyservices.com/" },
          founder: { "@type": "Person", name: "Het Soni", sameAs: [LINKEDIN] },
          sameAs: [LINKEDIN],
        },
      }} />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1>Clear explanations. Measured workflows.</h1>
          <p className="lede">LeadGenLab helps people use Claude and ChatGPT with confidence, and helps teams turn them into processes they can measure.</p>
        </div>
      </section>
      <div className="wrap sim-stack">
        <Answer label="Who we are">
          LeadGenLab is a publication and consulting project by Soni Consultancy Services. It tracks Claude and ChatGPT releases, explains what changed in plain English,
          and publishes tested, review-first workflows for sales, marketing and operations teams.
        </Answer>
        <section className="sim">
          <h2>What we publish</h2>
          <ul className="next">
            <li><Link href="/ai-updates">Release explainers</Link> and a <Link href="/roundup/2026-10">monthly roundup</Link>, with links to official sources.</li>
            <li><Link href="/learn">Beginner guides</Link>, a <Link href="/prompts">prompt library</Link> and <Link href="/roles">role guides</Link>.</li>
            <li><Link href="/templates">Outbound workflow templates</Link> with an honest <Link href="/results">evidence log</Link>.</li>
          </ul>
        </section>
        <section className="sim">
          <h2>How we work</h2>
          <ol className="next">
            <li><b>Start with the reader:</b> define terms and give enough context to decide.</li>
            <li><b>Explain the impact:</b> look beyond the announcement to what it changes.</li>
            <li><b>Be clear about incentives:</b> paid placements and affiliate relationships are labelled.</li>
            <li><b>Say what is unconfirmed:</b> we mark items we could not verify at the source.</li>
          </ol>
          <p><Link href="/about/editorial-standards">Read the full editorial standards →</Link></p>
        </section>
        <section className="sim">
          <h2>Who is behind it</h2>
          <p>
            LeadGenLab is written by <b>Het Soni</b> at <a href="https://soniconsultancyservices.com/" rel="noopener noreferrer" target="_blank">Soni Consultancy Services</a>,
            which builds mobile apps, software and AI-enabled products. Editorial coverage is kept separate from client work.
            Het also writes the <a href={LINKEDIN} rel="noopener noreferrer" target="_blank">Lead Gen Lab newsletter on LinkedIn</a>.
          </p>
        </section>
        <Faq items={[
          ["What is LeadGenLab?", "A publication and consulting project that explains Claude and ChatGPT updates and publishes practical AI workflows."],
          ["Who runs LeadGenLab?", "Het Soni, through Soni Consultancy Services."],
          ["Are you affiliated with OpenAI or Anthropic?", "No. LeadGenLab is independent and links to official sources for every claim about their products."],
          ["How can I work with you?", "Request an AI workflow audit on the contact page."],
        ]} />
        <section className="cta-band">
          <h2>Talk to us about your workflows</h2>
          <p>Request an AI workflow audit and get a short, practical read on where to start.</p>
          <Link className="btn" href="/contact">Request an AI workflow audit</Link>
        </section>
      </div>
    </>
  );
}
