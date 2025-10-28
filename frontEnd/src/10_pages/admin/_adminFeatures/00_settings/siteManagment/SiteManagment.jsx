import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_siteManagment.config.js";
import { useSiteManagment } from "./02_siteManagment.hooks/_siteManagment.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { SiteManagment_YYY } from "./01_siteManagment.comps/_siteManagment.comps.index.js";
import "./00_styles/siteManagment.css";

const SiteManagment = () => {
  return (
    <div className="SiteManagment">
      <h1>SiteManagment</h1>
    </div>
  );
};

SiteManagment.displayName = "SiteManagment";

export default SiteManagment;
