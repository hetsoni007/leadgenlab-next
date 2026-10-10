import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkflowSim } from "@/components/interactive/WorkflowSim";
import { RoleLens } from "@/components/interactive/RoleLens";
import { RoadmapExplorer } from "@/components/interactive/RoadmapExplorer";
import { AssistantFinder } from "@/components/interactive/AssistantFinder";
import { Estimator } from "@/components/interactive/Estimator";
import { UpdateBrowser, type Item } from "@/components/interactive/UpdateBrowser";
import { simFor } from "@/lib/sim";
import { Toc } from "@/components/Toc";
import { TextSize } from "@/components/TextSize";
import { headingsOf, readingMinutes } from "@/lib/toc";
import { allPages, childrenOf, dateOf, formatDate, getPage, rewriteLinks, SECTION_LABEL } from "@/lib/content";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return allPages
    .filter((p) => p.path !== "/" && p.path !== "/contact")
    .map((p) => ({ slug: p.path.slice(1).split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage("/" + slug.join("/"));
  if (!page) return {};
  return {
    title: page.title,
    description: page.description || page.intro,
    alternates: { canonical: page.path },
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  const page = getPage(path);
  if (!page) notFound();

  const section = slug[0];
  const isSectionIndex = slug.length === 1;
  const children = isSectionIndex ? childrenOf(slug[0]) : [];
  const showCards = isSectionIndex && children.length > 0;
  // Large legacy index pages are replaced by the generated card list.
  const showBody = !(showCards && page.html.length > 8000) && page.html.length > 0;
  const interactiveIndex = showCards && (section === "ai-updates" || section === "weekly-reset");
  const date = dateOf(page);
  const sim = simFor(path);
  const isArticle = !isSectionIndex && (section === "ai-updates" || section === "weekly-reset");
  const toolOf = (t: string) =>
    /claude|anthropic|haiku|sonnet|opus/i.test(t) ? "Claude" : /chatgpt|openai|gpt|codex|sora/i.test(t) ? "ChatGPT / OpenAI" : "Other";
  const items: Item[] = children.map((c) => ({
    path: c.path, title: c.title, description: c.description,
    date: dateOf(c), dateLabel: dateOf(c) ? formatDate(dateOf(c)!) : null,
    tool: toolOf(c.title + " " + c.path),
  }));
  const replaceBody = path === "/roadmaps";
  const body = showBody && !replaceBody ? rewriteLinks(page.html, page.legacy) : "";
  const toc = showBody ? headingsOf(body) : [];
  const minutes = showBody ? readingMinutes(body) : 0;
  const longRead = showBody && minutes >= 2;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {!isSectionIndex && (<> / <Link href={`/${section}`}>{SECTION_LABEL[section] ?? section}</Link></>)}
          </nav>
          {date && <p className="eyebrow">{formatDate(date)}</p>}
          <h1>{page.title}</h1>
          {page.intro && <p className="lede">{page.intro}</p>}
          {showBody && (
            <p className="meta">
              {date && <span>{formatDate(date)}</span>}
              <span>{minutes} min read</span>
              <span>Plain English first, technical detail below</span>
            </p>
          )}
        </div>
      </section>

      {replaceBody && <div className="wrap" style={{ paddingBottom: 40 }}><RoadmapExplorer /></div>}

      {showBody && body && (
        <div className="wrap article-grid">
          <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
          <aside className="aside" aria-label="Reading tools">
            <TextSize />
            {longRead && <Toc items={toc} />}
          </aside>
        </div>
      )}

      {interactiveIndex && <div className="wrap"><UpdateBrowser items={items} /></div>}

      {showCards && !interactiveIndex && (
        <div className="wrap">
          <div className="cards" style={{ paddingBottom: 56 }}>
            {children.map((c) => (
              <Link key={c.path} href={c.path} className="card">
                {dateOf(c) && <time dateTime={dateOf(c)!}>{formatDate(dateOf(c)!)}</time>}
                <h3>{c.title}</h3>
                {c.description && <p>{c.description}</p>}
              </Link>
            ))}
          </div>
        </div>
      )}

      {(isArticle || sim) && !isSectionIndex && (
        <div className="wrap sim-stack">
          {isArticle && <RoleLens />}
          {sim && <WorkflowSim key={path} kind={sim.kind} task={sim.task} title={sim.title || undefined} />}
        </div>
      )}
      {path === "/workflows" && <div className="wrap sim-stack"><WorkflowSim kind="lead" task="A company announces a new product line" title="Lead research to relevant outreach" /></div>}
      {path === "/services" && <div className="wrap sim-stack"><Estimator /></div>}
      {(path === "/tools" || path === "/tools/choosing-ai-assistant") && <div className="wrap sim-stack"><AssistantFinder /></div>}

      <div className="wrap">
        <section className="cta-band">
          <h2>Want this applied to your team&apos;s work?</h2>
          <p>Request an AI workflow audit and get a short, practical read on where to start.</p>
          <Link className="btn" href="/contact">Request an AI workflow audit</Link>
        </section>
      </div>
    </>
  );
}
