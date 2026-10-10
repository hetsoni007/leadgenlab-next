"use client";
import Link from "next/link";
import { useState } from "react";

type Opt = { label: string; chatgpt: number; claude: number };
type Step = { id: string; q: string; hint: string; opts: Opt[] };

const STEPS: Step[] = [
  { id: "job", q: "What will you mostly use it for?", hint: "Pick the closest match.", opts: [
    { label: "Writing and editing", chatgpt: 1, claude: 2 },
    { label: "Research and summarising documents", chatgpt: 1, claude: 2 },
    { label: "Everyday questions and brainstorming", chatgpt: 2, claude: 1 },
    { label: "Images, voice or mixed media", chatgpt: 3, claude: 0 },
    { label: "Coding or data work", chatgpt: 2, claude: 2 },
  ] },
  { id: "docs", q: "How often will you work with long documents?", hint: "Reports, contracts, transcripts, papers.", opts: [
    { label: "Rarely", chatgpt: 1, claude: 0 },
    { label: "Sometimes", chatgpt: 1, claude: 1 },
    { label: "Most days", chatgpt: 0, claude: 2 },
  ] },
  { id: "tools", q: "Do you want it to connect with other apps and tools?", hint: "For example calendars, files or automations.", opts: [
    { label: "Not needed", chatgpt: 0, claude: 0 },
    { label: "Would be nice", chatgpt: 1, claude: 1 },
    { label: "Very important", chatgpt: 2, claude: 1 },
  ] },
  { id: "data", q: "How sensitive is the information you will use?", hint: "Both need care. This sets the guardrails, not the winner.", opts: [
    { label: "Public information only", chatgpt: 0, claude: 0 },
    { label: "Internal, not confidential", chatgpt: 0, claude: 0 },
    { label: "Confidential or personal", chatgpt: 0, claude: 0 },
  ] },
  { id: "cost", q: "What is your budget right now?", hint: "Plans and limits change; confirm on official pages.", opts: [
    { label: "Free only", chatgpt: 0, claude: 0 },
    { label: "Happy to pay for one plan", chatgpt: 0, claude: 0 },
    { label: "Team or business budget", chatgpt: 0, claude: 0 },
  ] },
];

const DATA_NOTE = [
  "Public information is fine for a first comparison.",
  "Check data-use and retention settings before pasting real material.",
  "Do not paste confidential or personal data into a consumer account. Use anonymised samples, or ask your organisation about approved business accounts.",
];
const COST_NOTE = [
  "Start on each free plan and note exactly which limit you hit.",
  "Pay for one plan only after a real task showed you what was missing.",
  "Compare the business or team plans of both on their official pricing pages, including admin and privacy controls.",
];

export function ToolMatcher() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const done = picked.length === STEPS.length;

  const totals = picked.reduce(
    (t, p, s) => ({ c: t.c + STEPS[s].opts[p].chatgpt, k: t.k + STEPS[s].opts[p].claude }),
    { c: 0, k: 0 },
  );
  const diff = totals.c - totals.k;
  const lead = Math.abs(diff) <= 1 ? "both" : diff > 0 ? "chatgpt" : "claude";
  const first = lead === "chatgpt" ? "ChatGPT" : lead === "claude" ? "Claude" : "either one";
  const second = lead === "chatgpt" ? "Claude" : lead === "claude" ? "ChatGPT" : "the other";

  function choose(o: number) {
    setPicked((p) => [...p.slice(0, i), o]);
    setI((x) => x + 1);
  }
  function back() {
    setI((x) => Math.max(0, x - 1));
    setPicked((p) => p.slice(0, -1));
  }
  function reset() { setI(0); setPicked([]); }

  return (
    <section className="sim" id="matcher" aria-labelledby="tm-h">
      <p className="eyebrow">Tool matcher</p>
      <h2 id="tm-h">Which should you start with?</h2>
      {!done ? (
        <div>
          <div className="quiz-progress" style={{ position: "static" }} aria-label={`Question ${i + 1} of ${STEPS.length}`}>
            <div style={{ width: `${(i / STEPS.length) * 100}%` }} />
          </div>
          <fieldset className="q">
            <legend>{i + 1}. {STEPS[i].q}</legend>
            <p className="muted" style={{ margin: "6px 0 0" }}>{STEPS[i].hint}</p>
            <div className="opts">
              {STEPS[i].opts.map((o, idx) => (
                <button key={o.label} type="button" className="opt-btn" onClick={() => choose(idx)}>{o.label}</button>
              ))}
            </div>
          </fieldset>
          {i > 0 && <button type="button" className="btn btn-ghost btn-sm" onClick={back}>← Back</button>}
        </div>
      ) : (
        <div className="finder-out" role="status" aria-live="polite">
          <h3>Start with {first}{lead === "both" ? "" : `, then test ${second}`}</h3>
          <p>
            {lead === "both"
              ? "Your answers do not clearly favour one. That is normal. Run the same task in both and keep the one you edit less."
              : `Your answers lean toward ${first} as a starting point. It is a tendency, not a verdict: run the same real task in ${second} too before you commit.`}
          </p>
          <h3 style={{ marginTop: 18 }}>Your first 15 minutes</h3>
          <ol className="next">
            <li><b>Pick one real task</b> you can judge yourself: {STEPS[0].opts[picked[0]].label.toLowerCase()}.</li>
            <li><b>Run it in {first}</b>, then in {second}, with the identical prompt.</li>
            <li><b>Compare:</b> accuracy, how much you had to edit, clarity, speed.</li>
            <li><b>Data:</b> {DATA_NOTE[picked[3]]}</li>
            <li><b>Cost:</b> {COST_NOTE[picked[4]]}</li>
          </ol>
          <p className="muted">Features, limits and plans change often. Confirm on the official pages for ChatGPT and Claude before relying on any specific capability.</p>
          <div className="actions">
            <Link className="btn btn-sm" href="/guides/start-with-chatgpt">ChatGPT beginner guide</Link>
            <Link className="btn btn-sm" href="/guides/start-with-claude">Claude beginner guide</Link>
            <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>Start over</button>
          </div>
        </div>
      )}
    </section>
  );
}
