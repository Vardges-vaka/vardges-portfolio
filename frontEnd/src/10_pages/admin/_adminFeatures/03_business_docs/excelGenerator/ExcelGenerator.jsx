import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_excelGenerator.config.js";
import { useExcelGenerator } from "./02_excelGenerator.hooks/_excelGenerator.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { ExcelGenerator_YYY } from "./01_excelGenerator.comps/_excelGenerator.comps.index.js";
import "./00_styles/excelGenerator.css";

const ExcelGenerator = () => {
  return (
    <div className="ExcelGenerator">
      <h1>ExcelGenerator</h1>
    </div>
  );
};

ExcelGenerator.displayName = "ExcelGenerator";

export default ExcelGenerator;
