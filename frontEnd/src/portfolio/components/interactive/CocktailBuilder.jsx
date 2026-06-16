import { useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import PropTypes from "prop-types";
import Reveal from "../Reveal.jsx";
import { usePortfolioLang } from "../../context/usePortfolio.js";
import { COCKTAIL_FAMILIES } from "../../data/cocktails.js";

// glass interior geometry per type — used to clip the animated liquid
const GLASS = {
  rocks: { clip: "M33,52 L87,52 L83,142 L37,142 Z", top: 52, bottom: 142, fill: 0.66 },
  coupe: { clip: "M26,50 Q60,116 94,50 Z", top: 50, bottom: 96, fill: 0.92 },
};

const Glass = ({ family }) => {
  const reduced = useReducedMotion();
  const g = GLASS[family.glass] ?? GLASS.rocks;
  const surfaceY = g.bottom - (g.bottom - g.top) * g.fill;
  const clipId = `glass-${family.id}`;

  return (
    <svg viewBox="0 0 120 175" className="vp-glass" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d={g.clip} />
        </clipPath>
      </defs>

      {/* liquid — clipped to the interior, rises on select */}
      <g clipPath={`url(#${clipId})`}>
        <Motion.rect
          key={family.id}
          x="20"
          width="80"
          initial={reduced ? { y: surfaceY, height: g.bottom - surfaceY } : { y: g.bottom, height: 0 }}
          animate={{ y: surfaceY, height: g.bottom - surfaceY }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          fill={family.liquid}
        />
        <Motion.ellipse
          key={`s-${family.id}`}
          cx="60"
          rx="30"
          ry="2.5"
          initial={reduced ? { cy: surfaceY } : { cy: g.bottom }}
          animate={{ cy: surfaceY }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          fill="#ffffff"
          opacity="0.18"
        />
      </g>

      {/* glassware outline */}
      {family.glass === "coupe" ? (
        <g className="vp-glass__line" fill="none">
          <path d="M24,48 Q60,120 96,48" />
          <line x1="60" y1="112" x2="60" y2="150" />
          <line x1="42" y1="152" x2="78" y2="152" />
        </g>
      ) : (
        <g className="vp-glass__line" fill="none">
          <path d="M31,50 L89,50 L84,146 L36,146 Z" />
          <line x1="33" y1="64" x2="87" y2="64" opacity="0.4" />
        </g>
      )}
      {/* garnish dot */}
      <circle cx={family.glass === "coupe" ? 84 : 82} cy={family.glass === "coupe" ? 46 : 50} r="5" fill={family.accent} />
    </svg>
  );
};

/**
 * Interactive Cocktail Builder — the six roots of The Cocktail Tree. Pick a base
 * spirit; the glass pours its signature serve and the recipe reveals.
 */
const CocktailBuilder = () => {
  const { t } = usePortfolioLang();
  const [activeId, setActiveId] = useState(COCKTAIL_FAMILIES[0].id);
  const family = COCKTAIL_FAMILIES.find((f) => f.id === activeId) ?? COCKTAIL_FAMILIES[0];

  return (
    <section className="vp-section vp-builder">
      <SectionHead t={t} />
      <div className="vp-container">
        <Reveal>
          <div className="vp-builder__bases" role="group" aria-label={t("builder.kicker")}>
            {COCKTAIL_FAMILIES.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={f.id === activeId}
                className={`vp-builder__base ${f.id === activeId ? "is-active" : ""}`}
                style={{ "--fam": f.accent }}
                onClick={() => setActiveId(f.id)}
              >
                {t(`builder.bases.${f.id}`)}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="vp-builder__stage" style={{ "--fam": family.accent }}>
          <div className="vp-builder__glass-wrap">
            <Glass family={family} />
            <span className="vp-builder__abv">{family.abv} ABV</span>
          </div>

          <Motion.div key={family.id} className="vp-builder__recipe"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <p className="vp-builder__family">{family.base}</p>
            <h3 className="vp-builder__name">{family.name}</h3>
            <p className="vp-builder__tagline">{family.tagline}</p>

            <ul className="vp-builder__ingredients">
              {family.ingredients.map((ing) => (
                <li key={ing.name}>
                  <span className="vp-builder__amt">{ing.amount}</span>
                  <span className="vp-builder__leader" aria-hidden="true" />
                  <span className="vp-builder__ing">{ing.name}</span>
                </li>
              ))}
            </ul>

            <p className="vp-builder__method">
              <Check size={14} aria-hidden="true" />
              {family.method}
            </p>
            <div className="vp-builder__meta">
              <span className="vp-builder__garnish">{t("builder.garnish")}: {family.garnish}</span>
              <div className="vp-builder__flavors">
                {family.flavor.map((fl) => (
                  <span className="vp-chip vp-chip--gold" key={fl}>{fl}</span>
                ))}
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

const SectionHead = ({ t }) => (
  <div className="vp-container">
    <Reveal>
      <p className="vp-kicker">{t("builder.kicker")}</p>
      <h2 className="vp-h2 vp-h2--serif">{t("builder.title")}</h2>
      <p className="vp-sub">{t("builder.sub")}</p>
    </Reveal>
  </div>
);

Glass.propTypes = { family: PropTypes.object.isRequired };
SectionHead.propTypes = { t: PropTypes.func.isRequired };

export default CocktailBuilder;
