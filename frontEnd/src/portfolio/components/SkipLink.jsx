import { usePortfolioLang } from "../context/usePortfolio.js";

// Keyboard-only "skip to content" link — first focusable element on the page.
const SkipLink = () => {
  const { t } = usePortfolioLang();
  return (
    <a href="#vp-main" className="vp-skip">
      {t("a11y.skip")}
    </a>
  );
};

export default SkipLink;
