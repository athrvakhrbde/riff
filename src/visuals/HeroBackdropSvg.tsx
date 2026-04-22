/**
 * Minimal hero backdrop — faint grid only, no competing diagram layers.
 */
import { useId } from "react";

const faint = "var(--ds-diagram-ink-faint)";

function uid(raw: string) {
  return raw.replace(/[^a-zA-Z0-9_-]/g, "");
}

export function HeroBackdropSvg({ className }: { className?: string }) {
  const id = uid(useId());
  const pat = `${id}-grid`;

  return (
    <svg
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern id={pat} width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M72 0H0V72" fill="none" stroke={faint} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1600" height="900" fill={`url(#${pat})`} opacity="0.5" />
      <line
        x1="0"
        y1="520"
        x2="1600"
        y2="520"
        stroke="var(--ds-accent)"
        strokeOpacity="0.06"
        strokeWidth="1"
      />
    </svg>
  );
}
