"use client";
import { useState } from "react";

const pct = (n: number, d: number) => (d > 0 ? ((n / d) * 100).toFixed(1) + "%" : "–");

export function ResultsCalculator() {
  const [v, setV] = useState({ sent: 50, replies: 5, positive: 2, meetings: 1, optouts: 0 });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setV((s) => ({ ...s, [k]: Math.max(0, Number(e.target.value) || 0) }));
  const small = v.sent < 100;
  const bad = v.replies > v.sent || v.positive > v.replies || v.meetings > v.replies;

  const F = ({ k, label }: { k: keyof typeof v; label: string }) => (
    <div className="field">
      <label htmlFor={`rc-${k}`}>{label}</label>
      <input id={`rc-${k}`} type="number" min={0} inputMode="numeric" value={v[k]} onChange={set(k)} />
    </div>
  );

  return (
    <section className="sim" aria-labelledby="rc-h">
      <p className="eyebrow">Log your test</p>
      <h2 id="rc-h">Turn counts into rates, honestly</h2>
      <div className="two" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))" }}>
        <F k="sent" label="Messages sent" />
        <F k="replies" label="Replies" />
        <F k="positive" label="Positive replies" />
        <F k="meetings" label="Meetings booked" />
        <F k="optouts" label="Opt-outs / complaints" />
      </div>
      <ul className="stats" style={{ marginTop: 18 }} aria-live="polite">
        <li><b>{pct(v.replies, v.sent)}</b><span>reply rate</span></li>
        <li><b>{pct(v.positive, v.sent)}</b><span>positive reply rate</span></li>
        <li><b>{pct(v.meetings, v.sent)}</b><span>meeting rate</span></li>
        <li><b>{pct(v.optouts, v.sent)}</b><span>opt-out rate</span></li>
      </ul>
      {bad && <p className="sim-out">Check your numbers: replies cannot exceed messages sent, and positive replies cannot exceed replies.</p>}
      <p className="sim-out">
        {small
          ? `Only ${v.sent} messages: treat this as a signal, not proof. With samples this small, one reply moves the rate by ${v.sent > 0 ? (100 / v.sent).toFixed(1) : "–"} points. Repeat the test before drawing conclusions.`
          : "A larger sample. Still compare against a control (your usual message) sent to a similar list, in the same period."}
      </p>
    </section>
  );
}
