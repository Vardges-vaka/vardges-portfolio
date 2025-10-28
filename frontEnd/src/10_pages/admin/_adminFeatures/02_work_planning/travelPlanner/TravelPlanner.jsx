import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_travelPlanner.config.js";
import { useTravelPlanner } from "./02_travelPlanner.hooks/_travelPlanner.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { TravelPlanner_YYY } from "./01_travelPlanner.comps/_travelPlanner.comps.index.js";
import "./00_styles/travelPlanner.css";

const TravelPlanner = () => {
  return (
    <div className="TravelPlanner">
      <h1>TravelPlanner</h1>
    </div>
  );
};

TravelPlanner.displayName = "TravelPlanner";

export default TravelPlanner;
