import type { ReactNode } from "react";

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
  return (
    <section
      id={id}
      className="deck-section"
      aria-labelledby={`${id}-heading`}
    >
      <div className="deck-section-inner">
        <header className="deck-head">
          {chapter ? (
            <p className="deck-chapter-label" aria-hidden>
              Section {chapter}
            </p>
          ) : null}
          <h2 id={`${id}-heading`} className="deck-title">
            {title}
          </h2>
        </header>
        <div className="deck-content">{children}</div>
      </div>
    </section>
  );
}
