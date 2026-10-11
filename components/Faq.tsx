import { JsonLd } from "@/components/JsonLd";

/** Visible Q&A (answer-first) plus FAQPage structured data. */
export function Faq({ items, title = "Frequently asked questions" }: { items: [string, string][]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section className="sim" aria-labelledby="faq-sec-h">
      <JsonLd
        data={{
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }}
      />
      <h2 id="faq-sec-h">{title}</h2>
      <div className="qa">
        {items.map(([q, a]) => (
          <div key={q} className="qa-item">
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Answer({ children, label = "Short answer" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="takeaway" role="note">
      <b>{label}</b>
      <p>{children}</p>
    </div>
  );
}
