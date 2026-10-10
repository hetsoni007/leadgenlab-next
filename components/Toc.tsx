import type { TocItem } from "@/lib/toc";

export function Toc({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <h2>On this page</h2>
      <ol>
        {items.map((i) => (
          <li key={i.id} className={i.level === 3 ? "sub" : undefined}>
            <a href={`#${i.id}`}>{i.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
