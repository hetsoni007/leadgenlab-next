"use client";
import { useState } from "react";

const EMAIL = "het.soni@soniconsultancyservices.com";

export function NewsletterForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (data._gotcha) return;
    const mail = () => {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Subscribe: weekly AI reset")}&body=${encodeURIComponent("Please add me: " + data.email)}`;
      setStatus("Your email app should open. Send the message to subscribe.");
    };
    if (!endpoint) return mail();
    setBusy(true);
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ ...data, type: "Newsletter signup" }) });
      if (!r.ok) throw new Error();
      (e.target as HTMLFormElement).reset();
      setStatus("Thanks. You are on the list.");
    } catch { setStatus("That did not go through. Opening your email app instead."); mail(); }
    finally { setBusy(false); }
  }
  return (
    <form className="form" onSubmit={onSubmit} style={{ maxWidth: 520 }}>
      <div className="field"><label htmlFor="nl-email">Email address</label><input id="nl-email" name="email" type="email" required autoComplete="email" /></div>
      <input className="hp" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div><button className="btn" type="submit" disabled={busy}>{busy ? "Sending…" : "Subscribe"}</button></div>
      <p className="status" role="status">{status}</p>
    </form>
  );
}
