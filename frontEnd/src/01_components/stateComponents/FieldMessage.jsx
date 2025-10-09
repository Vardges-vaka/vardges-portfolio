import React from "react";
import PropTypes from "prop-types";
import { IconGlobal } from "../components.index.js";
import "../_styles/fieldMessage.css";

const FieldMessage = ({ isActive = false, className = "", message, type }) => {
  console.log("isActive", isActive);
  if (!isActive) {
    return null;
  }
  const FieldMessage_classname = `FieldMessage ${type ? type : ""} ${
    className ? className : ""
  } `;

  return <div className={FieldMessage_classname}>{message}</div>;
};

FieldMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(["hint", "error", "success", "warning"]).isRequired,
  withIcon: PropTypes.bool,
  iconProps: PropTypes.object,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  version: PropTypes.oneOf(["normal", "primary", "secondary", "light", "dark"]),
};

FieldMessage.displayName = "FieldMessage";

export default FieldMessage;
