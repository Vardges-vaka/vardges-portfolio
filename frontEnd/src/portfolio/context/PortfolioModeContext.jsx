import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { PortfolioModeContext } from "./portfolioContexts.js";

const STORAGE_KEY = "vp-portfolio-mode";
const MODES = ["tech", "both", "bar"];

/**
 * Audience mode — the personalization lens the whole site reacts to.
 *   "tech"  → Engineer · "bar" → Bartender · "both" → the full multidisciplinary story.
 * Persisted in localStorage; defaults to "both" (the duality is the hero).
 * Sets data-mode on <html> + .vp-root so any component (and CSS) can respond.
 */
export const PortfolioModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return MODES.includes(saved) ? saved : "both";
  });

  const setMode = useCallback((next) => {
    if (!MODES.includes(next)) return;
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const cycleMode = useCallback(() => {
    setModeState((prev) => {
      const next = MODES[(MODES.indexOf(prev) + 1) % MODES.length];
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      cycleMode,
      modes: MODES,
      isTech: mode === "tech",
      isBar: mode === "bar",
      isBoth: mode === "both",
      // does this mode show tech / bar content?
      showTech: mode === "tech" || mode === "both",
      showBar: mode === "bar" || mode === "both",
    }),
    [mode, setMode, cycleMode],
  );

  return <PortfolioModeContext.Provider value={value}>{children}</PortfolioModeContext.Provider>;
};

PortfolioModeProvider.propTypes = { children: PropTypes.node.isRequired };

export default PortfolioModeProvider;
