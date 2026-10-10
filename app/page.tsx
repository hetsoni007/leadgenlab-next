import Link from "next/link";
import { childrenOf, dateOf, formatDate, SITE } from "@/lib/content";

export default function Home() {
  const latest = childrenOf("ai-updates").slice(0, 6);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">AI workflow consulting · Claude + ChatGPT</p>
          <h1>Turn AI releases into <em>working</em> workflows.</h1>
          <p className="lede">
            We track every Claude and ChatGPT release, explain what actually changed, and help sales,
            marketing and operations teams turn it into a measurable process.
          </p>
          <div className="actions">
            <Link className="btn" href="/contact">Request an AI workflow audit</Link>
            {SITE.bookingUrl ? (
              <a className="btn btn-ghost" href={SITE.bookingUrl}>Book a call</a>
            ) : (
              <Link className="btn btn-ghost" href="/ai-updates">Read the latest updates</Link>
            )}
          </div>
          <div className="proof">
            <div><strong>Official sources</strong><span>Every release links to the vendor&apos;s own page.</span></div>
            <div><strong>Plain English + technical</strong><span>Two depths for every update.</span></div>
            <div><strong>Tested, not guessed</strong><span>Hands-on checks when we can reproduce a claim.</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Latest releases</p>
              <h2>What changed this week</h2>
            </div>
            <Link href="/ai-updates">All updates →</Link>
          </div>
          <div className="cards">
            {latest.map((p) => (
              <Link key={p.path} href={p.path} className="card">
                {dateOf(p) && <time dateTime={dateOf(p)!}>{formatDate(dateOf(p)!)}</time>}
                <h3>{p.title}</h3>
                {p.description && <p>{p.description.length > 140 ? p.description.slice(0, 137) + "…" : p.description}</p>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">How an engagement works</p>
          <h2 style={{ marginBottom: 28 }}>From audit to a workflow your team uses</h2>
          <ol className="steps">
            <li><h3>Audit</h3><p>We map where your team loses time and which tasks suit Claude or ChatGPT.</p></li>
            <li><h3>Design</h3><p>One workflow at a time, with a human check where it matters.</p></li>
            <li><h3>Pilot</h3><p>Run it on real work for two weeks and measure time saved and quality.</p></li>
            <li><h3>Hand over</h3><p>Playbooks and prompts your team owns, plus a plan for what&apos;s next.</p></li>
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
