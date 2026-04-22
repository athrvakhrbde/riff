import { replacingSamples } from "../content";
import { ChapterLeadSvg } from "./DeckIllustrations";

export function ReplacingSamplesVisual() {
  const [a, b, c, d, e, f] = replacingSamples.blocks;

  return (
    <div className="viz-rs">
      <figure className="viz-chapter-lede viz-chapter-lede--rs">
        <div className="viz-chapter-lede-frame">
          <ChapterLeadSvg variant="replacing" className="viz-chapter-lede-svg" />
        </div>
        <figcaption className="viz-chapter-lede-cap">
          Production culture — why precision beats endless scrolling and packs
        </figcaption>
      </figure>

      <div className="viz-rs-friction">
        {[a, b, c].map((blk) => (
          <article
            key={blk.id}
            id={`rs-${blk.id}`}
            className="viz-card viz-card--friction"
          >
            <header className="viz-card-head">
              <span className="viz-card-idx">
                {replacingSamples.sidebar.find((s) => s.id === blk.navId)?.label ??
                  blk.navId}
              </span>
            </header>
            <p className="viz-card-body">{blk.body}</p>
          </article>
        ))}
      </div>

      <div className="viz-rs-bridge viz-rs-bridge--solo">
        <div className="viz-bridge-line" aria-hidden />
        <p id={`rs-${d.id}`} className="viz-bridge-copy">
          {d.body}
        </p>
      </div>

      <figure className="viz-prompt" aria-label="Deck extract">
        <blockquote id={`rs-${e.id}`} className="viz-prompt-quote">
          <p>{e.body}</p>
        </blockquote>
      </figure>

      <p id={`rs-${f.id}`} className="viz-precision">
        {f.body}
      </p>
    </div>
  );
}
