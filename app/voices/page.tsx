import type { Metadata } from "next";
import voices from "@/content/voices.json";

export const metadata: Metadata = {
  title: "Voices to follow",
  description: "People whose public posts and interviews give early signals about Claude, ChatGPT and Codex, with our own summaries and source links.",
  alternates: { canonical: "/voices" },
};

export default function Voices() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Signals before the release notes</p>
          <h1>Voices to follow</h1>
          <p className="lede">
            People building ChatGPT, Codex and Claude often share early context in public. We link the
            original source and add a short plain-English summary. We do not reproduce their posts.
          </p>
        </div>
      </section>
      <div className="wrap" style={{ paddingBottom: 56 }}>
        {voices.people.map((p) => (
          <section key={p.handle} className="sim" style={{ marginBottom: 24 }}>
            <p className="eyebrow">@{p.handle}</p>
            <h2>{p.name}</h2>
            <p className="muted">{p.role}</p>
            <p>{p.why}</p>
            <p>
              <a className="btn btn-sm" href={p.profile} rel="noopener noreferrer" target="_blank">Follow on X ↗</a>
            </p>
            <h3 style={{ margin: "22px 0 12px" }}>Sources and summaries</h3>
            <div className="cards">
              {p.entries.map((e) => (
                <a key={e.url} href={e.url} className="card" rel="noopener noreferrer" target="_blank">
                  <span className="tag">{e.kind}{e.date ? ` · ${e.date}` : ""}</span>
                  <h3>{e.title}</h3>
                  <p>{e.summary}</p>
                  <span className="more">Open original ↗</span>
                </a>
              ))}
            </div>
          </section>
        ))}
        <p className="muted">
          Posts on X can&apos;t be read automatically, so entries are added by hand after we have checked the original.
          Treat anything here as an early signal, not an official announcement.
        </p>
      </div>
    </>
  );
}
