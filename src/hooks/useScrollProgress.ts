import { useEffect, useState } from "react";

/** Document scroll progress 0–1 for a thin progress line. */
export function useScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setP(scrollable > 0 ? Math.min(1, Math.max(0, el.scrollTop / scrollable)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return p;
}
