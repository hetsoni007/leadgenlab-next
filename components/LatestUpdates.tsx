"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

export type UpdateItem = {
  date: string; dateLabel: string; tool: "Claude" | "ChatGPT" | string; title: string; summary: string;
  url: string; source: string; ours?: string; unconfirmed?: boolean; category?: string;
};

const TABS = ["All", "Claude", "ChatGPT", "Usage news"] as const;

export function LatestUpdates({ items, checked }: { items: UpdateItem[]; checked: string }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const list = useMemo(
    () => items.filter((i) => tab === "Usage news" ? i.category === "usage" : tab === "All" || i.tool === tab).slice(0, 6),
    [items, tab],
  );

  return (
    <section className="section" aria-labelledby="lu-h">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Checked daily · last {checked}</p>
            <h2 id="lu-h">Latest Claude and ChatGPT updates</h2>
          </div>
          <Link href="/ai-updates">All explainers →</Link>
        </div>

        <div className="seg" role="group" aria-label="Filter updates" style={{ marginBottom: 16 }}>
          {TABS.map((t) => (
            <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        <ul className="lu" aria-live="polite">
          {list.map((i) => {
            const href = i.ours ?? i.url;
            const external = !i.ours;
            return (
              <li key={i.title + i.date} className="lu-row">
                <time className="lu-date" dateTime={i.date}>{i.dateLabel}</time>
                <span className={`lu-tool lu-${i.tool.toLowerCase()}`}>{i.tool}</span>
                <div className="lu-main">
                  {external
                    ? <a href={href} rel="noopener noreferrer" target="_blank" className="lu-title">{i.title}</a>
                    : <Link href={href} className="lu-title">{i.title}</Link>}
                  <p className="lu-sum">{i.summary}</p>
                </div>
                <div className="lu-meta">
                  {i.unconfirmed && <span className="flag" title="Seen on a secondary source. Confirm on the official page.">Unconfirmed</span>}
                  <a href={i.url} rel="noopener noreferrer" target="_blank">Source ↗</a>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="muted" style={{ marginTop: 14, fontSize: 14 }}>
          Short summaries from official vendor pages. Details can change, so check the source before you rely on one.
        </p>
      </div>
    </section>
  );
}
