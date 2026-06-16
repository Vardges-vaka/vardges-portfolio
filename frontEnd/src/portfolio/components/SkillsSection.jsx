import PropTypes from "prop-types";
import SkillsRadar from "./SkillsRadar.jsx";
import Hero3D from "./fx/Hero3D.jsx";
import Reveal from "./Reveal.jsx";
import { usePortfolioLang } from "../context/usePortfolio.js";
import { SKILLS } from "../data/skills.js";

/**
 * Skills section — an animated proficiency radar paired with the lazy WebGL
 * hero object. Used on both tech and bar with domain-appropriate axes.
 */
const SkillsSection = ({ variant }) => {
  const { t } = usePortfolioLang();
  const data = SKILLS[variant];

  return (
    <section className="vp-section vp-skills">
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t(`skills.${variant}.kicker`)}</p>
          <h2 className={`vp-h2 ${variant === "bar" ? "vp-h2--serif" : ""}`}>{t(`skills.${variant}.title`)}</h2>
          <p className="vp-sub">{t(`skills.${variant}.sub`)}</p>
        </Reveal>
        <div className="vp-skills__grid">
          <Reveal delay={0.1} className="vp-skills__radar">
            <SkillsRadar data={data} variant={variant} />
          </Reveal>
          <Reveal delay={0.18} className="vp-skills__object">
            <Hero3D variant={variant} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

SkillsSection.propTypes = {
  variant: PropTypes.oneOf(["tech", "bar"]).isRequired,
};

export default SkillsSection;
