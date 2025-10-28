import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_pswManager.config.js";
import { usePswManager } from "./02_pswManager.hooks/_pswManager.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { PswManager_YYY } from "./01_pswManager.comps/_pswManager.comps.index.js";
import "./00_styles/pswManager.css";

const PswManager = () => {
  return (
    <div className="PswManager">
      <h1>PswManager</h1>
    </div>
  );
};

PswManager.displayName = "PswManager";

export default PswManager;
