import React from "react";
import PropTypes from "prop-types";
import { useAdminSignup } from "../adminWelcomeHooks/useAdminSignup.js";
import {
  InputGlobal,
  PasswordInput,
  ButtonGlobal,
} from "../../../../01_components/components.index.js";
import { FieldMessage } from "../../../../01_components/stateComponents/_stateComponents.index.js";
import "./_styles/adminSIgnup.css";

const AdminSignup = ({ onSwitchToSignin }) => {
  const { states, handlers } = useAdminSignup();

  return (
    <form className="adminSignup" onSubmit={handlers.handleSignup_submit}>
      {/* Name Input */}
      <InputGlobal
        type="text"
        name="name"
        placeholder="Enter your name"
        value={states.adminSignupForm.name}
        onChange={handlers.handleSignup_change}
        withLabel={true}
        labelProps={{
          title: "Name",
          message: "Name",
        }}
        withLeftIcon={true}
        leftIconProps={{
          isActive: true,
          type: "lucide",
          lucid: "User",
        }}
        withMessage={false}
        disabled={states.isLoading}
      />

      {/* Email Input */}
      <InputGlobal
        type="email"
        name="email"
        placeholder="Enter your email"
        value={states.adminSignupForm.email}
        onChange={handlers.handleSignup_change}
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
        withMessage={false}
        disabled={states.isLoading}
      />

      {/* Access Code Input */}
      <InputGlobal
        type="text"
        name="key"
        placeholder="Enter access code"
        value={states.adminSignupForm.key}
        onChange={handlers.handleSignup_change}
        withLabel={true}
        labelProps={{
          title: "Access Code",
          message: "Access Code",
        }}
        withLeftIcon={true}
        leftIconProps={{
          isActive: true,
          type: "lucide",
          lucid: "Key",
        }}
        withMessage={false}
        disabled={states.isLoading}
      />

      {/* Password Inputs */}
      <PasswordInput
        type="signUp"
        newPassword={states.adminSignupForm.password}
        confirmPassword={states.adminSignupForm.confirmPassword}
        newPasswordName="password"
        confirmPasswordName="confirmPassword"
        onNewChange={handlers.handleSignup_change}
        onConfirmChange={handlers.handleSignup_change}
        newVisible={states.passwordVisible.new}
        confirmVisible={states.passwordVisible.confirm}
        onNewVisibleToggle={() =>
          handlers.handlePasswordVisibility_toggle("new")
        }
        onConfirmVisibleToggle={() =>
          handlers.handlePasswordVisibility_toggle("confirm")
        }
        showValidation={true}
        disabled={states.isLoading}
      />

      {/* Remember Me Checkbox */}
      <div className="adminSignup__checkbox">
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={states.adminSignupForm.rememberMe}
            onChange={handlers.handleCheckbox_change}
            disabled={states.isLoading}
          />
          <span>Remember Me (100 days)</span>
        </label>
      </div>

      {/* Error Message */}
      {states.error && (
        <FieldMessage
          isActive={true}
          type="error"
          message={states.error}
          className="adminSignup__message"
        />
      )}

      {/* Success Message */}
      {states.success && (
        <FieldMessage
          isActive={true}
          type="success"
          message={states.success}
          className="adminSignup__message"
        />
      )}

      {/* Submit Button */}
      <ButtonGlobal
        type="submit"
        isLoading={states.isLoading}
        disabled={states.isLoading}
        withIcon={true}
        leftIcon={{
          isActive: !states.isLoading,
          type: "lucide",
          lucid: "UserPlus",
        }}>
        {states.isLoading ? "Signing up..." : "Sign Up"}
      </ButtonGlobal>

      {/* Switch to Sign In */}
      <div className="adminSignup__switchText">
        Already have an account?{" "}
        <span onClick={onSwitchToSignin} className="adminSignup__switchLink">
          Sign In
        </span>
      </div>
    </form>
  );
};

AdminSignup.propTypes = {
  onSwitchToSignin: PropTypes.func,
};

export default AdminSignup;
