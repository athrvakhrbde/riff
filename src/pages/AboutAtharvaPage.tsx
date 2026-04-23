import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DesktopShell } from "../layouts/DesktopShell";

const VIDEO_SRC = "/media/about-atharva.mp4";

export function AboutAtharvaPage() {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => setOpenMenu(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <DesktopShell>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <div className="read-progress" style={{ transform: "scaleX(0)" }} aria-hidden />
        <div className="site-header-inner">
          <Link className="site-wordmark" to="/" aria-label="Riffle Growth — back to deck">
            <span className="site-wordmark-stack">
              <span className="site-wordmark-name">Riffle</span>
              <span className="site-wordmark-tag">Growth</span>
            </span>
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={openMenu}
            aria-controls="site-nav-about"
            onClick={() => setOpenMenu((o) => !o)}
          >
            Menu
          </button>
          <nav
            id="site-nav-about"
            className={`site-nav${openMenu ? " is-open" : ""}`}
            aria-label="Page"
          >
            <Link className="site-nav-link" to="/">
              Back to deck
            </Link>
          </nav>
        </div>
      </header>

      <main id="main" className="about-page">
        <video
          className="about-page-video"
          controls
          playsInline
          preload="auto"
          autoPlay
          muted
          src={VIDEO_SRC}
        >
          <a href={VIDEO_SRC}>Download video</a>
        </video>
      </main>
    </DesktopShell>
  );
}
