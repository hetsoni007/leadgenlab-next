import Link from "next/link";
import { DailyFeed } from "@/components/DailyFeed";
import { FlowDiagram, HeroArt, Icon, StatStrip } from "@/components/art";
import { allPages, childrenOf, dateOf, formatDate, SITE } from "@/lib/content";

function short(d: string, n: number) {
  if (d.length <= n) return d;
  const cut = d.slice(0, n);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "") + "…";
}

export default function Home() {
  const updates = childrenOf("ai-updates");
  const [top, ...rest] = updates;
  const compact = rest.slice(0, 4);
  const grid = updates.slice(0, 5);
  const stats = [
    { value: updates.length, label: "release explainers" },
    { value: allPages.filter((p) => p.path.startsWith("/guides/")).length, label: "beginner guides" },
    { value: allPages.filter((p) => p.path.startsWith("/workflows/")).length, label: "workflow samples" },
    { value: 20, label: "answered newcomer questions" },
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
              We track every Claude and ChatGPT release, explain what actually changed, and help sales,
              marketing and operations teams turn it into a measurable process.
            </p>
            <div className="actions">
              <Link className="btn" href="/contact">Request an AI workflow audit</Link>
              {SITE.bookingUrl ? (
                <a className="btn btn-ghost" href={SITE.bookingUrl}>Book a call</a>
              ) : (
                <Link className="btn btn-ghost" href="/learn">New to AI? Start here</Link>
              )}
            </div>
            <div className="proof">
              <span>Official sources linked</span>
              <span>Plain English + technical</span>
              <span>Tested when reproducible</span>
            </div>
          </div>

          <aside className="panel" aria-label="Latest releases">
            <div className="panel-head"><span className="live">Latest releases</span><Link href="/ai-updates">View all →</Link></div>
            {top && (
              <Link href={top.path} className="feature">
                {dateOf(top) && <time dateTime={dateOf(top)!}>{formatDate(dateOf(top)!)}</time>}
                <h3>{top.title}</h3>
              </Link>
            )}
            <ul className="mini">
              {compact.map((p) => (
                <li key={p.path}>
                  <Link href={p.path}>
                    {dateOf(p) && <time dateTime={dateOf(p)!}>{formatDate(dateOf(p)!).replace(/ 20\d\d$/, "")}</time>}
                    <span>{short(p.title, 78)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <StatStrip stats={stats} />

      <DailyFeed />

      <FlowDiagram />

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">What changed</p>
              <h2>Explained, not just announced</h2>
            </div>
            <Link href="/ai-updates">All updates →</Link>
          </div>
          <div className="cards">
            {grid.map((p, i) => (
              <Link key={p.path} href={p.path} className={`card${i === 0 ? " card-wide" : ""}`}>
                {dateOf(p) && <time dateTime={dateOf(p)!}>{formatDate(dateOf(p)!)}</time>}
                <h3>{p.title}</h3>
                {p.description && <p>{p.description}</p>}
                <span className="more">Read the explainer →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
