import { useContext } from "react";
import { PortfolioThemeContext, PortfolioLanguageContext } from "./portfolioContexts.js";

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
