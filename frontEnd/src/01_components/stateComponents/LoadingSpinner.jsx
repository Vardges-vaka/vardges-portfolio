import React from "react";
import PropTypes from "prop-types";
import "../_styles/loadingSpinner.css";

const LoadingSpinner = ({ className = "", isActive = false, version = "primary" }) => {
  if (!isActive) {
    return null;
  }
  const spinner_classname = `LoadingSpinner ${version !== "primary" ? version : ""} ${
    className ? className : ""
  }`;

  return <div className={spinner_classname}></div>;
};

LoadingSpinner.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  version: PropTypes.oneOf(["normal", "primary", "secondary", "light", "dark"]),
};

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
