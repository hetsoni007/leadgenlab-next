import Link from "next/link";
import daily from "@/content/daily.json";
import { formatDate } from "@/lib/content";

type Item = (typeof daily.items)[number] & { ours?: string; unconfirmed?: boolean };

function Column({ tool, items }: { tool: string; items: Item[] }) {
  return (
    <div className="panel">
      <div className="panel-head"><span className="live">{tool}</span><span>{items.length} recent</span></div>
      <ul className="feed">
        {items.map((i) => (
          <li key={i.title + i.date}>
            <time dateTime={i.date}>{formatDate(i.date)}</time>
            <h3>{i.title}</h3>
            <p>{i.summary}</p>
            <p className="feed-links">
              {i.ours && <Link href={i.ours}>Read our explainer →</Link>}
              <a href={i.url} rel="noopener noreferrer" target="_blank">{i.source} ↗</a>
              {i.unconfirmed && <span className="flag">Confirm at source</span>}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DailyFeed() {
  const items = daily.items as Item[];
  const by = (t: string) => items.filter((i) => i.tool === t).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  return (
    <section className="section" aria-labelledby="daily-h">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Checked daily</p>
            <h2 id="daily-h">Today&apos;s Claude and ChatGPT updates</h2>
          </div>
          <span className="muted">Last checked {formatDate(daily.checkedOn)}</span>
        </div>
        <div className="feed-grid">
          <Column tool="Claude" items={by("Claude")} />
          <Column tool="ChatGPT" items={by("ChatGPT")} />
        </div>
        <p className="muted" style={{ marginTop: 14, fontSize: 14 }}>
          Summaries are short and sourced from official vendor pages. Details can change, so check the source before you rely on one.
        </p>
      </div>
    </section>
  );
}
