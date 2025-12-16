import React from "react";
import { motion } from "framer-motion";
import { Code, TrendingUp, Briefcase, Users } from "lucide-react";
import PropTypes from "prop-types";
import {
  getCategoryDisplayName,
  getTotalSkillsCount,
} from "../skillsHelpers/_skillsHelpers.index.js";

/**
 * SkillsNav Component
 * Tab navigation for skill categories
 */
const SkillsNav = ({ categories, activeCategory, onCategoryChange }) => {
  const iconMap = {
    technical: Code,
    marketing: TrendingUp,
    business: Briefcase,
    soft: Users,
  };

  return (
    <nav className="skillsNav" role="tablist">
      <div className="skillsNav__tabs">
        {Object.keys(categories).map((categoryKey) => {
          const category = categories[categoryKey];
          const isActive = categoryKey === activeCategory;
          const displayName = getCategoryDisplayName(categoryKey);
          const IconComponent = iconMap[categoryKey] || Code;
          const skillsCount = getTotalSkillsCount(category);

          return (
            <motion.button
              key={categoryKey}
              className={`skillsNav__tab ${
                isActive ? "skillsNav__tab--active" : ""
              }`}
              onClick={() => onCategoryChange(categoryKey)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`skills-panel-${categoryKey}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              <IconComponent size={20} className="skillsNav__icon" />
              <div className="skillsNav__tabContent">
                <span className="skillsNav__tabTitle">{displayName}</span>
                <span className="skillsNav__tabCount">
                  {skillsCount} {skillsCount === 1 ? "skill" : "skills"}
                </span>
              </div>
              {isActive && (
                <motion.div
                  className="skillsNav__activeIndicator"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

SkillsNav.propTypes = {
  categories: PropTypes.object.isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default SkillsNav;

