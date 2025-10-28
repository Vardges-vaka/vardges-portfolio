import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_brandPortfolio.config.js";
import { useBrandPortfolio } from "./02_brandPortfolio.hooks/_brandPortfolio.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { BrandPortfolio_YYY } from "./01_brandPortfolio.comps/_brandPortfolio.comps.index.js";
import "./00_styles/brandPortfolio.css";

const BrandPortfolio = () => {
  return (
    <div className="BrandPortfolio">
      <h1>BrandPortfolio</h1>
    </div>
  );
};

BrandPortfolio.displayName = "BrandPortfolio";

export default BrandPortfolio;
