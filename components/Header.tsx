import Link from "next/link";

const NAV = [
  { href: "/learn", label: "Learn" },
  { href: "/prompts", label: "Prompts" },
  { href: "/roles", label: "Roles" },
  { href: "/compare", label: "Compare" },
  { href: "/ai-updates", label: "Updates" },
  { href: "/services", label: "Services" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="LeadGenLab home">
          <img className="brand-logo" src="/brand/logo-mark.svg" width={36} height={36} alt="" />
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
