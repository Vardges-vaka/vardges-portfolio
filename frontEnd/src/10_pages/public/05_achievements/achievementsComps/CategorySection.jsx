import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import AchievementCard from "./AchievementCard.jsx";
import { getCategoryColor } from "../achievementsHelpers/_achievementsHelpers.index.js";

/**
 * CategorySection Component
 * Displays a category with its achievements
 */
const CategorySection = ({ category, onAchievementClick }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const colorClass = getCategoryColor(category.id);

  return (
    <motion.section
      className={`categorySection ${colorClass}`}
      variants={sectionVariants}
      initial="hidden"
      animate="visible">
      <header className="categorySection__header">
        <h2 className="categorySection__title">{category.title}</h2>
        {category.intro && (
          <p className="categorySection__intro">{category.intro}</p>
        )}
      </header>

      <div className="categorySection__achievements">
        {category.achievements.map((achievement, index) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onClick={onAchievementClick}
            index={index}
          />
        ))}
      </div>

      {category.summary && (
        <div className="categorySection__summary">
          <p>{category.summary}</p>
        </div>
      )}
    </motion.section>
  );
};

CategorySection.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    intro: PropTypes.string,
    achievements: PropTypes.arrayOf(PropTypes.object).isRequired,
    summary: PropTypes.string,
  }).isRequired,
  onAchievementClick: PropTypes.func,
};

export default CategorySection;

