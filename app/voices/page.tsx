import type { Metadata } from "next";
import voices from "@/content/voices.json";
import notes from "@/content/exec-notes.json";
import { formatDate } from "@/lib/content";

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
        <section className="sim" style={{ marginBottom: 24 }} aria-labelledby="news-h">
          <p className="eyebrow">In the news · checked {formatDate(notes.checkedOn)}</p>
          <h2 id="news-h">Recent executive statements, as reported</h2>
          {notes.items.length === 0 ? (
            <p className="muted">Nothing verified this week.</p>
          ) : (
            <ul className="feed">
              {notes.items.map((n) => (
                <li key={n.headline + n.date}>
                  <time dateTime={n.date}>{formatDate(n.date)} · {n.person}, {n.org}</time>
                  <h3>{n.headline}</h3>
                  <p>{n.summary}</p>
                  <p className="feed-links">
                    <a href={n.url} rel="noopener noreferrer" target="_blank">{n.source} ↗</a>
                    {n.secondary && <span className="flag">Secondary source</span>}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <p className="muted" style={{ fontSize: 14, marginTop: 12 }}>
            These come from press coverage, not the executives&apos; own pages, so treat them as signals and check the original.
          </p>
        </section>

        <p className="muted">
          Posts on X can&apos;t be read automatically, so entries are added by hand after we have checked the original.
          Treat anything here as an early signal, not an official announcement.
        </p>
      </div>
    </>
  );
}
