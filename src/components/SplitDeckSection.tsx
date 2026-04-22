import type { ReactNode } from "react";

const SECTION_SLUG: Partial<Record<string, string>> = {
  "replacing-samples": "deck.replacing_samples",
  traction: "deck.traction_channels",
  icp: "deck.icp_penetration",
};

type Props = {
  id: string;
  title: string;
  chapter?: string;
  children: ReactNode;
};

export function SplitDeckSection({
  id,
  title,
  chapter,
  children,
}: Props) {
  const slug = SECTION_SLUG[id];

  return (
    <section
      id={id}
      className="split-section"
      aria-labelledby={`${id}-heading`}
    >
      <div className="split-grid">
        <aside
          className="split-sidebar custom-scrollbar"
          aria-label={`${title}`}
        >
          {slug ? (
            <p className="split-tech-slug" aria-hidden>
              <span className="split-tech-slug-prompt">~</span>/{slug}
            </p>
          ) : null}
          {chapter ? <p className="split-chapter">{chapter}</p> : null}
          <h2 id={`${id}-heading`} className="split-sidebar-title">
            {title}
          </h2>
        </aside>
        <div className="split-main custom-scrollbar">
          <div className="split-main-inner">
            {chapter ? (
              <p className="split-main-eyebrow">
                <span className="split-main-eyebrow-ch">{chapter}</span>
                <span className="split-main-eyebrow-title">{title}</span>
              </p>
            ) : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
