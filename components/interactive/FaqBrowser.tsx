"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FAQS, FAQ_CATS } from "@/lib/faq";

export function FaqBrowser() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const list = useMemo(() => FAQS.filter((f) =>
    (cat === "All" || f.cat === cat) &&
    (!q.trim() || (f.q + " " + f.a).toLowerCase().includes(q.trim().toLowerCase()))), [q, cat]);

  return (
    <section id="faq" aria-labelledby="faq-h">
      <p className="eyebrow">Commonly asked questions</p>
      <h2 id="faq-h" style={{ marginBottom: 18 }}>Quick answers for newcomers</h2>
      <div className="browser-controls">
        <div className="field">
          <label htmlFor="faq-q">Search questions</label>
          <input id="faq-q" type="search" value={q} placeholder="Try “privacy”, “free” or “wrong answer”" onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="field">
          <span className="label">Topic</span>
          <div className="seg" role="group" aria-label="Topic">
            {["All", ...FAQ_CATS].map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
      </div>
      <p className="muted" role="status" aria-live="polite">{list.length} question{list.length === 1 ? "" : "s"}</p>
      <div className="faq">
        {list.map((f) => (
          <details key={f.q}>
            <summary><span>{f.q}</span><em>{f.cat}</em></summary>
            <p>{f.a}</p>
            {f.link && (f.link.href.startsWith("#")
              ? <a className="faq-link" href={f.link.href}>{f.link.label} →</a>
              : <Link className="faq-link" href={f.link.href}>{f.link.label} →</Link>)}
          </details>
        ))}
        {list.length === 0 && <p className="card">No match. Try a shorter word.</p>}
      </div>
    </section>
  );
}
