"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PromptActions } from "@/components/interactive/GuidedPrompt";

export type PromptItem = { id: string; cat: string; title: string; role: string; prompt: string; check: string; tip: string; exampleInput?: string; demoOutput?: string };

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
  const [role, setRole] = useState("All");
  const roles = useMemo(() => Array.from(new Set(items.map((p) => p.role))).sort(), [items]);

  const list = useMemo(() => items.filter((p) =>
    (cat === "All" || p.cat === cat) &&
    (role === "All" || p.role === role) &&
    (!q.trim() || (p.title + " " + p.prompt + " " + p.role + " " + p.cat).toLowerCase().includes(q.trim().toLowerCase()))), [items, q, cat, role]);

  return (
    <div>
      <div className="browser-controls">
        <div className="field">
          <label htmlFor="pl-role">Role</label>
          <select id="pl-role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>All</option>{roles.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
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
            {p.demoOutput && <details className="demo-output">
              <summary>See a sample input and demo output</summary>
              {p.exampleInput && <p><b>Sample input (fictional):</b> {p.exampleInput}</p>}
              <p><b>Demo output (fictional):</b></p>
              <pre className="prompt-text">{p.demoOutput}</pre>
              <p className="muted">Uses made-up sample data. Replace it with approved information and verify the result before use.</p>
            </details>}
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
