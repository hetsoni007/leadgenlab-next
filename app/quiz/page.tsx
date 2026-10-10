import type { Metadata } from "next";
import { Quiz } from "@/components/interactive/Quiz";

export const metadata: Metadata = {
  title: "AI readiness quiz",
  description: "Eight questions to see whether your team should explore, pilot or scale AI workflows, with concrete next steps.",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Two-minute self-assessment</p>
          <h1>How ready is your team for AI workflows?</h1>
          <p className="lede">Eight quick questions across process, data, people and governance. You get a stage, a score by area, and three practical next steps.</p>
        </div>
      </section>
      <div className="wrap" style={{ paddingBottom: 64, maxWidth: 820 }}>
        <Quiz />
      </div>
    </>
  );
}
