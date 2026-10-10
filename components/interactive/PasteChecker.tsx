"use client";
import { useState } from "react";

type Level = "ok" | "care" | "no";
const ITEMS: { label: string; level: Level; why: string; instead: string }[] = [
  { label: "Public marketing copy or published articles", level: "ok", why: "Already public, low risk.", instead: "Still check the output for accuracy." },
  { label: "My own notes or draft with no personal data", level: "ok", why: "Low risk if nothing identifies anyone.", instead: "Remove names and numbers you do not need." },
  { label: "Internal documents (not confidential)", level: "care", why: "Allowed or not depends on your employer's policy and account type.", instead: "Check your company's AI policy and use an approved account." },
  { label: "Customer names, emails or phone numbers", level: "care", why: "Personal data. Rules and contracts may restrict sharing it.", instead: "Anonymise: replace names with 'Customer A'." },
  { label: "Source code", level: "care", why: "May be proprietary or contain secrets.", instead: "Share only what you are permitted to, with keys and secrets removed." },
  { label: "Passwords, API keys or access tokens", level: "no", why: "Never needed and a serious security risk if exposed.", instead: "Describe the problem without the secret. Rotate any key you pasted." },
  { label: "Health, medical or legal case details about a person", level: "no", why: "Highly sensitive personal data with strict rules.", instead: "Use fictional or fully anonymised examples." },
  { label: "Financial account numbers, ID numbers or card details", level: "no", why: "High risk of fraud and identity theft.", instead: "Use dummy values for any example." },
  { label: "Contracts or documents under NDA", level: "no", why: "You may be breaching your confidentiality obligations.", instead: "Ask your legal team about approved tools." },
  { label: "Information about children or students", level: "no", why: "Special protections often apply.", instead: "Use anonymised or fictional examples." },
];
const LABEL: Record<Level, string> = { ok: "Generally fine", care: "Be careful", no: "Don't paste it" };

export function PasteChecker() {
  const [i, setI] = useState(0);
  const it = ITEMS[i];
  return (
    <section className="sim" aria-labelledby="pc-h">
      <p className="eyebrow">Can I paste this?</p>
      <h2 id="pc-h">Check before you paste</h2>
      <div className="field">
        <label htmlFor="pc-sel">What are you thinking of pasting?</label>
        <select id="pc-sel" value={i} onChange={(e) => setI(Number(e.target.value))}>
          {ITEMS.map((x, k) => <option key={x.label} value={k}>{x.label}</option>)}
        </select>
      </div>
      <div className={`light light-${it.level}`} role="status" aria-live="polite">
        <span className="light-dot" aria-hidden="true" />
        <div>
          <b>{LABEL[it.level]}</b>
          <p>{it.why}</p>
          <p><b>Instead:</b> {it.instead}</p>
        </div>
      </div>
      <p className="muted" style={{ fontSize: 14, marginTop: 12 }}>General guidance only. Your employer, school or country may have stricter rules, so check them.</p>
    </section>
  );
}
