"use client";
import Link from "next/link";
import { useState } from "react";

type Q = { cat: string; q: string; opts: string[] };
const QUESTIONS: Q[] = [
  { cat: "Process", q: "How clearly defined are your repeat tasks (lead research, reporting, support replies)?", opts: ["Mostly ad hoc", "Some are written down", "Most have clear steps", "Documented and measured"] },
  { cat: "Process", q: "Do you measure how long key tasks take today?", opts: ["No", "Roughly, in our heads", "For a few tasks", "Yes, tracked regularly"] },
  { cat: "Data", q: "How well do you know which information is safe to put into an AI tool?", opts: ["Not sure", "Informal rules", "A written guideline", "Policy plus access controls"] },
  { cat: "Data", q: "How organised are the documents and records your team relies on?", opts: ["Scattered", "Partly organised", "Mostly organised", "Searchable and well maintained"] },
  { cat: "People", q: "How comfortable is your team using AI assistants today?", opts: ["Rarely used", "A few individuals", "Many people, informally", "Shared habits and prompts"] },
  { cat: "People", q: "Does someone own AI experiments and follow-through?", opts: ["No one", "Whoever has time", "A named person", "A named owner with time and a goal"] },
  { cat: "Governance", q: "Is there a human review step before AI output reaches customers or decisions?", opts: ["No", "Sometimes", "For key outputs", "Always, and documented"] },
  { cat: "Governance", q: "How would you judge whether an AI pilot worked?", opts: ["No plan yet", "A general feeling", "A rough measure", "A baseline and a success metric"] },
];
const CATS = ["Process", "Data", "People", "Governance"];

function tier(pct: number) {
  if (pct < 40) return { name: "Explore", line: "Start small. Pick one repeat task, write down its steps, and try a safe example before changing anything.", steps: ["Document one repeated task end to end", "Set a simple rule for what data is safe to share", "Run a two-week trial on that single task"] };
  if (pct < 70) return { name: "Pilot", line: "You have enough foundations to run a measured pilot on one workflow with a human check.", steps: ["Choose the workflow with the clearest time cost", "Record a baseline for time and quality", "Pilot with a named owner and review step"] };
  return { name: "Scale", line: "You are ready to extend what works. Focus on playbooks, shared prompts and measurement across teams.", steps: ["Standardise the winning prompts and checks", "Add a second workflow with the same review pattern", "Track cost, quality and time monthly"] };
}

export function Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [done, setDone] = useState(false);
  const answered = answers.filter((a) => a !== null).length;

  const byCat = CATS.map((c) => {
    const idx = QUESTIONS.map((q, i) => (q.cat === c ? i : -1)).filter((i) => i >= 0);
    const score = idx.reduce((s, i) => s + (answers[i] ?? 0), 0);
    return { cat: c, pct: Math.round((score / (idx.length * 3)) * 100) };
  });
  const total = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const pct = Math.round((total / (QUESTIONS.length * 3)) * 100);
  const t = tier(pct);
  const weakest = [...byCat].sort((a, b) => a.pct - b.pct)[0];

  if (done) {
    const msg = `AI readiness quiz: ${t.name} (${pct}%). Weakest area: ${weakest.cat}.`;
    return (
      <div className="sim quiz-result" role="status" aria-live="polite">
        <p className="eyebrow">Your result</p>
        <h2>{t.name} stage <span className="grad-text">· {pct}%</span></h2>
        <p className="lede">{t.line}</p>
        <div className="bars" aria-label="Score by area">
          {byCat.map((b) => (
            <div key={b.cat} className="bar">
              <span>{b.cat}</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.max(b.pct, 4)}%` }} /></div>
              <b>{b.pct}%</b>
            </div>
          ))}
        </div>
        <h3 style={{ margin: "26px 0 10px" }}>Suggested next steps</h3>
        <ol className="next">{t.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        <div className="actions" style={{ marginTop: 24 }}>
          <Link className="btn" href={`/contact?message=${encodeURIComponent(msg)}`}>Discuss this with us</Link>
          <button className="btn btn-ghost" type="button" onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setDone(false); }}>Retake</button>
        </div>
        <p className="muted" style={{ marginTop: 16, fontSize: 14 }}>This is a self-assessment for orientation, not an audit. Answers stay in your browser.</p>
      </div>
    );
  }

  return (
    <form className="sim" onSubmit={(e) => { e.preventDefault(); if (answered === QUESTIONS.length) setDone(true); }}>
      <div className="quiz-progress" aria-label={`${answered} of ${QUESTIONS.length} answered`}>
        <div style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} />
      </div>
      {QUESTIONS.map((q, i) => (
        <fieldset key={q.q} className="q">
          <legend><span className="tag">{q.cat}</span>{i + 1}. {q.q}</legend>
          <div className="opts">
            {q.opts.map((o, v) => (
              <label key={o} className={answers[i] === v ? "on" : undefined}>
                <input type="radio" name={`q${i}`} checked={answers[i] === v}
                  onChange={() => setAnswers((a) => a.map((x, j) => (j === i ? v : x)))} />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <button className="btn" type="submit" disabled={answered < QUESTIONS.length}>
        {answered < QUESTIONS.length ? `Answer ${QUESTIONS.length - answered} more` : "See my result"}
      </button>
    </form>
  );
}
