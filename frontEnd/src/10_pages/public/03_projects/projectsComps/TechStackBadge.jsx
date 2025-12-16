import React from "react";
import PropTypes from "prop-types";
import { getTechStackColor } from "../projectsHelpers/_projectsHelpers.index.js";

/**
 * TechStackBadge Component
 * Displays individual technology badge
 */
const TechStackBadge = ({ tech, size = "medium" }) => {
  const colorClass = getTechStackColor(tech);

  return (
    <span className={`techStackBadge techStackBadge--${size} ${colorClass}`}>
      {tech}
    </span>
  );
};

TechStackBadge.propTypes = {
  tech: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default TechStackBadge;
