import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SplitDeckSection } from "../components/SplitDeckSection";
import {
  icpPenetration,
  replacingSamples,
  tractionChannels,
} from "../content";
import { DesktopShell } from "../layouts/DesktopShell";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { HeroBackdropSvg } from "../visuals/HeroBackdropSvg";
import { HeroVisual } from "../visuals/HeroVisual";
import { IcpVisual } from "../visuals/IcpVisual";
import { ReplacingSamplesVisual } from "../visuals/ReplacingSamplesVisual";
import { TractionVisual } from "../visuals/TractionVisual";

export function HomePage() {
  const [openMenu, setOpenMenu] = useState(false);
  const scrollProgress = useScrollProgress();

  const go = useCallback((hash: string) => {
    document.querySelector<HTMLElement>(hash)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setOpenMenu(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => setOpenMenu(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <DesktopShell>
      <div className="page-noise" aria-hidden />
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <div
          className="read-progress"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden
        />
        <div className="site-header-inner">
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={openMenu}
            aria-controls="site-nav"
            onClick={() => setOpenMenu((o) => !o)}
          >
            Menu
          </button>
          <button
            type="button"
            className="site-wordmark"
            onClick={() => go("#intro")}
            aria-label="Riffle Growth — back to intro"
          >
            <span className="site-wordmark-stack">
              <span className="site-wordmark-name">Riffle</span>
              <span className="site-wordmark-tag">Growth</span>
            </span>
          </button>
          <nav
            id="site-nav"
            className={`site-nav${openMenu ? " is-open" : ""}`}
            aria-label="Page"
          >
            <Link className="site-nav-link" to="/about-atharva">
              About Atharva
            </Link>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="intro" className="hero" aria-label="Introduction">
          <div className="hero-back" aria-hidden>
            <HeroBackdropSvg className="hero-back-svg" />
            <div className="hero-back-scrim" />
          </div>
          <div className="hero-fore">
            <p className="hero-eyebrow">Growth deck</p>
            <h1 className="hero-title">Riffle</h1>
            <p className="hero-lede">
              <span className="hero-lede-stat">30 weeks</span>
              <span className="hero-lede-sep" aria-hidden>
                ·
              </span>
              <span className="hero-lede-copy">
                Growth Strategy and Traction Channels
              </span>
            </p>
            <HeroVisual />
          </div>
        </section>

        <SplitDeckSection
          id="replacing-samples"
          chapter="01"
          title={replacingSamples.title}
        >
          <div id="section-replacing" className="panel-inner">
            <ReplacingSamplesVisual />
          </div>
        </SplitDeckSection>

        <SplitDeckSection
          id="traction"
          chapter="02"
          title={tractionChannels.title}
        >
          <div id="section-traction" className="panel-inner">
            <TractionVisual />
          </div>
        </SplitDeckSection>

        <SplitDeckSection
          id="icp"
          chapter="03"
          title={icpPenetration.title}
        >
          <div id="section-icp" className="panel-inner">
            <IcpVisual />
          </div>
        </SplitDeckSection>
      </main>
    </DesktopShell>
  );
}
