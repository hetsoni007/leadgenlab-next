import Link from "next/link";

const NAV = [
  { href: "/learn", label: "Learn" },
  { href: "/prompts", label: "Prompts" },
  { href: "/ai-updates", label: "Updates" },
  { href: "/guides", label: "Guides" },
  { href: "/workflows", label: "Workflows" },
  { href: "/quiz", label: "AI readiness" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="LeadGenLab home">
          <span className="brand-mark" aria-hidden="true">LG</span>
          <span>LeadGen<em>Lab</em></span>
        </Link>
        <nav aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn-sm">Request an audit</Link>
      </div>
    </header>
  );
}
