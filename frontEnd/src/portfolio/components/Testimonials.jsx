import { Quote, Linkedin, Sparkles } from "lucide-react";
import PropTypes from "prop-types";
import Reveal from "./Reveal.jsx";
import TiltCard from "./TiltCard.jsx";
import { usePortfolioLang } from "../context/usePortfolio.js";
import { CONTACT } from "../portfolio.constants.js";

// initials avatar (no photos needed)
const Initials = ({ name }) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
  return <span className="vp-quote__avatar" aria-hidden="true">{initials}</span>;
};

Initials.propTypes = { name: PropTypes.string.isRequired };

/**
 * Testimonial wall — condensed LinkedIn recommendations. Cards tilt slightly,
 * carry a big quotation mark, and a link out to the source profile.
 */
const Testimonials = ({ items, variant = "bar" }) => {
  const { t, lang } = usePortfolioLang();
  const translated = lang !== "en";
  return (
    <section className={`vp-section vp-testimonials vp-testimonials--${variant}`}>
      <div className="vp-container">
        <Reveal>
          <p className="vp-kicker">{t("testimonials.kicker")}</p>
          <h2 className={`vp-h2 ${variant === "bar" ? "vp-h2--serif" : ""}`}>{t("testimonials.title")}</h2>
          <p className="vp-sub">{t("testimonials.sub")}</p>
          {translated && (
            <p className="vp-ai-note" title={t("testimonials.aiTip")}>
              <Sparkles size={13} aria-hidden="true" />
              {t("testimonials.aiTranslated")}
            </p>
          )}
        </Reveal>

        <div className="vp-quotes">
          {items.map((q, i) => (
            <Reveal key={q.id} delay={Math.min(i * 0.08, 0.4)}>
              <TiltCard className="vp-quote" max={5}>
                <Quote className="vp-quote__mark" size={30} aria-hidden="true" />
                {translated && (
                  <span className="vp-quote__ai" title={t("testimonials.aiTip")}>
                    <Sparkles size={11} aria-hidden="true" /> {t("testimonials.aiBadge")}
                  </span>
                )}
                <p className="vp-quote__text">{t(`testimonialInfo.${q.id}.quote`, q.quote)}</p>
                <div className="vp-quote__person">
                  <Initials name={q.name} />
                  <div>
                    <p className="vp-quote__name">{q.name}</p>
                    <p className="vp-quote__role">
                      {t(`testimonialInfo.${q.id}.role`, q.role)} · {q.org}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <a className="vp-testimonials__source" href={`${CONTACT.linkedin}/details/recommendations/`} target="_blank" rel="noreferrer">
            <Linkedin size={15} aria-hidden="true" />
            {t("testimonials.source")}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

Testimonials.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  variant: PropTypes.oneOf(["bar", "tech", "home"]),
};

export default Testimonials;
