"use client";
import { useState } from "react";
import { OFFICIAL } from "@/lib/official";

export function PlanChooser() {
  const [use, setUse] = useState("weekly");
  const [who, setWho] = useState("me");
  const [need, setNeed] = useState<string[]>([]);
  const [shown, setShown] = useState(false);
  const toggle = (k: string) => { setShown(false); setNeed((n) => (n.includes(k) ? n.filter((x) => x !== k) : [...n, k])); };

  const NEEDS: Record<string, string> = {
    docs: "Long documents and file uploads",
    media: "Images, voice or other media",
    code: "Coding help",
    admin: "Admin controls, sharing and privacy settings for a team",
    heavy: "High volume without hitting limits",
  };
  const level = who === "team" || need.includes("admin") ? "team" : use === "daily" || need.includes("heavy") ? "paid" : "free";

  const steps: Record<string, string[]> = {
    free: ["Start on the free plan of both tools.", "Keep a note each time you hit a limit or miss a feature.", "Upgrade only if the same blocker appears twice in a week."],
    paid: ["Run both on a free plan with your real tasks for a week.", "List the specific limits or features that blocked you.", "Compare the paid plan of the tool that blocked you least, and check what it removes.", "Cancel if usage drops after a month."],
    team: ["Check business or team plans, not personal ones, for work data.", "Compare admin controls, data-use and retention terms, and who can see shared items.", "Run a 2-week pilot with 3 to 5 people and measure time saved.", "Involve whoever owns security or compliance before rollout."],
  };

  return (
    <section className="sim" aria-labelledby="pch-h">
      <p className="eyebrow">Plan chooser</p>
      <h2 id="pch-h">What should I look for in a plan?</h2>
      <form className="sim-form" onSubmit={(e) => { e.preventDefault(); setShown(true); }} style={{ gridTemplateColumns: "1fr 1fr auto" }}>
        <div className="field"><label htmlFor="pch-use">How often will you use it?</label>
          <select id="pch-use" value={use} onChange={(e) => { setUse(e.target.value); setShown(false); }}>
            <option value="weekly">A few times a week</option><option value="daily">Most days</option><option value="rare">Occasionally</option>
          </select></div>
        <div className="field"><label htmlFor="pch-who">Who is it for?</label>
          <select id="pch-who" value={who} onChange={(e) => { setWho(e.target.value); setShown(false); }}>
            <option value="me">Just me</option><option value="team">A team or business</option>
          </select></div>
        <button className="btn" type="submit">Show my approach</button>
      </form>
      <fieldset className="q" style={{ marginTop: 16 }}>
        <legend>What do you need? (optional)</legend>
        <div className="opts">
          {Object.entries(NEEDS).map(([k, v]) => (
            <label key={k} className={need.includes(k) ? "on" : undefined}>
              <input type="checkbox" checked={need.includes(k)} onChange={() => toggle(k)} />{v}
            </label>
          ))}
        </div>
      </fieldset>
      {shown && (
        <div className="finder-out" role="status" aria-live="polite">
          <h3>{level === "free" ? "Start free" : level === "paid" ? "A paid personal plan may be worth testing" : "Look at team or business plans"}</h3>
          <ol className="next">{steps[level].map((s) => <li key={s}>{s}</li>)}</ol>
          <p className="muted">Prices, limits and plan names change, and we don&apos;t list them here. Confirm on the official pages:</p>
          <div className="actions">
            {OFFICIAL.filter((o) => /pricing/i.test(o.label) || /Help|privacy/i.test(o.label)).map((o) => (
              <a key={o.href} className="btn btn-ghost btn-sm" href={o.href} rel="noopener noreferrer" target="_blank">{o.label} ↗</a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
