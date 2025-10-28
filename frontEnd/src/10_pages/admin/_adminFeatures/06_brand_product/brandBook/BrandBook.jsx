import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_brandBook.config.js";
import { useBrandBook } from "./02_brandBook.hooks/_brandBook.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { BrandBook_YYY } from "./01_brandBook.comps/_brandBook.comps.index.js";
import "./00_styles/brandBook.css";

const BrandBook = () => {
  return (
    <div className="BrandBook">
      <h1>BrandBook</h1>
    </div>
  );
};

BrandBook.displayName = "BrandBook";

export default BrandBook;
