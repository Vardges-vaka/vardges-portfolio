import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_mapTools.config.js";
import { useMapTools } from "./02_mapTools.hooks/_mapTools.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { MapTools_YYY } from "./01_mapTools.comps/_mapTools.comps.index.js";
import "./00_styles/mapTools.css";

const MapTools = () => {
  return (
    <div className="MapTools">
      <h1>MapTools</h1>
    </div>
  );
};

MapTools.displayName = "MapTools";

export default MapTools;
