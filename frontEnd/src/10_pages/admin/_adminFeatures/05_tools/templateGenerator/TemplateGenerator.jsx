import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_templateGenerator.config.js";
import { useTemplateGenerator } from "./02_templateGenerator.hooks/_templateGenerator.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { TemplateGenerator_YYY } from "./01_templateGenerator.comps/_templateGenerator.comps.index.js";
import "./00_styles/templateGenerator.css";

const TemplateGenerator = () => {
  return (
    <div className="TemplateGenerator">
      <h1>TemplateGenerator</h1>
    </div>
  );
};

TemplateGenerator.displayName = "TemplateGenerator";

export default TemplateGenerator;
