import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion as Motion } from "framer-motion";
import PropTypes from "prop-types";

// base design system first — page stylesheets must be able to override it
import "./styles/portfolio.css";
import "./styles/fx.css";

import { PortfolioThemeProvider } from "./context/PortfolioThemeContext.jsx";
import { PortfolioLanguageProvider } from "./context/PortfolioLanguageContext.jsx";
import { PortfolioModeProvider } from "./context/PortfolioModeContext.jsx";
import {
  usePortfolioTheme,
  usePortfolioLang,
  usePortfolioMode,
} from "./context/usePortfolio.js";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SkipLink from "./components/SkipLink.jsx";
import SceneBackground from "./components/fx/SceneBackground.jsx";
import ScrollProgress from "./components/fx/ScrollProgress.jsx";
import HomePage from "./pages/HomePage.jsx";
import TechPage from "./pages/TechPage.jsx";
import BarPage from "./pages/BarPage.jsx";
import LabPage from "./pages/LabPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { applySeo, SEO } from "./lib/seo.js";

// Route-level enter/exit transition.
const PageFade = ({ children }) => (
  <Motion.div
    className="vp-route"
    initial={{ opacity: 0, y: 26 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -14 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </Motion.div>
);

PageFade.propTypes = { children: PropTypes.node.isRequired };

const variantForPath = (pathname) => {
  if (pathname.startsWith("/tech") || pathname.startsWith("/lab"))
    return "tech";
  if (pathname.startsWith("/bar")) return "bar";
  return "home";
};

// SEO key per path (the Lab is tech-flavoured for the scene, but has its own copy)
const seoForPath = (pathname) => {
  if (pathname === "/lab") return "lab";
  if (pathname === "/tech") return "tech";
  if (pathname === "/bar") return "bar";
  return "home";
};

const PortfolioShell = () => {
  const { theme } = usePortfolioTheme();
  const { lang, dir } = usePortfolioLang();
  const { mode } = usePortfolioMode();
  const location = useLocation();
  const variant = variantForPath(location.pathname);
  const liveRef = useRef(null);
  const firstRender = useRef(true);

  // sync <html lang/dir> so assistive tech and the browser read the page right
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // per-route: scroll up, update SEO, move focus to main, announce the page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const seoKey = seoForPath(location.pathname);
    applySeo(seoKey);

    if (firstRender.current) {
      firstRender.current = false; // don't steal focus / announce on initial load
      return;
    }
    const main = document.getElementById("vp-main");
    main?.focus?.({ preventScroll: true });
    if (liveRef.current) {
      liveRef.current.textContent = (SEO[seoKey] ?? SEO.home).title;
    }
  }, [location.pathname, variant]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="vp-root"
        data-theme={theme}
        data-mode={mode}
        dir={dir}
        lang={lang}>
        <SkipLink />
        <SceneBackground variant={variant} />
        <ScrollProgress />
        <div className="vp-grain" aria-hidden="true" />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageFade>
                  <HomePage />
                </PageFade>
              }
            />
            <Route
              path="tech"
              element={
                <PageFade>
                  <TechPage />
                </PageFade>
              }
            />
            <Route
              path="bar"
              element={
                <PageFade>
                  <BarPage />
                </PageFade>
              }
            />
            <Route
              path="lab"
              element={
                <PageFade>
                  <LabPage />
                </PageFade>
              }
            />
            <Route
              path="*"
              element={
                <PageFade>
                  <NotFoundPage />
                </PageFade>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
        <div
          ref={liveRef}
          className="vp-sr-only"
          role="status"
          aria-live="polite"
        />
      </div>
    </MotionConfig>
  );
};

const PortfolioApp = () => (
  <PortfolioThemeProvider>
    <PortfolioLanguageProvider>
      <PortfolioModeProvider>
        <PortfolioShell />
      </PortfolioModeProvider>
    </PortfolioLanguageProvider>
  </PortfolioThemeProvider>
);

export default PortfolioApp;
