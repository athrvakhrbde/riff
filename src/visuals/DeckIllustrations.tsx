/**
 * Editorial diagram system — shared geometry, token-driven strokes, unique defs per mount.
 */
import { useId } from "react";

const S = {
  faint: "var(--ds-diagram-ink-faint)",
  ink: "var(--ds-diagram-ink)",
  mid: "var(--ds-diagram-ink-mid)",
  accent: "var(--ds-accent)",
  neon: "var(--ds-neon)",
  accentSoft: "var(--ds-diagram-accent-soft)",
  hair: "var(--ds-hairline-strong)",
} as const;

function uid(raw: string) {
  return raw.replace(/[^a-zA-Z0-9_-]/g, "");
}

function chapterFrameHud() {
  const x = 40;
  const y = 36;
  const w = 800;
  const h = 328;
  const n = 20;
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill="var(--ds-diagram-bg)" stroke={S.hair} strokeWidth="1" />
      <g
        stroke={S.neon}
        strokeOpacity="0.55"
        strokeWidth="1.25"
        fill="none"
        strokeLinecap="square"
      >
        <path d={`M ${x + n} ${y} H ${x} V ${y + n}`} />
        <path d={`M ${x + w - n} ${y} H ${x + w} V ${y + n}`} />
        <path d={`M ${x} ${y + h - n} V ${y + h} H ${x + n}`} />
        <path d={`M ${x + w} ${y + h - n} V ${y + h} H ${x + w - n}`} />
      </g>
      <g stroke={S.accent} strokeOpacity="0.28" strokeWidth="1" fill="none" strokeLinecap="square">
        <path d={`M ${x + w - 52} ${y + 10} h 42 M ${x + w - 10} ${y + 10} v 42`} />
        <path d={`M ${x + 10} ${y + h - 10} h 42 M ${x + 10} ${y + h - 52} v 42`} />
      </g>
    </>
  );
}

export function ChapterLeadSvg({
  variant,
  className,
}: {
  variant: "replacing" | "traction" | "icp";
  className?: string;
}) {
  const id = uid(useId());

  if (variant === "replacing") {
    const clip = `${id}-clip`;
    return (
      <svg className={className} viewBox="0 0 880 400" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <clipPath id={clip}>
            <rect x="40" y="36" width="800" height="328" />
          </clipPath>
        </defs>
        {chapterFrameHud()}
        <g clipPath={`url(#${clip})`}>
          <line x1="80" y1="248" x2="800" y2="248" stroke={S.ink} strokeWidth="1" strokeDasharray="4 6" />
          <path
            d="M 72 214 C 140 150 200 270 268 200 S 380 228 440 196 S 520 240 588 188 S 700 220 808 196"
            fill="none"
            stroke={S.mid}
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M 72 282 C 160 330 220 210 292 278 S 400 252 468 284 S 560 236 636 272 S 740 248 808 276"
            fill="none"
            stroke={S.accent}
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeOpacity="0.85"
          />
          <rect x="412" y="120" width="56" height="176" fill={S.accent} fillOpacity="0.07" stroke={S.accent} strokeWidth="1" strokeOpacity="0.35" />
          <line x1="440" y1="112" x2="440" y2="308" stroke={S.accent} strokeWidth="2" />
          <rect x="432" y="236" width="16" height="24" fill={S.accent} fillOpacity="0.9" />
          <path d="M 404 248 L 432 232 L 432 264 Z" fill={S.accent} fillOpacity="0.5" />
          <path d="M 476 248 L 448 232 L 448 264 Z" fill={S.accent} fillOpacity="0.5" />
          <line x1="80" y1="100" x2="80" y2="320" stroke={S.faint} strokeWidth="1" />
          <line x1="800" y1="100" x2="800" y2="320" stroke={S.faint} strokeWidth="1" />
          {[-40, 0, 40].map((o) => (
            <line key={o} x1={440 + o} y1="104" x2={440 + o} y2="112" stroke={S.mid} strokeWidth="1" />
          ))}
        </g>
      </svg>
    );
  }

  if (variant === "traction") {
    const cx = 440;
    const cy = 208;
    const r = 108;
    const pts = [0, 1, 2, 3, 4].map((i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
    });
    return (
      <svg className={className} viewBox="0 0 880 400" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {chapterFrameHud()}
        <circle cx={cx} cy={cy} r={r + 38} fill="none" stroke={S.ink} strokeWidth="1" strokeDasharray="2 9" opacity="0.7" />
        {pts.map((p, i) => {
          const mx = cx + (p.x - cx) * 0.38;
          const my = cy + (p.y - cy) * 0.38;
          return (
            <path
              key={`curve-${i}`}
              d={`M ${cx} ${cy} Q ${mx + (p.y - cy) * 0.12} ${my - (p.x - cx) * 0.12} ${p.x} ${p.y}`}
              fill="none"
              stroke={S.ink}
              strokeWidth="1.25"
              opacity="0.85"
            />
          );
        })}
        <circle cx={cx} cy={cy} r="22" fill="var(--ds-surface-card)" stroke={S.accent} strokeWidth="2" />
        <circle cx={cx} cy={cy} r="8" fill={S.accent} fillOpacity="0.75" />
        {pts.map((p, i) => (
          <g key={`node-${i}`}>
            <rect
              x={p.x - 6}
              y={p.y - 6}
              width="12"
              height="12"
              fill={i === 0 ? S.accent : "none"}
              fillOpacity={i === 0 ? 0.2 : undefined}
              stroke={S.accent}
              strokeWidth="1.5"
              strokeOpacity={i === 0 ? 1 : 0.55}
            />
            <circle cx={p.x} cy={p.y} r="2" fill={S.accent} fillOpacity={i === 0 ? 1 : 0.35} />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 880 400" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {chapterFrameHud()}
      <line x1="440" y1="64" x2="440" y2="336" stroke={S.ink} strokeWidth="1" strokeDasharray="3 8" opacity="0.55" />
      <line x1="96" y1="200" x2="784" y2="200" stroke={S.ink} strokeWidth="1" strokeDasharray="3 8" opacity="0.55" />
      <circle cx="440" cy="200" r="132" fill="none" stroke={S.faint} strokeWidth="1" />
      <circle cx="440" cy="200" r="96" fill="none" stroke={S.ink} strokeWidth="1" strokeDasharray="5 8" />
      <circle cx="440" cy="200" r="56" fill="none" stroke={S.accentSoft} strokeWidth="1.5" />
      <circle cx="440" cy="200" r="20" fill="none" stroke={S.accent} strokeWidth="2" />
      <circle cx="440" cy="200" r="5" fill={S.accent} />
      {[
        { x: 440, y: 68, o: 1 },
        { x: 612, y: 200, o: 0.85 },
        { x: 440, y: 332, o: 0.7 },
        { x: 268, y: 200, o: 0.85 },
      ].map((p, i) => (
        <g key={`icp-aim-${i}`}>
          <circle cx={p.x} cy={p.y} r="8" fill="none" stroke={S.accent} strokeWidth="1.5" strokeOpacity={p.o} />
          <circle cx={p.x} cy={p.y} r="2.5" fill={S.accent} fillOpacity={p.o * 0.6} />
        </g>
      ))}
    </svg>
  );
}

export type TractionChannelId =
  | "reddit"
  | "irl"
  | "tiktok"
  | "ambassador"
  | "label";

function bentoFrameHud() {
  const x = 28;
  const y = 28;
  const w = 424;
  const h = 264;
  const n = 12;
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill="var(--ds-diagram-bg)" stroke={S.hair} strokeWidth="1" />
      <g
        stroke={S.neon}
        strokeOpacity="0.48"
        strokeWidth="1"
        fill="none"
        strokeLinecap="square"
      >
        <path d={`M ${x + n} ${y} H ${x} V ${y + n}`} />
        <path d={`M ${x + w - n} ${y} H ${x + w} V ${y + n}`} />
        <path d={`M ${x} ${y + h - n} V ${y + h} H ${x + n}`} />
        <path d={`M ${x + w} ${y + h - n} V ${y + h} H ${x + w - n}`} />
      </g>
    </>
  );
}

export function TractionChannelSvg({
  id,
  className,
}: {
  id: TractionChannelId;
  className?: string;
}) {
  switch (id) {
    case "reddit": {
      return (
        <svg className={className} viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          {bentoFrameHud()}
          <rect x="28" y="28" width="424" height="264" fill={S.accent} fillOpacity="0.04" />
          <g fill="none" stroke={S.accent} strokeWidth="2" strokeLinecap="square">
            <path d="M 152 108 L 172 88 L 192 108" />
            <path d="M 152 132 L 172 112 L 192 132" />
            <path d="M 152 156 L 172 136 L 192 156" />
          </g>
          <rect x="228" y="76" width="200" height="168" stroke={S.mid} strokeWidth="1.5" fill="none" />
          <line x1="248" y1="104" x2="388" y2="104" stroke={S.ink} strokeWidth="1.5" />
          <line x1="248" y1="128" x2="360" y2="128" stroke={S.ink} strokeWidth="1" opacity="0.65" />
          <line x1="248" y1="152" x2="372" y2="152" stroke={S.ink} strokeWidth="1" opacity="0.65" />
          <rect x="248" y="176" width="160" height="40" fill={S.accent} fillOpacity="0.08" stroke={S.accent} strokeWidth="1" strokeOpacity="0.35" />
          <circle cx="196" cy="200" r="36" fill="none" stroke={S.accent} strokeWidth="1.75" strokeOpacity="0.65" />
          <circle cx="188" cy="192" r="4" fill={S.mid} />
          <circle cx="204" cy="192" r="4" fill={S.mid} />
          <path d="M 176 216 Q 196 228 216 216" stroke={S.mid} strokeWidth="1.5" fill="none" />
        </svg>
      );
    }
    case "irl":
      return (
        <svg className={className} viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          {bentoFrameHud()}
          <path d="M 120 220 H 360 V 180 H 120 Z" fill={S.accent} fillOpacity="0.06" stroke={S.accent} strokeWidth="1.5" strokeOpacity="0.45" />
          <path
            d="M 96 220 Q 240 140 384 220"
            fill="none"
            stroke={S.mid}
            strokeWidth="1.5"
            strokeDasharray="3 6"
          />
          {[-72, -36, 0, 36, 72].map((o) => (
            <circle key={o} cx={240 + o * 1.2} cy="208" r="3" fill={S.ink} />
          ))}
          <g stroke={S.accent} strokeWidth="1.5" fill="none" strokeOpacity="0.55">
            <line x1="240" y1="40" x2="200" y2="180" />
            <line x1="240" y1="40" x2="240" y2="180" />
            <line x1="240" y1="40" x2="280" y2="180" />
          </g>
          <circle cx="240" cy="232" r="6" fill={S.accent} fillOpacity="0.35" stroke={S.accent} strokeWidth="1.25" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={className} viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          {bentoFrameHud()}
          <rect x="176" y="56" width="128" height="224" fill="none" stroke={S.accent} strokeWidth="2" />
          <rect x="188" y="72" width="104" height="168" fill="var(--ds-surface-ink)" stroke={S.ink} strokeWidth="1" />
          <path
            d="M 204 118 L 212 106 L 220 118 L 228 104 L 236 120 L 244 108 L 252 122 L 260 110 L 268 124 L 276 114"
            fill="none"
            stroke={S.accent}
            strokeWidth="1.75"
            strokeOpacity="0.75"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M 204 152 L 276 152"
            stroke={S.ink}
            strokeWidth="1"
            strokeDasharray="3 5"
          />
          <path d="M 224 184 L 224 214 L 256 199 Z" fill={S.accent} fillOpacity="0.55" stroke={S.accent} strokeWidth="1.25" />
          <rect x="232" y="68" width="16" height="4" fill={S.mid} />
          <line x1="188" y1="252" x2="292" y2="252" stroke={S.mid} strokeWidth="2" />
          <circle cx="240" cy="260" r="3" fill={S.accent} fillOpacity="0.5" />
        </svg>
      );
    case "ambassador":
      return (
        <svg className={className} viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          {bentoFrameHud()}
          <path d="M 240 92 L 352 248 L 128 248 Z" fill="none" stroke={S.ink} strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
          <circle cx="240" cy="108" r="12" fill="none" stroke={S.accent} strokeWidth="2" />
          <line x1="240" y1="120" x2="240" y2="156" stroke={S.accent} strokeWidth="2" />
          <path d="M 224 136 H 256" stroke={S.accent} strokeWidth="2" />
          <circle cx="148" cy="232" r="12" fill="none" stroke={S.mid} strokeWidth="1.75" />
          <line x1="148" y1="244" x2="148" y2="268" stroke={S.mid} strokeWidth="1.75" />
          <path d="M 136 256 H 160" stroke={S.mid} strokeWidth="1.75" />
          <circle cx="332" cy="232" r="12" fill="none" stroke={S.mid} strokeWidth="1.75" />
          <line x1="332" y1="244" x2="332" y2="268" stroke={S.mid} strokeWidth="1.75" />
          <path d="M 320 256 H 344" stroke={S.mid} strokeWidth="1.75" />
          <path d="M 240 156 L 148 220" stroke={S.ink} strokeWidth="1.25" />
          <path d="M 240 156 L 332 220" stroke={S.ink} strokeWidth="1.25" />
          <path d="M 148 232 L 332 232" stroke={S.accentSoft} strokeWidth="1" strokeDasharray="3 5" />
          <circle cx="240" cy="156" r="4" fill={S.accent} fillOpacity="0.8" />
        </svg>
      );
    case "label":
      return (
        <svg className={className} viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          {bentoFrameHud()}
          <circle cx="240" cy="168" r="88" fill="none" stroke={S.ink} strokeWidth="1" />
          <circle cx="240" cy="168" r="72" fill="none" stroke={S.mid} strokeWidth="1" strokeDasharray="2 7" />
          <circle cx="240" cy="168" r="56" fill="none" stroke={S.accentSoft} strokeWidth="1.25" />
          <circle cx="240" cy="168" r="40" fill="none" stroke={S.accent} strokeWidth="1.5" strokeOpacity="0.55" />
          <circle cx="240" cy="168" r="22" fill="var(--ds-surface-card)" stroke={S.accent} strokeWidth="1.75" />
          <circle cx="240" cy="168" r="8" fill={S.accent} fillOpacity="0.65" />
          <path
            d="M 240 92 L 292 118 L 292 218 L 240 244 L 188 218 L 188 118 Z"
            fill="none"
            stroke={S.faint}
            strokeWidth="1"
          />
          <line x1="320" y1="108" x2="380" y2="128" stroke={S.accent} strokeWidth="1.5" strokeOpacity="0.45" />
          <circle cx="388" cy="130" r="5" fill="none" stroke={S.accent} strokeWidth="1.25" />
        </svg>
      );
  }
}
