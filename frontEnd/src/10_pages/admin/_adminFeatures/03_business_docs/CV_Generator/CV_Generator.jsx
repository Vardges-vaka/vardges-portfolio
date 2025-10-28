import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_cV_Generator.config.js";
import { useCV_Generator } from "./02_cV_Generator.hooks/_cV_Generator.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { CV_Generator_YYY } from "./01_cV_Generator.comps/_cV_Generator.comps.index.js";
import "./00_styles/cV_Generator.css";

const CV_Generator = () => {
  return (
    <div className="CV_Generator">
      <h1>CV_Generator</h1>
    </div>
  );
};

CV_Generator.displayName = "CV_Generator";

export default CV_Generator;
