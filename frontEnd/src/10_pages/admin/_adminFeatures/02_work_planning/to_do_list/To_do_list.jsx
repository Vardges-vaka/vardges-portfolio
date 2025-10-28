import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_to_do_list.config.js";
import { useTo_do_list } from "./02_to_do_list.hooks/_to_do_list.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { To_do_list_YYY } from "./01_to_do_list.comps/_to_do_list.comps.index.js";
import "./00_styles/to_do_list.css";

const To_do_list = () => {
  return (
    <div className="To_do_list">
      <h1>To_do_list</h1>
    </div>
  );
};

To_do_list.displayName = "To_do_list";

export default To_do_list;
