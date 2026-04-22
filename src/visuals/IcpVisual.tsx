import { icpPenetration } from "../content";
import { ChapterLeadSvg } from "./DeckIllustrations";

export function IcpVisual() {
  return (
    <div className="viz-icp">
      <figure className="viz-chapter-lede viz-chapter-lede--icp">
        <div className="viz-chapter-lede-frame">
          <ChapterLeadSvg variant="icp" className="viz-chapter-lede-svg" />
        </div>
        <figcaption className="viz-chapter-lede-cap">
          Scene presence — how the ICP thinks, gathers, and trusts
        </figcaption>
      </figure>

      <div className="viz-icp-rail" aria-hidden>
        {icpPenetration.blocks.map((b, i) => (
          <div key={b.id} className="viz-icp-rail-seg">
            <span className="viz-icp-rail-num">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < icpPenetration.blocks.length - 1 ? (
              <span className="viz-icp-rail-line" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="viz-icp-stack">
        {icpPenetration.blocks.map((block, i) => {
          const label =
            icpPenetration.sidebar.find((s) => s.id === block.id)?.label ??
            block.id;
          return (
            <article
              key={block.id}
              id={`icp-${block.id}`}
              className="viz-icp-block"
            >
              <header className="viz-icp-head">
                <span className="viz-icp-idx">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="viz-icp-title">{label}</h3>
              </header>
              <div className="viz-icp-body">
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
