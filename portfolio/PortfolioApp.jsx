import { useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import PropTypes from "prop-types";

import { PortfolioThemeProvider } from "./context/PortfolioThemeContext.jsx";
import { PortfolioLanguageProvider } from "./context/PortfolioLanguageContext.jsx";
import { usePortfolioTheme, usePortfolioLang } from "./context/usePortfolio.js";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Cursor from "./components/Cursor.jsx";
import HomePage from "./pages/HomePage.jsx";
import TechPage from "./pages/TechPage.jsx";
import BarPage from "./pages/BarPage.jsx";

import "./styles/portfolio.css";

// Route-level enter/exit transition.
const PageFade = ({ children }) => (
  <Motion.div
    initial={{ opacity: 0, y: 26 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -14 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </Motion.div>
);

PageFade.propTypes = { children: PropTypes.node.isRequired };

const TITLES = {
  "/": "Vardges Petrosyan — Developer & Hospitality Leader",
  "/tech": "Vardges Petrosyan — Full-Stack Developer",
  "/bar": "Vardges Petrosyan — Hospitality & Beverage",
};

const PortfolioShell = () => {
  const { theme } = usePortfolioTheme();
  const { lang, dir } = usePortfolioLang();
  const location = useLocation();

  // custom cursor only on fine pointers without reduced motion
  const cursorOn = useMemo(
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.title = TITLES[location.pathname] ?? TITLES["/"];
  }, [location.pathname]);

  return (
    <div
      className={`vp-root ${cursorOn ? "vp-cursor-on" : ""}`}
      data-theme={theme}
      dir={dir}
      lang={lang}
    >
      {cursorOn && <Cursor />}
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const PortfolioApp = () => (
  <PortfolioThemeProvider>
    <PortfolioLanguageProvider>
      <PortfolioShell />
    </PortfolioLanguageProvider>
  </PortfolioThemeProvider>
);

export default PortfolioApp;
