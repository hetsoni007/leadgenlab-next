import type { Metadata } from "next";
import Link from "next/link";
import { PasteChecker } from "@/components/interactive/PasteChecker";

export const metadata: Metadata = {
  title: "Safe AI use: privacy and accuracy guide",
  description: "What not to paste into ChatGPT or Claude, how to check answers, and a simple routine for using AI assistants safely at work and school.",
  alternates: { canonical: "/safety" },
};

const ROUTINE = [
  ["Decide what is safe to share", "Use the checker above. When in doubt, anonymise or leave it out."],
  ["Use the right account", "Work data belongs in an approved work account, not a personal one."],
  ["Check privacy settings", "Look at data controls, history and training settings in your account, and the provider's privacy centre."],
  ["Verify before you rely", "Check names, numbers, dates and quotes against a primary source."],
  ["Keep a person in charge", "For decisions that affect people, money or safety, a human approves."],
  ["Be open about AI use", "Follow your school or employer's rules and disclose where required."],
];

export default function Safety() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Safety, privacy and accuracy</p>
          <h1>Use ChatGPT and Claude without regret</h1>
          <p className="lede">Most AI mistakes come from two habits: pasting what you should not, and trusting answers you did not check. Fix those two and you avoid most problems.</p>
        </div>
      </section>
      <div className="wrap sim-stack">
        <PasteChecker />
        <section className="sim">
          <p className="eyebrow">A routine you can follow</p>
          <h2>Six habits</h2>
          <ol className="steps" style={{ marginTop: 16 }}>
            {ROUTINE.map(([t, d]) => (<li key={t}><h3>{t}</h3><p>{d}</p></li>))}
          </ol>
        </section>
        <section className="sim">
          <p className="eyebrow">Accuracy</p>
          <h2>Why answers can be wrong, and how to catch it</h2>
          <ul className="next">
            <li><b>Invented details:</b> specific statistics, studies and quotes with no source are the most common problem.</li>
            <li><b>Out-of-date information:</b> the answer may not reflect recent changes.</li>
            <li><b>Confident tone:</b> fluent writing is not evidence of accuracy.</li>
          </ul>
          <div className="actions">
            <Link className="btn btn-sm" href="/learn#spot">Practise spotting errors</Link>
            <Link className="btn btn-ghost btn-sm" href="/prompts">Prompts with checks built in</Link>
          </div>
        </section>
      </div>
    </>
  );
}
