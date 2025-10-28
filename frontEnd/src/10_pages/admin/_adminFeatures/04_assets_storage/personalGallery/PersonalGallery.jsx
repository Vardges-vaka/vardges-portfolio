import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_personalGallery.config.js";
import { usePersonalGallery } from "./02_personalGallery.hooks/_personalGallery.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { PersonalGallery_YYY } from "./01_personalGallery.comps/_personalGallery.comps.index.js";
import "./00_styles/personalGallery.css";

const PersonalGallery = () => {
  return (
    <div className="PersonalGallery">
      <h1>PersonalGallery</h1>
    </div>
  );
};

PersonalGallery.displayName = "PersonalGallery";

export default PersonalGallery;
