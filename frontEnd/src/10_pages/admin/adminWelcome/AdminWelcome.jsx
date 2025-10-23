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
      {/* Form container */}
      <div className="AdminWelcome_form" key={states.activeForm}>
        {states.activeForm === "signin" && (
          <AdminSignin
            key="signin-form"
            onSwitchToSignup={() =>
              handlers.handleActiveForm({
                currentTarget: { dataset: { value: "signup" } },
              })
            }
          />
        )}
        {states.activeForm === "signup" && (
          <AdminSignup
            key="signup-form"
            onSwitchToSignin={() =>
              handlers.handleActiveForm({
                currentTarget: { dataset: { value: "signin" } },
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default AdminWelcome;
