import { Download, Code2, Martini, Layers } from "lucide-react";
import PropTypes from "prop-types";
import { usePortfolioLang } from "../context/usePortfolio.js";
import { CVS } from "../data/cvs.js";

/**
 * CV download chooser. Three tracks — tech / hospitality / combined. The page
 * variant decides which one is the highlighted (primary) button; the others
 * stay available as ghosts. Files resolve from src/portfolio/media/.
 */
const TRACK_ICON = { tech: Code2, bar: Martini, both: Layers };

const order = {
  home: ["both", "tech", "bar"],
  tech: ["tech", "both", "bar"],
  bar: ["bar", "both", "tech"],
};

const CvButtons = ({ variant = "home" }) => {
  const { t } = usePortfolioLang();
  const tracks = order[variant] ?? order.home;

  return (
    <div className="vp-cv">
      <p className="vp-cv__heading">
        <Download size={15} aria-hidden="true" />
        {t("cv.heading")}
      </p>
      <div className="vp-cv__row">
        {tracks.map((key, i) => {
          const cv = CVS[key];
          if (!cv?.file) return null;
          const Icon = TRACK_ICON[key];
          return (
            <a
              key={key}
              className={`vp-btn ${i === 0 ? "vp-btn--primary" : "vp-btn--ghost"} vp-cv__btn`}
              href={cv.file}
              download={cv.filename}
              type="application/pdf"
            >
              <Icon size={15} aria-hidden="true" />
              {t(`cv.${key}`)}
            </a>
          );
        })}
      </div>
      <p className="vp-cv__sub">{t("cv.sub")}</p>
    </div>
  );
};

CvButtons.propTypes = {
  variant: PropTypes.oneOf(["home", "tech", "bar"]),
};

export default CvButtons;
