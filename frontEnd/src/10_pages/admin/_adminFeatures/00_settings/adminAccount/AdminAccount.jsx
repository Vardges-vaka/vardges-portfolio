import React from "react";
import PropTypes from "prop-types";
import isDebug from "./_adminAccount.config.js";
import { useAdminAccount } from "./02_adminAccount.hooks/_adminAccount.hooks.index.js";
// import {
//   IconGlobal,
//   ButtonGlobal,
//   InputGlobal,
//   SelectGlobal,
//   PasswordInput,
//   CheckboxGlobal,
// } from "../../../../../01_components/components.index.js";
import { AdminAccount_YYY } from "./01_adminAccount.comps/_adminAccount.comps.index.js";
import "./00_styles/adminAccount.css";

const AdminAccount = () => {
  return (
    <div className="AdminAccount">
      <h1>AdminAccount</h1>
    </div>
  );
};

AdminAccount.displayName = "AdminAccount";

export default AdminAccount;
