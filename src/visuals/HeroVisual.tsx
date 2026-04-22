const PILLARS = [
  { idx: "01", label: "Replacing Samples", href: "#replacing-samples" },
  { idx: "02", label: "Traction Channels", href: "#traction" },
  { idx: "03", label: "ICP Penetration", href: "#icp" },
] as const;

export function HeroVisual() {
  return (
    <nav className="hero-chapters" aria-label="Jump to chapters">
      <ul className="hero-chapters-list">
        {PILLARS.map((p) => (
          <li key={p.href}>
            <a className="hero-chapter-link" href={p.href}>
              <span className="hero-chapter-idx">{p.idx}</span>
              <span className="hero-chapter-label">{p.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
