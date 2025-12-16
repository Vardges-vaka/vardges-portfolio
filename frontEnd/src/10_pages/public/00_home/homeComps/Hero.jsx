import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import PropTypes from "prop-types";
import { placeholder } from "../../../../00_assets/_assets.index.js";

/**
 * Hero Component
 * Landing hero section with CTA buttons
 * Profile-aware content
 */
const Hero = ({ data, onDownloadCV }) => {
  if (!data) return null;

  const handleCTAClick = (cta) => {
    if (cta.action === "downloadCV" && onDownloadCV) {
      onDownloadCV();
    }
  };

  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__text">
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            {data.title}
          </motion.h1>

          <motion.h2
            className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            {data.subtitle}
          </motion.h2>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}>
            {data.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}>
            {data.ctas.map((cta, index) => {
              if (cta.link) {
                return (
                  <Link
                    key={index}
                    to={cta.link}
                    className={`hero__cta ${
                      cta.primary
                        ? "hero__cta--primary"
                        : "hero__cta--secondary"
                    }`}>
                    {cta.text}
                    <ArrowRight size={18} />
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => handleCTAClick(cta)}
                  className={`hero__cta ${
                    cta.primary ? "hero__cta--primary" : "hero__cta--secondary"
                  }`}>
                  {cta.text}
                  <Download size={18} />
                </button>
              );
            })}
          </motion.div>

          {/* Stats */}
          {data.stats && data.stats.length > 0 && (
            <motion.div
              className="hero__stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}>
              {data.stats.map((stat, index) => (
                <div key={index} className="hero__stat">
                  <div className="hero__statValue">{stat.value}</div>
                  <div className="hero__statLabel">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div
          className="hero__image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}>
          <img src={placeholder} alt="Profile" loading="eager" />
        </motion.div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ctas: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        link: PropTypes.string,
        action: PropTypes.string,
        primary: PropTypes.bool,
      })
    ).isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  }),
  onDownloadCV: PropTypes.func,
};

export default Hero;
