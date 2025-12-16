import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { getProfileContent } from "../../../../07_utils/_utils.index.js";

/**
 * CurrentFocusSection Component
 * Displays current focus and goals (simplified from Vision page)
 */
const CurrentFocusSection = ({ data, profile, variant = "full" }) => {
  if (!data) return null;

  const isShort = variant === "short";
  const focusContent = getProfileContent(data, profile);

  if (!focusContent) return null;

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
      className={`currentFocus ${
        isShort ? "currentFocus--short" : "currentFocus--full"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}>
      <h2 className="currentFocus__heading">{focusContent.title}</h2>
      <p className="currentFocus__description">{focusContent.description}</p>

      {focusContent.goals && focusContent.goals.length > 0 && (
        <ul className="currentFocus__goals">
          {focusContent.goals
            .slice(0, isShort ? 3 : focusContent.goals.length)
            .map((goal, index) => (
              <motion.li
                key={index}
                className="currentFocus__goal"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}>
                {goal}
              </motion.li>
            ))}
        </ul>
      )}
    </motion.section>
  );
};

CurrentFocusSection.propTypes = {
  data: PropTypes.object,
  profile: PropTypes.oneOf(["dev", "hospitality", "both"]).isRequired,
  variant: PropTypes.oneOf(["short", "full"]),
};

export default CurrentFocusSection;
