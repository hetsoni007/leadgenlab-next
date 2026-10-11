import Link from "next/link";
import { SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap"><div className="footer-card"><div className="footer-grid">
        <div>
          <p className="brand-line">LeadGen<em>Lab</em></p>
          <p className="muted">Practical AI workflows, release explainers and consulting for teams that need results, not hype.</p>
        </div>
        <div>
          <h2>Learn</h2>
          <Link href="/learn">Start here: learn the basics</Link>
          <Link href="/prompts">Prompt library</Link>
          <Link href="/templates">Outbound templates</Link>
          <Link href="/roles">Guides by role</Link>
          <Link href="/features">Feature guides</Link>
          <Link href="/developers">Developer guides</Link>
          <Link href="/roundup/2026-10">Monthly roundup</Link>
          <Link href="/safety">Safety and privacy</Link>
          <Link href="/pricing">Plans and cost</Link>
          <Link href="/india">Using AI in India</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/compare">ChatGPT vs Claude tests</Link>
          <Link href="/ai-updates">Release updates</Link>
          <Link href="/weekly-reset">Weekly reset</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/workflows">Workflows</Link>
          <Link href="/voices">Voices to follow</Link>
        </div>
        <div>
          <h2>Work with us</h2>
          <Link href="/contact">Request an AI workflow audit</Link>
          <Link href="/quiz">AI readiness quiz</Link>
          <Link href="/sample-audit">Sample audit</Link>
          <Link href="/results">Results and evidence</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} LeadGenLab, by Soni Consultancy Services.</span>
        <Link href="/about/editorial-standards">Editorial standards</Link>
      </div></div></div>
    </footer>
  );
}
