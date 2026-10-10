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
