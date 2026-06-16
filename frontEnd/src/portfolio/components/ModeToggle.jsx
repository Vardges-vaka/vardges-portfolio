import { motion as Motion } from "framer-motion";
import { Code2, Martini, Blend } from "lucide-react";
import PropTypes from "prop-types";
import { usePortfolioLang, usePortfolioMode } from "../context/usePortfolio.js";

const OPTIONS = [
  { key: "tech", icon: Code2 },
  { key: "both", icon: Blend },
  { key: "bar", icon: Martini },
];

const SPRING = { type: "spring", stiffness: 420, damping: 22, mass: 0.8 };

/**
 * Audience-mode toggler — three glossy 3D orbs in a recessed glass track. The
 * active mode rises out of the groove, glows, and morphs colour; the others sit
 * back, dim. Real perspective + specular highlights make it tactile. Persistent
 * in the navbar on every page.
 */
const ModeToggle = ({ compact = false }) => {
  const { mode, setMode } = usePortfolioMode();
  const { t } = usePortfolioLang();

  return (
    <div
      className={`vp-modeorb ${compact ? "vp-modeorb--compact" : ""}`}
      data-mode={mode}
      role="radiogroup"
      aria-label={t("mode.label")}
    >
      <div className="vp-modeorb__well">
        <span className="vp-modeorb__track" aria-hidden="true" />
        {OPTIONS.map((opt) => {
          const { key } = opt;
          const Icon = opt.icon;
          const active = mode === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={active}
              className={`vp-modeorb__btn vp-modeorb__btn--${key} ${active ? "is-active" : ""}`}
              onClick={() => setMode(key)}
              title={t(`mode.${key}`)}
            >
              <span className="vp-modeorb__shadow" aria-hidden="true" />
              <Motion.span
                className="vp-modeorb__sphere"
                animate={{ scale: active ? 1 : 0.62, y: active ? -3 : 1 }}
                whileHover={active ? { scale: 1.06 } : { scale: 0.76, y: -1 }}
                whileTap={{ scale: active ? 0.9 : 0.7 }}
                transition={SPRING}
              >
                <span className="vp-modeorb__gloss" aria-hidden="true" />
                <span className="vp-modeorb__shine" aria-hidden="true" />
                <Icon size={active ? 15 : 12} className="vp-modeorb__icon" aria-hidden="true" />
              </Motion.span>
              <span className="vp-sr-only">{t(`mode.${key}`)}</span>
            </button>
          );
        })}
      </div>
      <Motion.span
        key={mode}
        className="vp-modeorb__label"
        aria-hidden="true"
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {t(`mode.${mode}`)}
      </Motion.span>
    </div>
  );
};

ModeToggle.propTypes = { compact: PropTypes.bool };

export default ModeToggle;
