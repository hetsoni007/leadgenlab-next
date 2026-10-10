import type { ReactNode } from "react";

/** Decorative hero background: soft orbs and rings. Purely visual. */
export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
      <svg className="rings" viewBox="0 0 600 600" fill="none">
        <circle cx="300" cy="300" r="120" stroke="url(#g1)" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="190" stroke="url(#g1)" strokeWidth="1.2" strokeDasharray="4 10" />
        <circle cx="300" cy="300" r="260" stroke="url(#g1)" strokeWidth="1" />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="600" y2="600">
            <stop stopColor="#4338ca" stopOpacity=".55" />
            <stop offset="1" stopColor="#0d9488" stopOpacity=".55" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const ICONS: Record<string, ReactNode> = {
  audit: (<><circle cx="21" cy="21" r="9" /><path d="M28 28l8 8" /><path d="M17 21l3 3 5-6" /></>),
  design: (<><rect x="6" y="6" width="14" height="14" rx="3" /><rect x="24" y="6" width="14" height="14" rx="3" /><rect x="6" y="24" width="14" height="14" rx="3" /><path d="M31 24v14M24 31h14" /></>),
  pilot: (<><path d="M8 34l8-10 6 6 14-18" /><path d="M28 12h8v8" /></>),
  handover: (<><path d="M6 24h10l4-8 6 16 4-8h8" /><circle cx="38" cy="24" r="0.5" /></>),
  source: (<><path d="M10 6h18l8 8v24H10z" /><path d="M28 6v8h8M16 22h14M16 29h14" /></>),
  explain: (<><path d="M6 10h32v20H22l-8 8v-8H6z" /><path d="M14 18h16M14 24h10" /></>),
  try: (<><path d="M14 8v14L8 34a3 3 0 003 4h22a3 3 0 003-4l-6-12V8" /><path d="M12 8h20M14 28h16" /></>),
  measure: (<><path d="M8 36V20M18 36V10M28 36V24M38 36V16" /></>),
};

export function Icon({ name, size = 44 }: { name: keyof typeof ICONS | string; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 44 44" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

const STAGES = [
  { icon: "source", title: "Official source", text: "We read the vendor's own release page." },
  { icon: "explain", title: "Plain explainer", text: "What changed, for whom, and what's unconfirmed." },
  { icon: "try", title: "Safe test", text: "A small task you can run without risking data." },
  { icon: "measure", title: "Measure", text: "Compare time and quality before you commit." },
];

/** Release-to-result pipeline with animated connectors. */
export function FlowDiagram() {
  return (
    <section className="section" aria-labelledby="flow-h">
      <div className="wrap">
        <p className="eyebrow">How we turn news into practice</p>
        <h2 id="flow-h" style={{ marginBottom: 28 }}>From release note to a result you can measure</h2>
        <ol className="flow">
          {STAGES.map((s, i) => (
            <li key={s.title}>
              <div className="flow-node">
                <span className="flow-icon"><Icon name={s.icon} /></span>
                <span className="flow-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              {i < STAGES.length - 1 && (
                <svg className="flow-link" viewBox="0 0 80 12" aria-hidden="true">
                  <path d="M0 6h72" className="dash" />
                  <path d="M68 1l8 5-8 5" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function StatStrip({ stats }: { stats: { value: number; label: string }[] }) {
  return (
    <div className="wrap">
      <ul className="stats" aria-label="Site at a glance">
        {stats.map((s) => (
          <li key={s.label}>
            <span className="stat-ring" aria-hidden="true" />
            <b>{s.value}</b>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
