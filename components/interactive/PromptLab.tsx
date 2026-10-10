"use client";
import { useMemo, useState } from "react";

const CHECKS = [
  { key: "role", label: "Who it is for or who it should act as", tip: "Add an audience or role: “for a busy manager” or “act as an editor”.", re: /\b(act as|you are|as an?|for (a|an|my|the|our)|audience|reader|customer|manager|beginner|student)\b/i },
  { key: "task", label: "A clear action", tip: "Start with a verb: summarise, draft, compare, explain, list, plan, review.", re: /\b(write|summari[sz]e|draft|compare|explain|list|plan|review|analy[sz]e|translate|create|outline|rewrite|improve|brainstorm|suggest)\b/i },
  { key: "context", label: "Enough background", tip: "Add the situation, goal or source material the answer should use.", test: (s: string) => s.trim().split(/\s+/).length >= 18 || /\b(because|goal|context|background|based on|so that)\b/i.test(s) },
  { key: "format", label: "The format you want back", tip: "Say how it should look: 5 bullets, a table, an email, under 150 words.", re: /\b(bullets?|table|steps?|words?|paragraphs?|outline|email|checklist|json|summary|headings?|sentences?)\b/i },
  { key: "limits", label: "Limits or things to avoid", tip: "Add constraints: tone, length, what to avoid, what not to assume.", re: /\b(don'?t|do not|avoid|only|must|limit|under|at most|no more than|tone|plain english|without)\b/i },
  { key: "example", label: "An example (optional but powerful)", tip: "Paste one short example of the style or format you want.", re: /\b(example|for instance|e\.g\.|like this|such as|sample)\b/i },
];

const PRESETS = [
  { label: "Weak", text: "Write about marketing" },
  { label: "Better", text: "Write a short email to a customer about a delayed order." },
  { label: "Strong", text: "Act as a customer support lead. Draft a friendly email, under 120 words, telling a customer their order is delayed by three days. Context: it is their first order and they asked about the delay yesterday. Use plain English, avoid blaming the courier, and end with one clear next step. Example tone: “Thanks for your patience, here is what happens next.”" },
];

export function PromptLab() {
  const [text, setText] = useState(PRESETS[0].text);
  const res = useMemo(() => CHECKS.map((c) => ({ ...c, ok: "test" in c && c.test ? c.test(text) : c.re!.test(text) })), [text]);
  const score = res.filter((r) => r.ok).length;
  const missing = res.filter((r) => !r.ok);
  const level = score >= 5 ? "Strong" : score >= 3 ? "Getting there" : "Too thin";
  const scaffold = [
    "Role/audience: " + (res[0].ok ? "(keep yours)" : "[who is this for?]"),
    "Task: " + text.trim().replace(/\s+/g, " "),
    res[2].ok ? "" : "Context: [the situation, goal and any source material]",
    res[3].ok ? "" : "Format: [e.g. 5 bullets, under 150 words]",
    res[4].ok ? "" : "Limits: [tone, length, what to avoid]",
    res[5].ok ? "" : "Example: [paste a short example of what good looks like]",
  ].filter(Boolean).join("\n");

  return (
    <section className="sim" id="prompt-lab" aria-labelledby="pl-h">
      <p className="eyebrow">Practice lab</p>
      <h2 id="pl-h">Score your prompt before you send it</h2>
      <div className="seg" role="group" aria-label="Example prompts" style={{ marginBottom: 14 }}>
        {PRESETS.map((p) => (
          <button key={p.label} type="button" aria-pressed={text === p.text} onClick={() => setText(p.text)}>{p.label} example</button>
        ))}
      </div>
      <div className="field">
        <label htmlFor="pl-text">Your prompt</label>
        <textarea id="pl-text" value={text} onChange={(e) => setText(e.target.value)} rows={5} />
      </div>
      <div className="meter" role="status" aria-live="polite">
        <div className="meter-bar"><div style={{ width: `${(score / CHECKS.length) * 100}%` }} /></div>
        <b>{score}/{CHECKS.length} · {level}</b>
      </div>
      <ul className="checks">
        {res.map((r) => (
          <li key={r.key} className={r.ok ? "ok" : "no"}>
            <span aria-hidden="true">{r.ok ? "✓" : "○"}</span>
            <div><b>{r.label}</b>{!r.ok && <small>{r.tip}</small>}</div>
          </li>
        ))}
      </ul>
      {missing.length > 0 && (
        <div className="finder-out">
          <h3>A scaffold to fill in</h3>
          <pre className="scaffold">{scaffold}</pre>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText(scaffold)}>Copy scaffold</button>
        </div>
      )}
      <p className="muted" style={{ fontSize: 14, marginTop: 14 }}>This is a rule-based checker running in your browser. It does not call an AI service, and your text is not sent anywhere.</p>
    </section>
  );
}
