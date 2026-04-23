import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { getProficiencyDisplay } from "../skillsHelpers/_skillsHelpers.index.js";

/**
 * ProficiencyIndicator Component
 * Visual representation of skill proficiency level
 */
const ProficiencyIndicator = ({ level, showLabel = true }) => {
  const { t } = useTranslation("tempContent");
  const proficiency = getProficiencyDisplay(level);
  const label = t(`ui.skills.proficiency.${level}`, {
    defaultValue: proficiency.label,
  });

  return (
    <div className="proficiencyIndicator">
      <div className="proficiencyIndicator__bar">
        <div
          className={`proficiencyIndicator__fill ${proficiency.color}`}
          style={{ width: `${proficiency.percentage}%` }}
          aria-label={`${label} - ${proficiency.percentage}%`}
        />
      </div>
      {showLabel && (
        <span className="proficiencyIndicator__label">{label}</span>
      )}
    </div>
  );
};

ProficiencyIndicator.propTypes = {
  level: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
};

export default ProficiencyIndicator;

