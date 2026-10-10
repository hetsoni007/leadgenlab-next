"use client";
import { useEffect, useRef, useState } from "react";

const EMAIL = "het.soni@soniconsultancyservices.com";

export function ContactForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get("message");
    if (m && msgRef.current) msgRef.current.value = m;
  }, []);

  function mailto(data: Record<string, string>) {
    const body = Object.entries(data)
      .filter(([k, v]) => v && !k.startsWith("_"))
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("LeadGenLab: " + (data.type || "enquiry"))}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with the details filled in. Send it from there.");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (data._gotcha) return;
    if (!endpoint) return mailto(data);
    setBusy(true);
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error("failed");
      (e.target as HTMLFormElement).reset();
      setStatus("Thanks. Your enquiry was sent and you will get a reply by email.");
    } catch {
      setStatus("Sending failed. Opening your email app instead.");
      mailto(data);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="two">
        <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div className="two">
        <div className="field">
          <label htmlFor="type">What do you need?</label>
          <select id="type" name="type">
            <option>AI workflow audit request</option>
            <option>AI integration</option>
            <option>App or software idea</option>
            <option>Editorial question</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="timeline">When do you want to start?</label>
          <select id="timeline" name="timeline">
            <option>Exploring options</option>
            <option>Within 1–3 months</option>
            <option>Within 3–6 months</option>
            <option>Ready to start</option>
          </select>
        </div>
      </div>
      <div className="field"><label htmlFor="team">Team and tools (optional)</label><input id="team" name="team" placeholder="e.g. 8-person sales team, HubSpot, Gmail" /></div>
      <div className="field"><label htmlFor="message">What would you like to improve?</label><textarea ref={msgRef} id="message" name="message" placeholder="One repeated task or bottleneck is plenty." /></div>
      <input className="hp" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div><button className="btn" type="submit" disabled={busy}>{busy ? "Sending…" : "Send enquiry"}</button></div>
      <p className="status" role="status">{status}</p>
    </form>
  );
}
