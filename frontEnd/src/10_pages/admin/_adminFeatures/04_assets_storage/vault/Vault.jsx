import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_vault.config.js";
import { useVault } from "./02_vault.hooks/_vault.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { Vault_YYY } from "./01_vault.comps/_vault.comps.index.js";
import "./00_styles/vault.css";

const Vault = () => {
  return (
    <div className="Vault">
      <h1>Vault</h1>
    </div>
  );
};

Vault.displayName = "Vault";

export default Vault;
