const RIFFLE_BOARD_URL =
  "https://app.riffle.studio/boards/3058320b-df57-4fdc-96f5-feb014bf191b";

export function StickyAudioPlayer() {
  return (
    <div className="sticky-audio">
      <a
        href={RIFFLE_BOARD_URL}
        className="sticky-audio-btn"
        aria-label="Open Riffle board on app.riffle.studio"
      >
        <span className="sticky-audio-glyph" aria-hidden>
          ▶
        </span>
        <span className="sticky-audio-file">riffle.wav</span>
      </a>
    </div>
  );
}
