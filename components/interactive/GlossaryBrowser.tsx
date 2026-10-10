"use client";
import { useMemo, useState } from "react";

export function GlossaryBrowser({ terms }: { terms: { term: string; def: string }[] }) {
  const [q, setQ] = useState("");
  const sorted = useMemo(() => [...terms].sort((a, b) => a.term.localeCompare(b.term)), [terms]);
  const list = sorted.filter((t) => !q.trim() || (t.term + " " + t.def).toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div>
      <div className="field" style={{ maxWidth: 520, marginBottom: 14 }}>
        <label htmlFor="g-q">Search terms</label>
        <input id="g-q" type="search" value={q} placeholder="Try “token” or “agent”" onChange={(e) => setQ(e.target.value)} />
      </div>
      <p className="muted" role="status" aria-live="polite">{list.length} of {terms.length} terms</p>
      <dl className="gloss">
        {list.map((t) => (
          <div key={t.term} className="gloss-item">
            <dt id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>{t.term}</dt>
            <dd>{t.def}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
