import React from "react";
import PropTypes from "prop-types";
import { useAdminSignIn } from "../adminWelcomeHooks/useAdminSignIn/useAdminSignIn.js";
import {
  InputGlobal,
  PasswordInput,
  ButtonGlobal,
} from "../../../../01_components/components.index.js";
import { FieldMessage } from "../../../../01_components/stateComponents/_stateComponents.index.js";
import "./_styles/adminSignin.css";

const AdminSignin = ({ onSwitchToSignup }) => {
  const { states, handlers } = useAdminSignIn();

  return (
    <div className="adminSignin__container">
      {/* Sign In Form */}
      {!states.showForgotPassword && (
        <form
          className="adminSignin adminSignin--slideIn"
          onSubmit={handlers.handleSignin_submit}>
          {/* Email Input */}
          <InputGlobal
            type="email"
            name="email"
            placeholder="Enter your email"
            value={states.adminSigninForm.email}
            onChange={handlers.handleSignin_change}
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

          {/* Password Input */}
          <PasswordInput
            type="signIn"
            currentPassword={states.adminSigninForm.password}
            currentPasswordName="password"
            onPasswordChange={handlers.handleSignin_change}
            currentVisible={states.passwordVisible}
            onCurrentVisibleToggle={handlers.handlePasswordVisibility_toggle}
            disabled={states.isLoading}
          />

          {/* Remember Me & Forgot Password Row */}
          <div className="adminSignin__optionsRow">
            <div className="adminSignin__checkbox">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={states.adminSigninForm.rememberMe}
                  onChange={handlers.handleCheckbox_change}
                  disabled={states.isLoading}
                />
                <span>Remember Me (100 days)</span>
              </label>
            </div>

            <button
              type="button"
              className="adminSignin__forgotLink"
              onClick={handlers.handleToggleForgotPassword}
              disabled={states.isLoading}>
              Forgot Password?
            </button>
          </div>

          {/* Error Message */}
          {states.error && (
            <FieldMessage
              isActive={true}
              type="error"
              message={states.error}
              className="adminSignin__message"
            />
          )}

          {/* Success Message */}
          {states.success && (
            <FieldMessage
              isActive={true}
              type="success"
              message={states.success}
              className="adminSignin__message"
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
              lucid: "LogIn",
            }}>
            {states.isLoading ? "Signing in..." : "Sign In"}
          </ButtonGlobal>

          {/* Switch to Sign Up */}
          <div className="adminSignin__switchText">
            Don't have an account?{" "}
            <span
              onClick={onSwitchToSignup}
              className="adminSignin__switchLink">
              Sign Up
            </span>
          </div>
        </form>
      )}

      {/* Forgot Password Form */}
      {states.showForgotPassword && (
        <form
          className="adminSignin adminSignin--slideIn adminSignin--forgotPassword"
          onSubmit={handlers.handleForgotPassword_submit}>
          {/* Back Button */}
          <button
            type="button"
            className="adminSignin__backButton"
            onClick={handlers.handleToggleForgotPassword}
            disabled={states.isLoading}>
            <span className="adminSignin__backIcon">←</span>
            <span>Back to Sign In</span>
          </button>

          {/* Title */}
          <div className="adminSignin__forgotTitle">
            <h3>Reset Password</h3>
            <p>
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {/* Email Input */}
          <InputGlobal
            type="email"
            name="forgotPasswordEmail"
            placeholder="Enter your email"
            value={states.forgotPasswordEmail}
            onChange={handlers.handleForgotPasswordEmail_change}
            withLabel={true}
            labelProps={{
              title: "Email Address",
              message: "Email Address",
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

          {/* Error Message */}
          {states.error && (
            <FieldMessage
              isActive={true}
              type="error"
              message={states.error}
              className="adminSignin__message"
            />
          )}

          {/* Success Message */}
          {states.success && (
            <FieldMessage
              isActive={true}
              type="success"
              message={states.success}
              className="adminSignin__message"
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
              lucid: "Send",
            }}>
            {states.isLoading ? "Sending..." : "Send Reset Link"}
          </ButtonGlobal>
        </form>
      )}
    </div>
  );
};

AdminSignin.propTypes = {
  onSwitchToSignup: PropTypes.func,
};

export default AdminSignin;
