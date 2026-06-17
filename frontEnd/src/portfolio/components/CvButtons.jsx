import { Download } from "lucide-react";
import PropTypes from "prop-types";
import { usePortfolioLang, usePortfolioMode } from "../context/usePortfolio.js";
import { CVS } from "../data/cvs.js";

/**
 * CV download — a single button that resolves to the right CV by context.
 * The page wins where it's unambiguous (/tech → tech, /bar → hospitality);
 * on the home page the audience mode decides (tech / bar / both → full).
 * Files resolve from src/portfolio/media/.
 */
const CvButtons = ({ variant = "home" }) => {
  const { t } = usePortfolioLang();
  const { mode } = usePortfolioMode();

  const track =
    variant === "tech" ? "tech" : variant === "bar" ? "bar" : mode === "tech" ? "tech" : mode === "bar" ? "bar" : "both";

  const cv = CVS[track];
  if (!cv?.file) return null;

  return (
    <div className="vp-cv">
      <a className="vp-btn vp-btn--primary vp-cv__btn" href={cv.file} download={cv.filename} type="application/pdf">
        <Download size={16} aria-hidden="true" />
        {t(`cv.${track}`)}
      </a>
    </div>
  );
};

CvButtons.propTypes = {
  variant: PropTypes.oneOf(["home", "tech", "bar"]),
};

export default CvButtons;
