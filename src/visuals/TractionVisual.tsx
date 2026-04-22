import { tractionChannels } from "../content";
import {
  ChapterLeadSvg,
  TractionChannelSvg,
  type TractionChannelId,
} from "./DeckIllustrations";

const labels = tractionChannels.sidebar;

export function TractionVisual() {
  return (
    <div className="viz-traction">
      <figure className="viz-chapter-lede viz-chapter-lede--traction">
        <div className="viz-chapter-lede-frame">
          <ChapterLeadSvg variant="traction" className="viz-chapter-lede-svg" />
        </div>
        <figcaption className="viz-chapter-lede-cap">
          Where discovery compounds — channels named in the deck
        </figcaption>
      </figure>

      <div className="viz-traction-meta">
        <span className="viz-metric">
          <strong>{tractionChannels.blocks.length}</strong>
          <span>channels named in the deck</span>
        </span>
        <blockquote className="viz-traction-pull">
          word of mouth, precise ICP targeting and GEO (SEO)
        </blockquote>
      </div>

      <div className="viz-bento">
        {tractionChannels.blocks.map((block) => {
          const title = labels.find((l) => l.id === block.id)?.label ?? block.id;
          return (
            <article
              key={block.id}
              id={`tc-${block.id}`}
              className="viz-bento-card"
            >
              <figure className="viz-bento-figure">
                <TractionChannelSvg
                  id={block.id as TractionChannelId}
                  className="viz-bento-svg"
                />
                <figcaption className="viz-bento-img-cap">{title}</figcaption>
              </figure>
              <div className="viz-bento-body">
                {block.paragraphs.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
