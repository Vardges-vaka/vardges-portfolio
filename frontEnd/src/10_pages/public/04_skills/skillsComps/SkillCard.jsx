import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import PropTypes from "prop-types";
import ProficiencyIndicator from "./ProficiencyIndicator.jsx";
import { formatPlatforms } from "../skillsHelpers/_skillsHelpers.index.js";

/**
 * SkillCard Component
 * Displays individual skill with competencies
 */
const SkillCard = ({ skill, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.05 },
    },
  };

  return (
    <motion.article
      className="skillCard"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
      <div className="skillCard__header">
        <h4 className="skillCard__name">{skill.name}</h4>
        {skill.proficiency && (
          <ProficiencyIndicator level={skill.proficiency} showLabel={false} />
        )}
      </div>

      {skill.competencies && skill.competencies.length > 0 && (
        <ul className="skillCard__competencies">
          {skill.competencies.map((competency, idx) => (
            <li key={idx} className="skillCard__competency">
              <Check size={14} className="skillCard__checkIcon" />
              <span>{competency}</span>
            </li>
          ))}
        </ul>
      )}

      {skill.platforms && skill.platforms.length > 0 && (
        <div className="skillCard__platforms">
          <span className="skillCard__platformsLabel">Platforms:</span>
          <span className="skillCard__platformsList">
            {formatPlatforms(skill.platforms)}
          </span>
        </div>
      )}

      {skill.proficiency && (
        <div className="skillCard__proficiencyLabel">
          <ProficiencyIndicator level={skill.proficiency} showLabel={true} />
        </div>
      )}
    </motion.article>
  );
};

SkillCard.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    competencies: PropTypes.arrayOf(PropTypes.string),
    proficiency: PropTypes.string,
    platforms: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default SkillCard;

