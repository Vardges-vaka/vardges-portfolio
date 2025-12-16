import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import CertificationCard from "./CertificationCard.jsx";

/**
 * CategorySection Component
 * Displays a category with its certifications
 */
const CategorySection = ({ category }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.section
      className="categorySection"
      variants={sectionVariants}
      initial="hidden"
      animate="visible">
      <header className="categorySection__header">
        <h2 className="categorySection__title">{category.title}</h2>
        {category.description && (
          <p className="categorySection__description">{category.description}</p>
        )}
      </header>

      <div className="categorySection__certifications">
        {category.certifications.map((certification, index) => (
          <CertificationCard
            key={certification.id}
            certification={certification}
            index={index}
          />
        ))}
      </div>

      {category.focus && (
        <div className="categorySection__focus">
          <p>{category.focus}</p>
        </div>
      )}
    </motion.section>
  );
};

CategorySection.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    certifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    focus: PropTypes.string,
  }).isRequired,
};

export default CategorySection;

