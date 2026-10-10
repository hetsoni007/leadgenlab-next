"use client";
import { useMemo, useState } from "react";

type Field = { raw: string; key: string; label: string; multiline: boolean; hint: string; def: string };

/** Turn a [bracket] placeholder into a plain-English question. */
function toField(raw: string): Field {
  const inner = raw.trim();
  const paste = /^paste\b/i.test(inner);
  const numericDefault = /^\d/.test(inner) && inner.length <= 18;
  let label: string;
  if (paste) {
    const what = inner.replace(/^paste\s*/i, "").replace(/^(the|a|an|your)\s+/i, "");
    label = what ? `Paste ${what}` : "Paste the text";
  } else if (inner.endsWith("?")) {
    label = inner.charAt(0).toUpperCase() + inner.slice(1);
  } else if (numericDefault) {
    label = `How many / how long? (suggested: ${inner})`;
  } else {
    label = `What is the ${inner}?`;
  }
  return {
    raw: `[${raw}]`, key: inner.toLowerCase(), label,
    multiline: paste || inner.length > 48,
    hint: paste ? "Only paste text you are allowed to share. Remove names and secrets." : "Short is fine. You can skip and fill it in later.",
    def: numericDefault ? inner : "",
  };
}

function parse(prompt: string): Field[] {
  const seen = new Set<string>();
  const out: Field[] = [];
  for (const m of prompt.matchAll(/\[([^\]]+)\]/g)) {
    const f = toField(m[1]);
    if (!seen.has(f.key)) { seen.add(f.key); out.push(f); }
  }
  return out;
}

export function GuidedPrompt({ prompt, title, onClose }: { prompt: string; title?: string; onClose?: () => void }) {
  const fields = useMemo(() => parse(prompt), [prompt]);
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.key, f.def])));
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);

  const filled = fields.filter((f) => values[f.key]?.trim()).length;
  const final = useMemo(
    () => prompt.replace(/\[([^\]]+)\]/g, (m, inner: string) => values[inner.trim().toLowerCase()]?.trim() || m),
    [prompt, values],
  );
  const preview = useMemo(() => {
    const parts: { t: string; filled: boolean; open: boolean }[] = [];
    let last = 0;
    for (const m of prompt.matchAll(/\[([^\]]+)\]/g)) {
      const idx = m.index ?? 0;
      if (idx > last) parts.push({ t: prompt.slice(last, idx), filled: false, open: false });
      const v = values[m[1].trim().toLowerCase()]?.trim();
      parts.push({ t: v || m[0], filled: !!v, open: !v });
      last = idx + m[0].length;
    }
    if (last < prompt.length) parts.push({ t: prompt.slice(last), filled: false, open: false });
    return parts;
  }, [prompt, values]);

  if (fields.length === 0) {
    return <p className="muted">This prompt has nothing to fill in. Copy it and run it as it is.</p>;
  }

  const f = fields[Math.min(i, fields.length - 1)];
  const done = i >= fields.length;
  const set = (v: string) => setValues((s) => ({ ...s, [f.key]: v }));

  async function copy() {
    try { await navigator.clipboard.writeText(final); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }

  return (
    <div className="guided" role="region" aria-label={`Guided prompt builder${title ? `: ${title}` : ""}`}>
      <div className="guided-head">
        <b>Guided builder</b>
        <span className="muted" aria-live="polite">{done ? "All questions answered" : `Question ${i + 1} of ${fields.length}`} · {filled} filled</span>
        {onClose && <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>}
      </div>
      <div className="quiz-progress" style={{ position: "static", margin: "10px 0 14px" }}>
        <div style={{ width: `${(Math.min(i, fields.length) / fields.length) * 100}%` }} />
      </div>

      {!done ? (
        <div className="guided-q">
          <div className="field">
            <label htmlFor="gp-in">{f.label}</label>
            {f.multiline ? (
              <textarea id="gp-in" value={values[f.key]} rows={6} onChange={(e) => set(e.target.value)} autoFocus />
            ) : (
              <input id="gp-in" value={values[f.key]} onChange={(e) => set(e.target.value)} autoFocus
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); setI((x) => x + 1); } }} />
            )}
            <small className="muted">{f.hint}</small>
          </div>
          <div className="actions" style={{ marginTop: 10 }}>
            <button type="button" className="btn btn-ghost btn-sm" disabled={i === 0} onClick={() => setI((x) => Math.max(0, x - 1))}>← Back</button>
            <button type="button" className="btn btn-sm" onClick={() => setI((x) => x + 1)}>{i === fields.length - 1 ? "Finish" : "Next →"}</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => { set(""); setI((x) => x + 1); }}>Skip</button>
          </div>
        </div>
      ) : (
        <div className="guided-done">
          <p><b>Your prompt is ready.</b> {filled < fields.length ? `${fields.length - filled} bracket(s) left open. You can fill them in your chat, or go back.` : "Everything is filled in."}</p>
          <div className="actions">
            <button type="button" className="btn btn-sm" onClick={copy}>{copied ? "Copied ✓" : "Copy final prompt"}</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setI(0)}>Edit answers</button>
            <a className="btn btn-ghost btn-sm" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Open ChatGPT ↗</a>
            <a className="btn btn-ghost btn-sm" href="https://claude.ai/" target="_blank" rel="noopener noreferrer">Open Claude ↗</a>
          </div>
          <p className="muted" style={{ fontSize: 14 }}>Copy first, then paste into your chat. We never put your text in a link.</p>
        </div>
      )}

      <p className="guided-label">Live preview</p>
      <pre className="prompt-text" aria-live="off">
        {preview.map((p, k) => (
          p.filled ? <mark key={k} className="mk-filled">{p.t}</mark> : p.open ? <mark key={k}>{p.t}</mark> : <span key={k}>{p.t}</span>
        ))}
      </pre>
      {fields.some((x) => !values[x.key]?.trim()) && !done && <p className="muted" style={{ fontSize: 14 }}>Highlighted brackets are still empty.</p>}
    </div>
  );
}

/** Copy button plus a toggle that opens the guided builder inline. */
export function PromptActions({ prompt, title }: { prompt: string; title?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasFields = /\[[^\]]+\]/.test(prompt);
  return (
    <div className="prompt-actions">
      <div className="pcard-actions">
        {hasFields && (
          <button type="button" className="btn btn-sm" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? "Hide guided builder" : "Fill it in for me"}
          </button>
        )}
        <button
          type="button" className={hasFields ? "btn btn-ghost btn-sm" : "btn btn-sm"}
          onClick={async () => { try { await navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} }}
        >
          {copied ? "Copied ✓" : "Copy as is"}
        </button>
      </div>
      {open && <GuidedPrompt prompt={prompt} title={title} onClose={() => setOpen(false)} />}
    </div>
  );
}
