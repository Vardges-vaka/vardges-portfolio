import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_adminSettings.config.js";
import { useAdminSettings } from "./02_adminSettings.hooks/_adminSettings.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { AdminSettings_YYY } from "./01_adminSettings.comps/_adminSettings.comps.index.js";
import "./00_styles/adminSettings.css";

const AdminSettings = () => {
  return (
    <div className="AdminSettings">
      <h1>AdminSettings</h1>
    </div>
  );
};

AdminSettings.displayName = "AdminSettings";

export default AdminSettings;
