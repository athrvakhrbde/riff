import { replacingSamples } from "../content";

export function ReplacingSamplesVisual() {
  const [a, b, c, d, e, f] = replacingSamples.blocks;
  const friction = [a, b, c];

  return (
    <div className="deck-stack">
      <p className="deck-lead">
        Why precision beats endless scrolling and one-off sample packs.
      </p>

      <ul className="deck-card-list">
        {friction.map((blk) => (
          <li key={blk.id} id={`rs-${blk.id}`} className="deck-card">
            <h3 className="deck-card-title">
              {replacingSamples.sidebar.find((s) => s.id === blk.navId)
                ?.label ?? blk.navId}
            </h3>
            <p className="deck-card-text">{blk.body}</p>
          </li>
        ))}
      </ul>

      <p id={`rs-${d.id}`} className="deck-callout">
        {d.body}
      </p>

      <blockquote id={`rs-${e.id}`} className="deck-quote">
        <p>{e.body}</p>
      </blockquote>

      <p id={`rs-${f.id}`} className="deck-kicker">
        {f.body}
      </p>
    </div>
  );
}
