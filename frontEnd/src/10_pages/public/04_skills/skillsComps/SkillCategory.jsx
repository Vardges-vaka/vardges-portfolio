import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import SubcategorySection from "./SubcategorySection.jsx";
import { getSortedSubcategories } from "../skillsHelpers/_skillsHelpers.index.js";

/**
 * SkillCategory Component
 * Displays the active category with its subcategories
 */
const SkillCategory = ({ category, categoryKey }) => {
  const { t } = useTranslation("tempContent");

  const categoryVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 },
    },
  };

  if (!category || !category.subcategories) {
    return (
      <div className="skillCategory__empty">
        <p>{t("ui.empty.skillCategory")}</p>
      </div>
    );
  }

  const sortedSubcategories = getSortedSubcategories(
    category.subcategories,
    categoryKey
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categoryKey}
        className="skillCategory"
        variants={categoryVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="tabpanel"
        id={`skills-panel-${categoryKey}`}>
        <header className="skillCategory__header">
          <h2 className="skillCategory__title">{category.title}</h2>
        </header>

        <div className="skillCategory__content">
          {sortedSubcategories.map(([subcategoryKey, subcategory]) => (
            <SubcategorySection
              key={subcategoryKey}
              subcategory={subcategory}
              subcategoryKey={subcategoryKey}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

SkillCategory.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subcategories: PropTypes.object.isRequired,
  }),
  categoryKey: PropTypes.string.isRequired,
};

export default SkillCategory;

