"use client";
import Link from "next/link";
import { useState } from "react";

const TASKS: Record<string, { label: string; test: string }> = {
  write: { label: "Writing and editing", test: "Give each assistant the same rough draft and ask for a tighter version in your voice." },
  research: { label: "Research and summaries", test: "Ask the same question with a source document and check every claim against it." },
  analyse: { label: "Data and analysis", test: "Use a small non-sensitive spreadsheet and ask for the same three findings." },
  code: { label: "Coding", test: "Give each one the same small bug and compare the fix and the explanation." },
  meetings: { label: "Meetings and follow-ups", test: "Use a fictional transcript and compare action items and owners." },
};
const DATA: Record<string, string> = {
  public: "Public information only: safe for a wide first comparison.",
  internal: "Internal but not confidential: check data-use and retention settings on each provider before pasting real material.",
  confidential: "Confidential or personal data: do not paste it into a consumer tool. Check business or enterprise terms, or use anonymised samples.",
};
const PRIORITY: Record<string, string> = {
  quality: "Weigh answer quality and how much you must correct.",
  speed: "Weigh response speed and how it fits your daily tools.",
  cost: "Weigh the plan limits and the real price after any trial.",
};

export function AssistantFinder() {
  const [task, setTask] = useState("write");
  const [data, setData] = useState("public");
  const [prio, setPrio] = useState("quality");
  const [shown, setShown] = useState(false);

  return (
    <section className="sim" aria-labelledby="af-h">
      <p className="eyebrow">Assistant finder</p>
      <h2 id="af-h">Start with your need, not a brand</h2>
      <form className="sim-form" onSubmit={(e) => { e.preventDefault(); setShown(true); }}>
        <div className="field"><label htmlFor="af-task">Main task</label>
          <select id="af-task" value={task} onChange={(e) => { setTask(e.target.value); setShown(false); }}>
            {Object.entries(TASKS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select></div>
        <div className="field"><label htmlFor="af-data">Information you will share</label>
          <select id="af-data" value={data} onChange={(e) => { setData(e.target.value); setShown(false); }}>
            <option value="public">Public</option><option value="internal">Internal</option><option value="confidential">Confidential / personal</option>
          </select></div>
        <div className="field"><label htmlFor="af-prio">What matters most</label>
          <select id="af-prio" value={prio} onChange={(e) => { setPrio(e.target.value); setShown(false); }}>
            <option value="quality">Quality</option><option value="speed">Speed</option><option value="cost">Cost</option>
          </select></div>
        <button className="btn" type="submit">Build my test plan</button>
      </form>
      {shown && (
        <div className="finder-out" role="status" aria-live="polite">
          <h3>Your test plan</h3>
          <ol className="next">
            <li><b>Shortlist two or three assistants</b> that you can access, for example Claude and ChatGPT.</li>
            <li><b>Run the same task.</b> {TASKS[task].test}</li>
            <li><b>Data check.</b> {DATA[data]}</li>
            <li><b>Judge fairly.</b> {PRIORITY[prio]}</li>
            <li><b>Decide</b> after two or three real tasks, not one demo.</li>
          </ol>
          <p className="muted">This is a method, not a ranking. LeadGenLab does not rank products by who pays.</p>
          <Link className="btn btn-ghost" href="/tools/choosing-ai-assistant">Read the full criteria guide</Link>
        </div>
      )}
    </section>
  );
}
