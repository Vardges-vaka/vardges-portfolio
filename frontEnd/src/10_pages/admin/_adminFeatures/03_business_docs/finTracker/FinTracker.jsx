import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_finTracker.config.js";
import { useFinTracker } from "./02_finTracker.hooks/_finTracker.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { FinTracker_YYY } from "./01_finTracker.comps/_finTracker.comps.index.js";
import "./00_styles/finTracker.css";

const FinTracker = () => {
  return (
    <div className="FinTracker">
      <h1>FinTracker</h1>
    </div>
  );
};

FinTracker.displayName = "FinTracker";

export default FinTracker;
