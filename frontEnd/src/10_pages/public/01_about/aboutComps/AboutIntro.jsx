import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { placeholder } from "../../../../00_assets/_assets.index.js";
import { getProfileContent } from "../../../../07_utils/_utils.index.js";

/**
 * AboutIntro Component
 * Displays the introduction section with profile-specific content
 */
const AboutIntro = ({ data, profile, variant = "full" }) => {
  if (!data) return null;

  const isShort = variant === "short";
  const introContent = getProfileContent(data, profile);

  if (!introContent) return null;

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
      className={`aboutIntro ${
        isShort ? "aboutIntro--short" : "aboutIntro--full"
      }`}
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}>
      <div className="aboutIntro__content">
        <div className="aboutIntro__text">
          <h2 className="aboutIntro__title">{introContent.title}</h2>
          <p className="aboutIntro__description">
            {isShort && introContent.description.length > 200
              ? `${introContent.description.substring(0, 200)}...`
              : introContent.description}
          </p>

          {introContent.highlights && introContent.highlights.length > 0 && (
            <ul className="aboutIntro__highlights">
              {introContent.highlights
                .slice(0, isShort ? 3 : introContent.highlights.length)
                .map((highlight, index) => (
                  <motion.li
                    key={index}
                    className="aboutIntro__highlight"
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
          <div className="aboutIntro__image">
            <img src={placeholder} alt="Profile" loading="lazy" />
          </div>
        )}
      </div>
    </motion.section>
  );
};

AboutIntro.propTypes = {
  data: PropTypes.object,
  profile: PropTypes.oneOf(["dev", "hospitality", "both"]).isRequired,
  variant: PropTypes.oneOf(["short", "full"]),
};

export default AboutIntro;
