import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAdminResetPassword } from "./adminResetPasswordHooks/useAdminResetPassword.js";
import {
  PasswordInput,
  ButtonGlobal,
} from "../../../01_components/components.index.js";
import {
  FieldMessage,
  LoadingSpinner,
} from "../../../01_components/stateComponents/_stateComponents.index.js";
import "./_styles/adminResetPassword.css";

const AdminResetPassword = () => {
  const { token } = useParams();
  const { states, handlers } = useAdminResetPassword(token);

  // Loading/Validating state
  if (states.isValidating) {
    return (
      <div className="adminResetPassword">
        <div className="adminResetPassword__form">
          <div className="adminResetPassword__loading">
            <LoadingSpinner isActive={true} />
            <p>Validating reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!states.tokenValid) {
    return (
      <div className="adminResetPassword">
        <div className="adminResetPassword__form">
          <div className="adminResetPassword__error">
            <div className="adminResetPassword__errorIcon">⚠️</div>
            <h2>Invalid or Expired Link</h2>
            <p>
              This password reset link is invalid or has expired. Please request
              a new password reset link.
            </p>
            <Link to="/admin" className="adminResetPassword__link">
              <ButtonGlobal
                withIcon={true}
                leftIcon={{
                  isActive: true,
                  type: "lucide",
                  lucid: "ArrowLeft",
                }}>
                Back to Sign In
              </ButtonGlobal>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state with countdown
  if (states.success) {
    return (
      <div className="adminResetPassword">
        <div className="adminResetPassword__form">
          <div className="adminResetPassword__success">
            <div className="adminResetPassword__successIcon">✓</div>
            <h2>Password Reset Successful!</h2>
            <p>{states.success}</p>

            <div className="adminResetPassword__countdown">
              <div className="adminResetPassword__countdownCircle">
                <svg
                  className="adminResetPassword__countdownSvg"
                  viewBox="0 0 100 100">
                  <circle
                    className="adminResetPassword__countdownBg"
                    cx="50"
                    cy="50"
                    r="45"
                  />
                  <circle
                    className="adminResetPassword__countdownProgress"
                    cx="50"
                    cy="50"
                    r="45"
                    style={{
                      strokeDashoffset: `${(states.countdown / 4) * 283}`,
                    }}
                  />
                </svg>
                <div className="adminResetPassword__countdownNumber">
                  {states.countdown}
                </div>
              </div>
              <p className="adminResetPassword__countdownText">
                Redirecting to sign in...
              </p>
            </div>

            <button
              className="adminResetPassword__skipBtn"
              onClick={handlers.handleSkipCountdown}>
              Skip and go now →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Valid token - show reset form
  return (
    <div className="adminResetPassword">
      <div className="adminResetPassword__form">
        <div className="adminResetPassword__header">
          <h2>Reset Your Password</h2>
          <p>Enter your new password below.</p>
        </div>

        <form onSubmit={handlers.handleResetSubmit}>
          {/* New Password Input */}
          <PasswordInput
            type="signUp"
            newPassword={states.newPassword}
            confirmPassword={states.confirmPassword}
            newPasswordName="newPassword"
            confirmPasswordName="confirmPassword"
            onNewChange={handlers.handlePasswordChange}
            onConfirmChange={handlers.handlePasswordChange}
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

          {/* Error Message */}
          {states.error && (
            <FieldMessage
              isActive={true}
              type="error"
              message={states.error}
              className="adminResetPassword__message"
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
              lucid: "Lock",
            }}>
            {states.isLoading ? "Resetting..." : "Reset Password"}
          </ButtonGlobal>

          {/* Back to Sign In Link */}
          <div className="adminResetPassword__backLink">
            <Link to="/admin">Back to Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminResetPassword;
