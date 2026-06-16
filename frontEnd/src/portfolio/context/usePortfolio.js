import { useContext } from "react";
import { PortfolioThemeContext, PortfolioLanguageContext, PortfolioModeContext } from "./portfolioContexts.js";

export const usePortfolioTheme = () => {
  const ctx = useContext(PortfolioThemeContext);
  if (!ctx) throw new Error("usePortfolioTheme must be used inside PortfolioThemeProvider");
  return ctx;
};

export const usePortfolioLang = () => {
  const ctx = useContext(PortfolioLanguageContext);
  if (!ctx) throw new Error("usePortfolioLang must be used inside PortfolioLanguageProvider");
  return ctx;
};

export const usePortfolioMode = () => {
  const ctx = useContext(PortfolioModeContext);
  if (!ctx) throw new Error("usePortfolioMode must be used inside PortfolioModeProvider");
  return ctx;
};
