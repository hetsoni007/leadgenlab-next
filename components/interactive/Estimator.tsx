"use client";
import Link from "next/link";
import { useState } from "react";

const TIPS: Record<string, { head: string; body: string; phases: string[] }> = {
  lean: { head: "One core task or user group", body: "A focused first version can centre on one core task. Validate that workflow, then add capabilities from what users actually need.", phases: ["Discovery (days)", "Focused build", "Pilot with real users"] },
  standard: { head: "Several workflows or roles", body: "Map the main user roles and integrations, then choose the smallest release that proves the core value.", phases: ["Discovery and scope", "Core release", "Integrations", "Pilot and iterate"] },
  advanced: { head: "Many integrations or complex needs", body: "Split the idea into phases. Start with product discovery and a technical risk review before committing to a full build.", phases: ["Discovery and risk review", "Architecture", "Phase 1 release", "Phase 2+ by evidence"] },
};

export function Estimator() {
  const [scope, setScope] = useState("mobile app");
  const [level, setLevel] = useState("lean");
  const [shown, setShown] = useState(false);
  const t = TIPS[level];

  return (
    <section className="sim" aria-labelledby="est-h">
      <p className="eyebrow">Planning helper</p>
      <h2 id="est-h">Size up your idea in thirty seconds</h2>
      <form className="sim-form" onSubmit={(e) => { e.preventDefault(); setShown(true); }}>
        <div className="field"><label htmlFor="est-scope">What are you considering?</label>
          <select id="est-scope" value={scope} onChange={(e) => { setScope(e.target.value); setShown(false); }}>
            <option value="mobile app">A mobile app</option><option value="AI feature">An AI feature</option><option value="web platform">A web platform</option>
          </select></div>
        <div className="field"><label htmlFor="est-level">How broad is the first version?</label>
          <select id="est-level" value={level} onChange={(e) => { setLevel(e.target.value); setShown(false); }}>
            <option value="lean">One core task or user group</option><option value="standard">Several workflows or user roles</option><option value="advanced">Many integrations or complex needs</option>
          </select></div>
        <button className="btn" type="submit">Get a planning suggestion</button>
      </form>
      {shown && (
        <div className="finder-out" role="status" aria-live="polite">
          <h3>A useful next step for your {scope}</h3>
          <p>{t.body}</p>
          <ol className="phases">{t.phases.map((p) => <li key={p}>{p}</li>)}</ol>
          <p className="muted">Planning guidance only. This is not a price quote.</p>
          <Link className="btn" href={`/contact?message=${encodeURIComponent(`Planning helper: ${scope}, ${t.head.toLowerCase()}.`)}`}>Discuss your idea</Link>
        </div>
      )}
    </section>
  );
}
