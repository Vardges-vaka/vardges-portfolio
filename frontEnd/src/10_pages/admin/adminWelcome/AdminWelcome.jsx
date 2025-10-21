import React from "react";
import {
  AdminSIgnup,
  AdminSIgnin,
} from "./adminWelcomeComps/_adminWelcomeComps.index";
import "./_styles/adminWelcome.css";
import { useAdminWelcome } from "./adminWelcomeHooks/_adminWelcomeHooks.index";

const AdminWelcome = () => {
  const { signup_props, signin_props, forgotPassword_props } =
    useAdminWelcome();
  return <div className="AdminWelcome">AdminWelcome</div>;
};

export default AdminWelcome;
