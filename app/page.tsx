import type { Metadata } from "next";
import Link from "next/link";
import { DailyFeed } from "@/components/DailyFeed";
import { HeroArt, Icon, StatStrip } from "@/components/art";
import { allPages, childrenOf, SITE } from "@/lib/content";
import prompts from "@/content/prompts.json";
import templates from "@/content/templates.json";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const PATHS = [
  { href: "/learn", icon: "explain", title: "New to ChatGPT or Claude?", text: "Pick a tool, practise a prompt, get answers to common questions." },
  { href: "/prompts", icon: "try", title: "Prompt library", text: "Copy-ready prompts, with a guide that fills the blanks for you." },
  { href: "/roles", icon: "measure", title: "Find your role workflow", text: "Practical guides for HR, developers, and UI/UX designers." },
  { href: "/templates", icon: "measure", title: "Outbound workflows", text: "Review-first lead generation templates with a test log." },
];

export default function Home() {
  const stats = [
    { value: childrenOf("ai-updates").length, label: "release explainers" },
    { value: prompts.length, label: "ready prompts" },
    { value: templates.length, label: "outbound workflows" },
    { value: allPages.filter((p) => p.path.startsWith("/guides/")).length, label: "beginner guides" },
  ];
  return (
    <>
      <section className="hero">
        <HeroArt />
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">AI workflow consulting · Claude + ChatGPT</p>
            <h1>Turn AI releases into <span className="grad-text">working</span> workflows.</h1>
            <p className="lede">
              We track Claude and ChatGPT releases and turn them into useful workflows for HR, developers,
              and UI/UX designers—with role-specific prompts, demo outputs, and step-by-step productivity guides.
            </p>
            <div className="actions">
              <Link className="btn" href="/contact">Request an AI workflow audit</Link>
              {SITE.bookingUrl ? (
                <a className="btn btn-ghost" href={SITE.bookingUrl}>Book a call</a>
              ) : (
                <Link className="btn btn-ghost" href="/learn">New to AI? Start here</Link>
              )}
            </div>
          </div>

          <nav className="panel start" aria-label="Start here">
            <p className="panel-head"><span>Start here</span></p>
            <ul>
              {PATHS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>
                    <span className="start-icon"><Icon name={p.icon} size={26} /></span>
                    <span className="start-text"><b>{p.title}</b><small>{p.text}</small></span>
                    <span className="start-go" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <StatStrip stats={stats} />

      <DailyFeed />

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">How an engagement works</p>
          <h2 style={{ marginBottom: 26 }}>From audit to a workflow your team uses</h2>
          <ol className="steps">
            <li><Icon name="audit" /><h3>Audit</h3><p>We map where your team loses time and which tasks suit Claude or ChatGPT.</p></li>
            <li><Icon name="design" /><h3>Design</h3><p>One workflow at a time, with a human check where it matters.</p></li>
            <li><Icon name="pilot" /><h3>Pilot</h3><p>Run it on real work for two weeks and measure time saved and quality.</p></li>
            <li><Icon name="handover" /><h3>Hand over</h3><p>Playbooks and prompts your team owns, plus a plan for what&apos;s next.</p></li>
          </ol>
        </div>
      </section>

      <div className="wrap">
        <section className="cta-band">
          <h2>Find your first workflow worth automating.</h2>
          <p>Tell us about your team in a few lines. You&apos;ll get a short, honest read on where AI helps and where it doesn&apos;t.</p>
          <Link className="btn" href="/contact">Request an AI workflow audit</Link>
        </section>
      </div>
    </>
  );
}
