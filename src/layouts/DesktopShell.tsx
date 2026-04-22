import type { ReactNode } from "react";

export function DesktopShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="viewport-gate" role="alert" aria-live="polite">
        <div className="viewport-gate-inner">
          <p className="viewport-gate-title">Desktop only</p>
          <p className="viewport-gate-body">
            This layout is built for wide screens. Use a desktop or widen the
            window to at least 1024px to view the deck.
          </p>
        </div>
      </div>
      <div className="desktop-app">{children}</div>
    </>
  );
}
