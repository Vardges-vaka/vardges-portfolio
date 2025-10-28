import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_serverSettings.config.js";
import { useServerSettings } from "./02_serverSettings.hooks/_serverSettings.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { ServerSettings_YYY } from "./01_serverSettings.comps/_serverSettings.comps.index.js";
import "./00_styles/serverSettings.css";

const ServerSettings = () => {
  return (
    <div className="ServerSettings">
      <h1>ServerSettings</h1>
    </div>
  );
};

ServerSettings.displayName = "ServerSettings";

export default ServerSettings;
