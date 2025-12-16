import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { placeholder } from "../../../../00_assets/_assets.index.js";

/**
 * BioIntro Component
 * Displays the introduction section with profile-specific content
 * Supports short and full variants
 */
const BioIntro = ({ data, profile, variant = "full" }) => {
  if (!data) return null;

  const isShort = variant === "short";

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      className={`bioIntro ${isShort ? "bioIntro--short" : "bioIntro--full"}`}
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}>
      <div className="bioIntro__content">
        <div className="bioIntro__text">
          <h2 className="bioIntro__title">{data.title}</h2>
          <p className="bioIntro__description">
            {isShort && data.description.length > 200
              ? `${data.description.substring(0, 200)}...`
              : data.description}
          </p>

          {data.highlights && data.highlights.length > 0 && (
            <ul className="bioIntro__highlights">
              {data.highlights
                .slice(0, isShort ? 3 : data.highlights.length)
                .map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="bioIntro__highlight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}>
                    {highlight}
                  </motion.li>
                ))}
            </ul>
          )}
        </div>

        {!isShort && (
          <div className="bioIntro__image">
            <img src={placeholder} alt="Profile" loading="lazy" />
          </div>
        )}
      </div>
    </motion.section>
  );
};

BioIntro.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string),
  }),
  profile: PropTypes.oneOf(["dev", "hospitality", "both"]).isRequired,
  variant: PropTypes.oneOf(["short", "full"]),
};

export default BioIntro;
