import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Wine, TrendingUp, Grid } from "lucide-react";
import PropTypes from "prop-types";
import { getCategoryDisplayName } from "../projectsHelpers/_projectsHelpers.index.js";

/**
 * ProjectCategoryFilter Component
 * Filter buttons for project categories
 */
const ProjectCategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const iconMap = {
    all: Grid,
    tech: Code,
    brands: Palette,
    bar: Wine,
    marketing: TrendingUp,
  };

  return (
    <div className="projectCategoryFilter">
      <h3 className="projectCategoryFilter__title">Filter by Category</h3>
      <div className="projectCategoryFilter__buttons">
        {categories.map((category) => {
          const isSelected = category === selectedCategory;
          const displayName = getCategoryDisplayName(category);
          const IconComponent = iconMap[category] || Grid;

          return (
            <motion.button
              key={category}
              className={`projectCategoryFilter__button ${
                isSelected ? "projectCategoryFilter__button--active" : ""
              }`}
              onClick={() => onCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <IconComponent size={18} />
              <span>{displayName}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

ProjectCategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default ProjectCategoryFilter;
