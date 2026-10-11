import type { Metadata } from "next";
import { Answer, Faq } from "@/components/Faq";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsletter: Lead Gen Lab and weekly AI reset",
  description: "Two ways to follow: the Lead Gen Lab newsletter on LinkedIn for outbound experiments, and an email note when the weekly Claude and ChatGPT reset is published.",
  alternates: { canonical: "/newsletter" },
};

const LINKEDIN = "https://www.linkedin.com/newsletters/lead-gen-lab-7452722488368644096/";

export default function Newsletter() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Newsletter</p>
          <h1>Follow LeadGenLab</h1>
          <p className="lede">Practical outbound lessons on LinkedIn, and the weekly Claude and ChatGPT reset by email.</p>
        </div>
      </section>
      <div className="wrap sim-stack">
        <Answer>The Lead Gen Lab newsletter is published on LinkedIn, and LinkedIn manages that subscription. For the weekly AI reset, leave your email below.</Answer>
        <section className="sim">
          <p className="eyebrow">On LinkedIn</p>
          <h2>Lead Gen Lab: outbound experiments</h2>
          <p>Prospecting, follow-up, buying signals and the systems that stop good leads slipping away.</p>
          <a className="btn" href={LINKEDIN} rel="noopener noreferrer" target="_blank">Open the newsletter on LinkedIn ↗</a>
        </section>
        <section className="sim">
          <p className="eyebrow">By email</p>
          <h2>Weekly AI reset</h2>
          <p className="muted">One short email a week: what changed in Claude and ChatGPT and one useful step to try.</p>
          <NewsletterForm endpoint={SITE.formEndpoint} />
        </section>
        <Faq items={[
          ["How often will I hear from you?", "Weekly for the AI reset. The LinkedIn newsletter follows its own schedule."],
          ["Can I unsubscribe?", "Yes. Reply to any email asking to stop, and you will be removed."],
          ["What do you do with my email?", "It is used only to send this newsletter and reply to you."],
        ]} />
      </div>
    </>
  );
}
