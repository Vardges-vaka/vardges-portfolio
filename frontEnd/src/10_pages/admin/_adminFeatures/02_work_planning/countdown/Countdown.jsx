import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_countdown.config.js";
import { useCountdown } from "./02_countdown.hooks/_countdown.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { Countdown_YYY } from "./01_countdown.comps/_countdown.comps.index.js";
import "./00_styles/countdown.css";

const Countdown = () => {
  return (
    <div className="Countdown">
      <h1>Countdown</h1>
    </div>
  );
};

Countdown.displayName = "Countdown";

export default Countdown;
