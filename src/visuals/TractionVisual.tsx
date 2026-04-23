import { tractionChannels } from "../content";

const labels = tractionChannels.sidebar;

export function TractionVisual() {
  return (
    <div className="deck-stack">
      <p className="deck-lead">
        Discovery compounds when channels are named, sequenced, and owned—not
        left to chance.
      </p>

      <ul className="deck-card-list deck-card-list--plain">
        {tractionChannels.blocks.map((block) => {
          const title =
            labels.find((l) => l.id === block.id)?.label ?? block.id;
          return (
            <li key={block.id} id={`tc-${block.id}`} className="deck-card">
              <h3 className="deck-card-title">{title}</h3>
              <div className="deck-card-body">
                {block.paragraphs.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
