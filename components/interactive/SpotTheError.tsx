"use client";
import { useState } from "react";

const CLAIMS = [
  { t: "A four-day week can reduce unplanned absence for some teams.", bad: false, why: "Hedged and plausible. Still worth a source, but it does not claim more than it can support." },
  { t: "A 2019 Harvard study of 3,412 firms proved a 31% productivity gain.", bad: true, why: "Very specific numbers plus “proved” and no link. Invented-sounding studies and statistics are a classic mistake. Ask for the source and check it exists." },
  { t: "Think about how your clients’ response-time expectations fit a four-day schedule.", bad: false, why: "This is advice to consider, not a factual claim, so there is nothing to verify." },
  { t: "Every company that tried it saw higher profits.", bad: true, why: "Absolute words like “every” and “all” are a warning sign. Real evidence is usually mixed." },
  { t: "Dr. Elena Marquez, author of “The Shortened Week” (2021), says it works for all industries.", bad: true, why: "A named expert and book with a sweeping claim. Check the person and the book exist and that they actually said it." },
];

export function SpotTheError() {
  const [sel, setSel] = useState<boolean[]>(CLAIMS.map(() => false));
  const [done, setDone] = useState(false);
  const right = CLAIMS.filter((c, i) => c.bad === sel[i]).length;

  return (
    <section className="sim" id="spot" aria-labelledby="se-h">
      <p className="eyebrow">Practice lab</p>
      <h2 id="se-h">Spot what you should verify</h2>
      <p className="muted">
        Fictional example. You asked an assistant: “Summarise the benefits of a four-day work week for a 20-person company.” It answered
        with the five statements below. Tick the ones you would <b>not</b> trust without checking.
      </p>
      <ul className="claims">
        {CLAIMS.map((c, i) => {
          const state = done ? (c.bad === sel[i] ? "right" : "wrong") : "";
          return (
            <li key={c.t} className={state}>
              <label>
                <input type="checkbox" checked={sel[i]} disabled={done}
                  onChange={(e) => setSel((s) => s.map((v, j) => (j === i ? e.target.checked : v)))} />
                <span>{c.t}</span>
              </label>
              {done && <p className="why"><b>{c.bad ? "Verify this." : "Fine to keep."}</b> {c.why}</p>}
            </li>
          );
        })}
      </ul>
      {!done ? (
        <button type="button" className="btn" onClick={() => setDone(true)}>Check my answers</button>
      ) : (
        <div role="status" aria-live="polite">
          <p><b>{right} of {CLAIMS.length} judged correctly.</b> Habit to build: check specific numbers, named sources and absolute claims first.</p>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setSel(CLAIMS.map(() => false)); setDone(false); }}>Try again</button>
        </div>
      )}
    </section>
  );
}
