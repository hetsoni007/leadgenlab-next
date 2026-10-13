"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

export type Item = { path: string; title: string; description: string; date: string | null; dateLabel: string | null; tool: string };

export function UpdateBrowser({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");
  const [tool, setTool] = useState("All");
  const tools = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.tool))).sort()], [items]);
  const shown = items.filter((i) =>
    (tool === "All" || i.tool === tool) &&
    (!q.trim() || (i.title + " " + i.description).toLowerCase().includes(q.trim().toLowerCase())));

  return (
    <div>
      <div className="browser-controls">
        <div className="field">
          <label htmlFor="ub-q">Search updates</label>
          <input id="ub-q" type="search" value={q} placeholder="Try “pricing”, “agents” or “policy”" onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="field">
          <span className="label">Filter by tool</span>
          <div className="seg" role="group" aria-label="Filter by tool">
            {tools.map((t) => (
              <button key={t} type="button" aria-pressed={tool === t} onClick={() => setTool(t)}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      <p className="muted" role="status" aria-live="polite">{shown.length} of {items.length} updates</p>
      <div className="cards" style={{ paddingBottom: 56 }}>
        {shown.map((c) => (
          <Link key={c.path} href={c.path} className="card">
            {c.date && <time dateTime={c.date}>{c.dateLabel}</time>}
            <h3>{c.title}</h3>
            {c.description && <p>{c.description}</p>}
            <span className="more">{c.tool} · Read the explainer →</span>
          </Link>
        ))}
        {shown.length === 0 && <p className="card">No updates match. Try a different word or filter.</p>}
      </div>
    </div>
  );
}
