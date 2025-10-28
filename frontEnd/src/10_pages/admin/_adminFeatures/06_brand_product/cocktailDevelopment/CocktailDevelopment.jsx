import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_cocktailDevelopment.config.js";
import { useCocktailDevelopment } from "./02_cocktailDevelopment.hooks/_cocktailDevelopment.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { CocktailDevelopment_YYY } from "./01_cocktailDevelopment.comps/_cocktailDevelopment.comps.index.js";
import "./00_styles/cocktailDevelopment.css";

const CocktailDevelopment = () => {
  return (
    <div className="CocktailDevelopment">
      <h1>CocktailDevelopment</h1>
    </div>
  );
};

CocktailDevelopment.displayName = "CocktailDevelopment";

export default CocktailDevelopment;
