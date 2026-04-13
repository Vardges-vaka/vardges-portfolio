import React from "react";
import PropTypes from "prop-types";
// import { useAdminSignIn } from "../adminWelcomeHooks/_adminWelcomeHooks.index.js";

import {
  InputGlobal,
  PasswordInput,
  ButtonGlobal,
} from "../../../../01_components/components.index.js";
import { FieldMessage } from "../../../../01_components/stateComponents/_stateComponents.index.js";
import AdminForgotPassword from "./adminWelcomeChildComps/AdminForgotPassword.jsx";
import "./_styles/adminSignin.css";

const AdminSignin = ({ onSwitchToSignup, states, handlers, status, t }) => {
  // const { states, handlers, status, t } = useAdminSignIn();

  return (
    <div className="adminSignin__container">
      {states.showForgotPassword ? (
        <AdminForgotPassword
          onSubmit={handlers.handleForgotPassword_submit}
          onChange={handlers.handleForgotPswdEmail_change}
          onToggle={handlers.handleToggleForgotPassword}
          state={states.forgotPasswordEmail}
          status={status}
          t={t}
        />
      ) : (
        <form
          className="adminSignin adminSignin--slideIn"
          onSubmit={handlers.handleSignin_submit}>
          {/* Email Input */}
          <InputGlobal
            type="email"
            name="email"
            placeholder={t("email.placeholder")}
            value={states.adminSigninForm.email}
            onChange={handlers.handleSignin_change}
            withLabel={true}
            labelProps={{
              title: t("email.label"),
              message: t("email.message"),
            }}
            withLeftIcon={true}
            leftIconProps={{
              isActive: true,
              type: "lucide",
              lucid: "Mail",
            }}
            withMessage={false}
            disabled={status.isLoading}
          />

          <PasswordInput
            type="signIn"
            currentPassword={states.adminSigninForm.password}
            currentPasswordName="password"
            onPasswordChange={handlers.handleSignin_change}
            currentVisible={states.passwordVisible}
            onCurrentVisibleToggle={handlers.handlePasswordVisibility_toggle}
            disabled={status.isLoading}
          />

          <div className="adminSignin__optionsRow">
            <div className="adminSignin__checkbox">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={states.adminSigninForm.rememberMe}
                  onChange={handlers.handleCheckbox_change}
                  disabled={status.isLoading}
                />
                <span>{t("rememberMe.label")}</span>
              </label>
            </div>

            <button
              type="button"
              className="adminSignin__forgotLink"
              onClick={handlers.handleToggleForgotPassword}
              disabled={status.isLoading}>
              {t("forgotPassword.label")}
            </button>
          </div>

          {status.error && (
            <FieldMessage
              isActive={true}
              type="error"
              message={status.error}
              className="adminSignin__message"
            />
          )}

          {status.success && (
            <FieldMessage
              isActive={true}
              type="success"
              message={status.success}
              className="adminSignin__message"
            />
          )}

          <ButtonGlobal
            type="submit"
            isLoading={status.isLoading}
            disabled={status.isLoading}
            withIcon={true}
            leftIcon={{
              isActive: !status.isLoading,
              type: "lucide",
              lucid: "LogIn",
            }}>
            {status.isLoading ? t("signin.loading") : t("signin.button")}
          </ButtonGlobal>

          <div className="adminSignin__switchText">
            {t("signin.dontHaveAccount")}
            <span
              onClick={onSwitchToSignup}
              className="adminSignin__switchLink">
              {t("signup.button")}
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

AdminSignin.propTypes = {
  onSwitchToSignup: PropTypes.func,
};

export default AdminSignin;
