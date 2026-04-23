import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_ai.config.js";
import { useAi } from "./02_ai.hooks/_ai.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { Ai_YYY } from "./01_ai.comps/_ai.comps.index.js";
import "./00_styles/ai.css";

const Ai = () => {
  return (
    <div className="Ai">
      <h1>AI Set As default section</h1>
    </div>
  );
};

Ai.displayName = "Ai";

export default Ai;
