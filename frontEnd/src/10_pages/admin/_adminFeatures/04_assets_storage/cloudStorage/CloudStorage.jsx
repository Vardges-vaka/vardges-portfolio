import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_cloudStorage.config.js";
import { useCloudStorage } from "./02_cloudStorage.hooks/_cloudStorage.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { CloudStorage_YYY } from "./01_cloudStorage.comps/_cloudStorage.comps.index.js";
import "./00_styles/cloudStorage.css";

const CloudStorage = () => {
  return (
    <div className="CloudStorage">
      <h1>CloudStorage</h1>
    </div>
  );
};

CloudStorage.displayName = "CloudStorage";

export default CloudStorage;
