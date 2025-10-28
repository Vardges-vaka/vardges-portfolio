import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_wordCounter.config.js";
import { useWordCounter } from "./02_wordCounter.hooks/_wordCounter.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { WordCounter_YYY } from "./01_wordCounter.comps/_wordCounter.comps.index.js";
import "./00_styles/wordCounter.css";

const WordCounter = () => {
  return (
    <div className="WordCounter">
      <h1>WordCounter</h1>
    </div>
  );
};

WordCounter.displayName = "WordCounter";

export default WordCounter;
