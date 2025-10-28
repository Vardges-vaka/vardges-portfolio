import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_PDF_image_Formatting.config.js";
import { usePDF_image_Formatting } from "./02_PDF_image_Formatting.hooks/_PDF_image_Formatting.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { PDF_image_Formatting_YYY } from "./01_PDF_image_Formatting.comps/_PDF_image_Formatting.comps.index.js";
import "./00_styles/PDF_image_Formatting.css";

const PDF_image_Formatting = () => {
  return (
    <div className="PDF_image_Formatting">
      <h1>PDF_image_Formatting</h1>
    </div>
  );
};

PDF_image_Formatting.displayName = "PDF_image_Formatting";

export default PDF_image_Formatting;
