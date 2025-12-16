import React from "react";
import PropTypes from "prop-types";
import { getProficiencyDisplay } from "../skillsHelpers/_skillsHelpers.index.js";

/**
 * ProficiencyIndicator Component
 * Visual representation of skill proficiency level
 */
const ProficiencyIndicator = ({ level, showLabel = true }) => {
  const proficiency = getProficiencyDisplay(level);

  return (
    <div className="proficiencyIndicator">
      <div className="proficiencyIndicator__bar">
        <div
          className={`proficiencyIndicator__fill ${proficiency.color}`}
          style={{ width: `${proficiency.percentage}%` }}
          aria-label={`${proficiency.label} - ${proficiency.percentage}%`}
        />
      </div>
      {showLabel && (
        <span className="proficiencyIndicator__label">{proficiency.label}</span>
      )}
    </div>
  );
};

ProficiencyIndicator.propTypes = {
  level: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
};

export default ProficiencyIndicator;

