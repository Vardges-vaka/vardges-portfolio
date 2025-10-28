import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_emailTools.config.js";
import { useEmailTools } from "./02_emailTools.hooks/_emailTools.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { EmailTools_YYY } from "./01_emailTools.comps/_emailTools.comps.index.js";
import "./00_styles/emailTools.css";

const EmailTools = () => {
  return (
    <div className="EmailTools">
      <h1>EmailTools</h1>
    </div>
  );
};

EmailTools.displayName = "EmailTools";

export default EmailTools;
