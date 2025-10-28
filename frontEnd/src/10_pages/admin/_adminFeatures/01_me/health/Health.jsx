import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_health.config.js";
import { useHealth } from "./02_health.hooks/_health.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { Health_YYY } from "./01_health.comps/_health.comps.index.js";
import "./00_styles/health.css";

const Health = () => {
  return (
    <div className="Health">
      <h1>Health</h1>
    </div>
  );
};

Health.displayName = "Health";

export default Health;
