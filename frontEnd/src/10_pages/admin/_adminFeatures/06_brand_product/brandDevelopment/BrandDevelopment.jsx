import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_brandDevelopment.config.js";
import { useBrandDevelopment } from "./02_brandDevelopment.hooks/_brandDevelopment.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { BrandDevelopment_YYY } from "./01_brandDevelopment.comps/_brandDevelopment.comps.index.js";
import "./00_styles/brandDevelopment.css";

const BrandDevelopment = () => {
  return (
    <div className="BrandDevelopment">
      <h1>BrandDevelopment</h1>
    </div>
  );
};

BrandDevelopment.displayName = "BrandDevelopment";

export default BrandDevelopment;
