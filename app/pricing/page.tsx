import type { Metadata } from "next";
import { Answer, Faq } from "@/components/Faq";
import { PlanChooser } from "@/components/interactive/PlanChooser";

export const metadata: Metadata = {
  title: "ChatGPT and Claude plans: how to choose",
  description: "A simple way to decide between free and paid plans for ChatGPT and Claude, without out-of-date price tables. Includes a plan chooser and official links.",
  alternates: { canonical: "/pricing" },
};

export default function Pricing() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Plans and cost</p>
          <h1>Choose a plan without guessing</h1>
          <p className="lede">Plan names, prices and limits change often, so we don&apos;t publish a price table that would go stale. Instead: a method to decide, and links to the official pages.</p>
        </div>
      </section>
      <div className="wrap sim-stack" style={{ paddingBottom: 40 }}>
        <Answer>Start on the free plan of the tools you are comparing. Upgrade only when you can name the specific limit or feature that blocked a real task, and check the official pricing page for current prices.</Answer>
        <PlanChooser />
        <section className="sim">
          <p className="eyebrow">Rules of thumb</p>
          <h2>Three questions before you pay</h2>
          <ol className="next">
            <li><b>What exactly blocked me on the free plan?</b> If you can&apos;t name it, don&apos;t upgrade yet.</li>
            <li><b>What is the full cost?</b> Include your review time, not just the subscription.</li>
            <li><b>Can I cancel easily?</b> Prefer monthly while you are still testing.</li>
          </ol>
        </section>
        <Faq items={[
          ["Do I need a paid ChatGPT or Claude plan?", "Not to start. Test on the free plan with real tasks and pay only when a specific limit or feature blocks you."],
          ["Why don't you list prices?", "Plans and prices change often, so a table here would go stale. We link to the official pages instead."],
          ["Is a team plan different from a personal plan?", "Often yes: team and business plans usually add admin controls and different data terms. Compare them on the provider's own pages."],
        ]} />
      </div>
    </>
  );
}
