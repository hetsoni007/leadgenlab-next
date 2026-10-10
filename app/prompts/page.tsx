import type { Metadata } from "next";
import { PromptLibrary, type PromptItem } from "@/components/interactive/PromptLibrary";
import prompts from "@/content/prompts.json";

export const metadata: Metadata = {
  title: "AI prompt library for work and study",
  description: "34 copy-ready prompts for ChatGPT and Claude, grouped by task and role, each with what to check before you rely on the answer.",
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
          <h1>Copy-ready prompts that work in ChatGPT and Claude</h1>
          <p className="lede">
            Fill in the highlighted [brackets], paste, and check the result. Each prompt says what to verify,
            so you use the answer, not just accept it.
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
