"use client";
import Link from "next/link";
import { useState } from "react";

type Step = { n: string; title: string; text: string; out: string };
const PATHS = {
  a: {
    tab: "No technical background", head: "Understand and use AI with confidence", meta: "4 steps · 30–60 min to try",
    steps: [
      { n: "01", title: "Spot the change", text: "Read the short summary. Identify whether the update changes a model, a feature, or access.", out: "Know what is new" },
      { n: "02", title: "Connect it to a task", text: "Choose one real task you already do. Ask whether this could make it clearer, quicker, or easier.", out: "Pick a useful test" },
      { n: "03", title: "Try a safe example", text: "Use non-sensitive information. Give the tool one small job and make your expectations clear.", out: "See it in action" },
      { n: "04", title: "Check before relying", text: "Compare the result with a source or your own judgment. Keep a person in charge of important decisions.", out: "Decide if it helps" },
    ] as Step[],
    example: "Try a new ChatGPT document feature: start with a non-private sample document, ask for a summary, compare it with the original, and decide whether it saves useful time. Understand your account’s data settings before uploading sensitive work.",
  },
  b: {
    tab: "Developers and technical teams", head: "Evaluate, prototype, and ship responsibly", meta: "5 steps · Scope to rollout",
    steps: [
      { n: "01", title: "Read the release", text: "Confirm model ID, access, limits, safety notes, and migration changes in primary docs.", out: "Change brief" },
      { n: "02", title: "Set a baseline", text: "Choose representative tasks, test cases, and quality criteria before switching models.", out: "Evaluation set" },
      { n: "03", title: "Build a narrow prototype", text: "Use least-privilege tools, sample data, approval for external actions, and clear fallbacks.", out: "Working slice" },
      { n: "04", title: "Measure trade-offs", text: "Compare quality, latency, cost per task, failure modes, and human review effort.", out: "Decision record" },
      { n: "05", title: "Roll out gradually", text: "Stage access, monitor regressions, and keep a rollback route.", out: "Controlled launch" },
    ] as Step[],
    example: "Evaluate a Claude or ChatGPT model update: run the same anonymised cases against the current and candidate model. Compare task success, unsupported claims, tool calls, latency, and full cost. Expand only when the result is better for your use case and safety controls are ready.",
  },
} as const;

export function RoadmapExplorer() {
  const [p, setP] = useState<"a" | "b">("a");
  const [i, setI] = useState(0);
  const path = PATHS[p];
  const step = path.steps[Math.min(i, path.steps.length - 1)];

  return (
    <section className="sim" aria-labelledby="rm-h">
      <p className="eyebrow">One update. Two ways in.</p>
      <h2 id="rm-h">{path.head}</h2>
      <div className="seg" role="tablist" aria-label="Choose a path" style={{ margin: "18px 0" }}>
        {(["a", "b"] as const).map((k) => (
          <button key={k} role="tab" type="button" aria-selected={p === k} aria-pressed={p === k}
            onClick={() => { setP(k); setI(0); }}>
            Path {k.toUpperCase()} · {PATHS[k].tab}
          </button>
        ))}
      </div>
      <p className="muted">{path.meta}. Select a step to see what to do.</p>
      <ol className="route" aria-label="Roadmap steps">
        {path.steps.map((s, idx) => (
          <li key={s.n}>
            <button type="button" aria-pressed={idx === i} onClick={() => setI(idx)}>
              <span>{s.n}</span><b>{s.title}</b><small>Outcome: {s.out}</small>
            </button>
          </li>
        ))}
      </ol>
      <div className="lens-example" role="status" aria-live="polite">
        <small>Step {step.n} · Outcome: {step.out}</small>
        <strong>{step.title}</strong>
        <p>{step.text}</p>
      </div>
      <div className="lens-example">
        <small>Worked example</small>
        <p>{path.example}</p>
      </div>
      <Link className="btn btn-ghost" href="/contact">Talk through your use case</Link>
    </section>
  );
}
