import type { Metadata } from "next";
import { PromptLibrary, type PromptItem } from "@/components/interactive/PromptLibrary";
import prompts from "@/content/prompts.json";

export const metadata: Metadata = {
  title: "AI prompt library for HR, developers, and designers",
  description: "53 copy-ready ChatGPT and Claude prompts by role, with demo outputs and practical checks for HR, developers, UI/UX designers, and more.",
  alternates: { canonical: "/prompts" },
};

export default function Prompts() {
  const items = prompts as PromptItem[];
  const cats = Array.from(new Set(items.map((p) => p.cat)));
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Prompt library</p>
          <h1>Role-specific prompts with sample outputs</h1>
          <p className="lede">
            Filter by role or task. Fill in the highlighted [brackets], inspect the demo, and verify the result before using it.
          </p>
        </div>
      </section>
      <div className="wrap" style={{ paddingBottom: 56 }}>
        <PromptLibrary items={items} cats={cats} />
        <p className="muted" style={{ marginTop: 16, fontSize: 14 }}>
          Do not paste confidential, personal or regulated information into any consumer account.
          These prompts are starting points: adapt them to your own context.
        </p>
      </div>
    </>
  );
}
