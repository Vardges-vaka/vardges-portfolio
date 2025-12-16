import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import SkillCard from "./SkillCard.jsx";

/**
 * SubcategorySection Component
 * Displays a subcategory with its skills
 */
const SubcategorySection = ({ subcategory, subcategoryKey }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.section
      className="subcategorySection"
      variants={sectionVariants}
      initial="hidden"
      animate="visible">
      <div className="subcategorySection__header">
        <h3 className="subcategorySection__title">{subcategory.title}</h3>
        {subcategory.description && (
          <p className="subcategorySection__description">
            {subcategory.description}
          </p>
        )}
      </div>

      {subcategory.skills && subcategory.skills.length > 0 && (
        <div className="subcategorySection__skills">
          {subcategory.skills.map((skill, index) => (
            <SkillCard key={`${subcategoryKey}-${index}`} skill={skill} index={index} />
          ))}
        </div>
      )}

      {subcategory.supportingTools && subcategory.supportingTools.length > 0 && (
        <div className="subcategorySection__supportingTools">
          <h4 className="subcategorySection__supportingToolsTitle">
            Supporting Tools
          </h4>
          <ul className="subcategorySection__toolsList">
            {subcategory.supportingTools.map((tool, index) => (
              <li key={index} className="subcategorySection__toolItem">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      )}

      {subcategory.approach && (
        <div className="subcategorySection__approach">
          <h4 className="subcategorySection__approachTitle">Approach</h4>
          <p className="subcategorySection__approachText">
            {subcategory.approach}
          </p>
        </div>
      )}
    </motion.section>
  );
};

SubcategorySection.propTypes = {
  subcategory: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.object),
    supportingTools: PropTypes.arrayOf(PropTypes.string),
    approach: PropTypes.string,
  }).isRequired,
  subcategoryKey: PropTypes.string.isRequired,
};

export default SubcategorySection;

