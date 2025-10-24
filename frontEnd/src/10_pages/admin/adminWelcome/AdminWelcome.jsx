import React from "react";
import {
  AdminSignup,
  AdminSignin,
} from "./adminWelcomeComps/_adminWelcomeComps.index";
import { useAdminWelcome } from "./adminWelcomeHooks/useAdminWelcome.js";
import "./_styles/adminWelcome.css";

const AdminWelcome = () => {
  const { state, handler, signIn_props,signUp_props } = useAdminWelcome();

  return (
    <div className="AdminWelcome">
      {/* Form container */}
      <div className="AdminWelcome_form" key={state}>
        {state === "signin" && (
          <AdminSignin
            key="signin-form"
            onSwitchToSignup={() =>
              handler({
                currentTarget: { dataset: { value: "signup" } },
              })
            }
            {...signIn_props}
          />
        )}
        {state === "signup" && (
          <AdminSignup
            key="signup-form"
            onSwitchToSignin={() =>
              handler({
                currentTarget: { dataset: { value: "signin" } },
              })
            }
            {...signUp_props}
          />
        )}
      </div>
    </div>
  );
};

export default AdminWelcome;
