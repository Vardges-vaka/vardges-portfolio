import React from "react";
import {
  AdminSignup,
  AdminSignin,
} from "./adminWelcomeComps/_adminWelcomeComps.index";
import "./_styles/adminWelcome.css";
import { useAdminWelcome } from "./adminWelcomeHooks/useAdminWelcome.js";

const AdminWelcome = () => {
  const { states, handlers } = useAdminWelcome();
  return (
    <div className="AdminWelcome">
      <button data-value="signin" onClick={handlers.handleActiveForm}>
        Signin
      </button>
      <button data-value="signup" onClick={handlers.handleActiveForm}>
        Signup
      </button>
      <div className="AdminWelcome_form">
        {states.activeForm === "signin" && <AdminSignin />}
        {states.activeForm === "signup" && <AdminSignup />}
      </div>
    </div>
  );
};

export default AdminWelcome;
