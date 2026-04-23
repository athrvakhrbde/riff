import type { ReactNode } from "react";

/** Full-width layout shell (all viewports — no desktop-only gate). */
export function DesktopShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
