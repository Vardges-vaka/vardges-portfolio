import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_menuDevelopment.config.js";
import { useMenuDevelopment } from "./02_menuDevelopment.hooks/_menuDevelopment.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { MenuDevelopment_YYY } from "./01_menuDevelopment.comps/_menuDevelopment.comps.index.js";
import "./00_styles/MenuDevelopment.css";

const MenuDevelopment = () => {
  return (
    <div className="MenuDevelopment">
      <h1>MenuDevelopment</h1>
    </div>
  );
};

MenuDevelopment.displayName = "MenuDevelopment";

export default MenuDevelopment;
