"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PromptActions } from "@/components/interactive/GuidedPrompt";

export type PromptItem = { id: string; cat: string; title: string; role: string; prompt: string; check: string; tip: string };

function Highlight({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) => (p.startsWith("[") ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>))}
    </>
  );
}

export function PromptLibrary({ items, cats }: { items: PromptItem[]; cats: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const list = useMemo(() => items.filter((p) =>
    (cat === "All" || p.cat === cat) &&
    (!q.trim() || (p.title + " " + p.prompt + " " + p.role).toLowerCase().includes(q.trim().toLowerCase()))), [items, q, cat]);

  return (
    <div>
      <div className="browser-controls">
        <div className="field">
          <label htmlFor="pl-q">Search prompts</label>
          <input id="pl-q" type="search" value={q} placeholder="Try “email”, “summary” or “quiz”" onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="field">
          <span className="label">Category</span>
          <div className="seg" role="group" aria-label="Category">
            {["All", ...cats].map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
      </div>
      <p className="muted" role="status" aria-live="polite">{list.length} of {items.length} prompts</p>
      <div className="pcards">
        {list.map((p) => (
          <article key={p.id} className="pcard">
            <div className="pcard-top"><span className="tag">{p.cat}</span><span className="role">{p.role}</span></div>
            <h3>{p.title}</h3>
            <pre className="prompt-text"><Highlight text={p.prompt} /></pre>
            <p className="check"><b>Check before you use it:</b> {p.check}</p>
            {p.tip && <p className="muted tip">{p.tip}</p>}
            <PromptActions prompt={p.prompt} title={p.title} />
            <div className="pcard-actions">
              <Link className="btn btn-ghost btn-sm" href="/learn#prompt-lab">Score it in the lab</Link>
            </div>
          </article>
        ))}
        {list.length === 0 && <p className="card">No prompts match. Try another word or category.</p>}
      </div>
    </div>
  );
}
