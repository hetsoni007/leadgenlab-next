import type { Metadata } from "next";
import { GlossaryBrowser } from "@/components/interactive/GlossaryBrowser";
import { JsonLd } from "@/components/JsonLd";
import terms from "@/content/glossary.json";

export const metadata: Metadata = {
  title: "AI glossary: plain-English definitions",
  description: "30 AI terms explained simply: prompt, token, context window, hallucination, agent, RAG and more.",
  alternates: { canonical: "/glossary" },
};

export default function Glossary() {
  const list = terms.map((t) => ({ term: t.term, def: t.def_ }));
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org", "@type": "DefinedTermSet", name: "LeadGenLab AI glossary",
          hasDefinedTerm: list.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.def })),
        }}
      />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Glossary</p>
          <h1>AI terms, in plain English</h1>
          <p className="lede">Short definitions for the words you will meet in guides, release notes and product pages.</p>
        </div>
      </section>
      <div className="wrap" style={{ paddingBottom: 56 }}>
        <GlossaryBrowser terms={list} />
      </div>
    </>
  );
}
