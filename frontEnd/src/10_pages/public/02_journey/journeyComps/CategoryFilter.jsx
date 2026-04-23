import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * CategoryFilter Component
 * Buttons to filter roles by category
 */
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const { t } = useTranslation('tempContent');

  return (
    <div className="categoryFilter">
      <h3 className="categoryFilter__title">
        {t('ui.common.filterByCategory')}
      </h3>
      <div className="categoryFilter__buttons">
        {categories.map((category) => {
          const isSelected = category === selectedCategory;
          const label = t(`ui.journey.categories.${category}`, {
            defaultValue: category,
          });
          
          return (
            <motion.button
              key={category}
              className={`categoryFilter__button ${isSelected ? 'categoryFilter__button--active' : ''}`}
              onClick={() => onCategoryChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

export default CategoryFilter;

