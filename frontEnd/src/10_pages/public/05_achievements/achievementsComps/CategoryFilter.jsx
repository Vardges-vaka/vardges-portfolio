import React from "react";
import { motion } from "framer-motion";
import { Grid, Wine, Code, TrendingUp, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * CategoryFilter Component
 * Filter buttons for achievement categories
 */
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const { t } = useTranslation("tempContent");

  const iconMap = {
    hospitality: Wine,
    technology: Code,
    marketing: TrendingUp,
    leadership: Users,
  };

  const allCategories = [
    { id: "all", title: t("ui.common.allCategories") },
    ...categories,
  ];

  return (
    <div className="categoryFilter">
      <h3 className="categoryFilter__title">
        {t("ui.common.filterByCategory")}
      </h3>
      <div className="categoryFilter__buttons">
        {allCategories.map((category) => {
          const isActive =
            (category.id === "all" && !activeCategory) ||
            category.id === activeCategory;
          const IconComponent =
            category.id === "all" ? Grid : iconMap[category.id] || Grid;

          return (
            <motion.button
              key={category.id}
              className={`categoryFilter__button ${
                isActive ? "categoryFilter__button--active" : ""
              }`}
              onClick={() => onCategoryChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <IconComponent size={18} />
              <span>{category.title}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeCategory: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter;

