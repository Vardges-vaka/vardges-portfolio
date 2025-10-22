import React from "react";
// import { useAdminSignin } from "../adminWelcomeHooks/useAdminSignIn/useAdminSignIn";
import {
  InputGlobal,
  PasswordInput,
} from "../../../../01_components/components.index";
import "./_styles/adminSignin.css";

const AdminSignin = () => {
  // const { states, setters, handlers } = useAdminSignin();
  return (
    <form className="AdminSignup_form">
      {/* <InputGlobal
        type="email"
        placeholder="Email"
        name="email"
        onChange={handlers.handleSignin_change}
        value={states.adminSigninForm.email}
        withLabel={true}
        labelProps={{
          title: "Email",
          message: "Email",
        }}
        withLeftIcon={true}
        leftIconProps={{
          isActive: true,
          type: "lucide",
          lucid: "Mail",
        }}
        withMessage={true}
        messageProps={{
          withErrorMessage: false,
          errorMessage: "",
        }}
      />
      <PasswordInput
        type="signIn"
        placeholder="Password"
        value={states.adminSigninForm.password}
        name="password"
        onChange={handlers.handleSignin_change}
      /> */}
    </form>
  );
};

export default AdminSignin;
