import { icpPenetration } from "../content";

export function IcpVisual() {
  return (
    <div className="deck-stack">
      <p className="deck-lead">
        Meet people where they already gather, speak with them—not at them—and
        earn trust before you scale reach.
      </p>

      <ol className="deck-numbered">
        {icpPenetration.blocks.map((block, i) => {
          const label =
            icpPenetration.sidebar.find((s) => s.id === block.id)?.label ??
            block.id;
          return (
            <li
              key={block.id}
              id={`icp-${block.id}`}
              className="deck-numbered-item"
            >
              <div className="deck-numbered-head">
                <span className="deck-numbered-idx">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="deck-numbered-title">{label}</h3>
              </div>
              <div className="deck-numbered-body">
                {block.paragraphs.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
