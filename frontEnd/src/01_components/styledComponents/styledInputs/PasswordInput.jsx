import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import InputGlobal from "../InputGlobal.jsx";
import { useTranslation } from "react-i18next";
import "../../_styles/passwordInput.css";

const PasswordInput = ({
  // Type determines the layout and behavior
  type = "signIn", // "signIn" | "signUp" | "change"
  version = "primary",

  // Password values (controlled from parent)
  currentPassword = "", // For "change" type
  newPassword = "", // For "signUp" and "change" types
  confirmPassword = "", // For "signUp" and "change" types

  // Field names (allow dynamic naming)
  currentPasswordName = "currentPassword", // For "signIn" and "change"
  newPasswordName = "password", // For "signUp" and "change" - default to "password"
  confirmPasswordName = "confirmPassword", // For "signUp" and "change"

  // Handlers
  onCurrentChange, // For "change" type
  onNewChange, // For "signUp" and "change" types
  onConfirmChange, // For "signUp" and "change" types
  onPasswordChange, // For "signIn" type

  // Visibility state (controlled from parent for all inputs)
  currentVisible = false,
  newVisible = false,
  confirmVisible = false,

  // Visibility handlers
  onCurrentVisibleToggle,
  onNewVisibleToggle,
  onConfirmVisibleToggle,

  // Validation states (optional - parent can control these)
  showValidation = true, // Show password requirements for signUp/change
  externalErrors = {}, // { current: "", new: "", confirm: "" }

  ...props
}) => {
  const { t } = useTranslation("common");

  // Password validation logic
  const validatePassword = (password) => {
    return {
      minLength: password.length >= 10,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  // Calculate password strength (0-4)
  const calculateStrength = (password) => {
    const requirements = validatePassword(password);
    const metCount = Object.values(requirements).filter(Boolean).length;

    if (password.length === 0) return 0;
    if (metCount <= 2) return 1; // Weak
    if (metCount === 3) return 2; // Fair
    if (metCount === 4) return 3; // Good
    return 4; // Strong
  };

  // Get strength label and percentage
  const getStrengthInfo = (strength) => {
    const labels = {
      0: { text: "", percent: 0 },
      1: { text: t("inputs.password.strength.weak"), percent: 25 },
      2: { text: t("inputs.password.strength.fair"), percent: 50 },
      3: { text: t("inputs.password.strength.good"), percent: 75 },
      4: { text: t("inputs.password.strength.strong"), percent: 100 },
    };
    return labels[strength];
  };

  // Memoized password validation for new password
  const passwordValidation = useMemo(() => {
    if (type === "signUp" || type === "change") {
      return validatePassword(newPassword);
    }
    return {};
  }, [newPassword, type]);

  // Memoized password strength
  const passwordStrength = useMemo(() => {
    if (type === "signUp" || type === "change") {
      return calculateStrength(newPassword);
    }
    return 0;
  }, [newPassword, type]);

  // Check if passwords match
  const passwordsMatch = useMemo(() => {
    if (
      (type === "signUp" || type === "change") &&
      confirmPassword.length > 0
    ) {
      return newPassword === confirmPassword;
    }
    return null;
  }, [newPassword, confirmPassword, type]);

  // All requirements met
  const allRequirementsMet = useMemo(() => {
    return Object.values(passwordValidation).every(Boolean);
  }, [passwordValidation]);

  const strengthInfo = getStrengthInfo(passwordStrength);

  // Render password requirements list
  const renderRequirements = () => {
    if (!showValidation || (type !== "signUp" && type !== "change"))
      return null;

    const requirements = [
      { key: "minLength", met: passwordValidation.minLength },
      { key: "uppercase", met: passwordValidation.uppercase },
      { key: "lowercase", met: passwordValidation.lowercase },
      { key: "number", met: passwordValidation.number },
      { key: "special", met: passwordValidation.special },
    ];

    return (
      <div className="passwordInput__requirements">
        <ul className="passwordInput__requirements-list">
          {requirements.map(({ key, met }) => (
            <li
              key={key}
              className={`passwordInput__requirement ${met ? "met" : "unmet"}`}>
              <span className="passwordInput__requirement-indicator">
                {met ? "✓" : "○"}
              </span>
              <span className="passwordInput__requirement-text">
                {t(`inputs.password.requirements.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render strength meter
  const renderStrengthMeter = () => {
    if (
      !showValidation ||
      (type !== "signUp" && type !== "change") ||
      newPassword.length === 0
    ) {
      return null;
    }

    return (
      <div className="passwordInput__strength">
        <div className="passwordInput__strength-label">
          <span>{t("inputs.password.strength.label")}</span>
          <span
            className={`passwordInput__strength-text strength-${passwordStrength}`}>
            {strengthInfo.text}
          </span>
        </div>
        <div className="passwordInput__strength-bar">
          <div
            className={`passwordInput__strength-fill strength-${passwordStrength}`}
            style={{ width: `${strengthInfo.percent}%` }}
          />
        </div>
      </div>
    );
  };

  const containerClass = `passwordInput passwordInput--${type} passwordInput--${version}`;

  // Render based on type
  if (type === "signIn") {
    return (
      <div className={containerClass}>
        <InputGlobal
          type={currentVisible ? "text" : "password"}
          onChange={onPasswordChange}
          version={version}
          placeholder={t("inputs.password.placeholder.signIn")}
          value={currentPassword}
          name={currentPasswordName}
          withLabel={true}
          labelProps={{
            title: t("inputs.password.label.signIn"),
            message: t("inputs.password.label.signIn"),
          }}
          withMessage={true}
          messageProps={{
            withHint: false,
            hintMessage: t("inputs.password.hint.signIn"),
            withErrorMessage: !!externalErrors.current,
            errorMessage: externalErrors.current || "",
          }}
          withLeftIcon={true}
          leftIconProps={{
            isActive: true,
            type: "lucide",
            lucid: "Lock",
          }}
          withRightIcon={true}
          rightIconProps={{
            isActive: true,
            type: "lucide",
            lucid: currentVisible ? "EyeOff" : "Eye",
            iconProps: {
              onClick: onCurrentVisibleToggle,
            },
          }}
          {...props}
        />
      </div>
    );
  }

  if (type === "signUp") {
    return (
      <div className={containerClass}>
        {/* New Password Input */}
        <div className="passwordInput__field">
          <InputGlobal
            type={newVisible ? "text" : "password"}
            onChange={onNewChange}
            version={version}
            placeholder={t("inputs.password.placeholder.signUp")}
            value={newPassword}
            name={newPasswordName}
            withLabel={true}
            labelProps={{
              title: t("inputs.password.label.new"),
              message: t("inputs.password.label.new"),
            }}
            withMessage={false}
            withLeftIcon={true}
            leftIconProps={{
              isActive: true,
              type: "lucide",
              lucid: "Lock",
            }}
            withRightIcon={true}
            rightIconProps={{
              isActive: true,
              type: "lucide",
              lucid: newVisible ? "EyeOff" : "Eye",
              iconProps: {
                onClick: onNewVisibleToggle,
              },
            }}
            {...props}
          />

          {/* Password Requirements */}
          {renderRequirements()}

          {/* Password Strength Meter */}
          {renderStrengthMeter()}
        </div>

        {/* Confirm Password Input */}
        <div className="passwordInput__field">
          <InputGlobal
            type={confirmVisible ? "text" : "password"}
            onChange={onConfirmChange}
            version={version}
            placeholder={t("inputs.password.placeholder.repeat")}
            value={confirmPassword}
            name={confirmPasswordName}
            withLabel={true}
            labelProps={{
              title: t("inputs.password.label.repeat"),
              message: t("inputs.password.label.repeat"),
            }}
            withMessage={true}
            messageProps={{
              withHint: confirmPassword.length === 0,
              hintMessage: t("inputs.password.hint.repeat"),
              withSuccessMessage: passwordsMatch === true,
              successMessage: t("inputs.password.success.match"),
              withErrorMessage:
                passwordsMatch === false || !!externalErrors.confirm,
              errorMessage:
                externalErrors.confirm || t("inputs.password.error.mismatch"),
            }}
            withLeftIcon={true}
            leftIconProps={{
              isActive: true,
              type: "lucide",
              lucid: "RotateCw",
            }}
            withRightIcon={true}
            rightIconProps={{
              isActive: true,
              type: "lucide",
              lucid: confirmVisible ? "EyeOff" : "Eye",
              iconProps: {
                onClick: onConfirmVisibleToggle,
              },
            }}
            {...props}
          />
        </div>
      </div>
    );
  }

  if (type === "change") {
    return (
      <div className={containerClass}>
        {/* Current Password Input */}
        <div className="passwordInput__field">
          <InputGlobal
            type={currentVisible ? "text" : "password"}
            onChange={onCurrentChange}
            version={version}
            placeholder={t("inputs.password.placeholder.current")}
            value={currentPassword}
            name={currentPasswordName}
            withLabel={true}
            labelProps={{
              title: t("inputs.password.label.current"),
              message: t("inputs.password.label.current"),
            }}
            withMessage={!!externalErrors.current}
            messageProps={{
              withErrorMessage: !!externalErrors.current,
              errorMessage: externalErrors.current || "",
            }}
            withLeftIcon={true}
            leftIconProps={{
              isActive: true,
              type: "lucide",
              lucid: "Lock",
            }}
            withRightIcon={true}
            rightIconProps={{
              isActive: true,
              type: "lucide",
              lucid: currentVisible ? "EyeOff" : "Eye",
              iconProps: {
                onClick: onCurrentVisibleToggle,
              },
            }}
            {...props}
          />
        </div>

        {/* New Password Input */}
        <div className="passwordInput__field">
          <InputGlobal
            type={newVisible ? "text" : "password"}
            onChange={onNewChange}
            version={version}
            placeholder={t("inputs.password.placeholder.new")}
            value={newPassword}
            name={newPasswordName}
            withLabel={true}
            labelProps={{
              title: t("inputs.password.label.new"),
              message: t("inputs.password.label.new"),
            }}
            withMessage={false}
            withLeftIcon={true}
            leftIconProps={{
              isActive: true,
              type: "lucide",
              lucid: "Lock",
            }}
            withRightIcon={true}
            rightIconProps={{
              isActive: true,
              type: "lucide",
              lucid: newVisible ? "EyeOff" : "Eye",
              iconProps: {
                onClick: onNewVisibleToggle,
              },
            }}
            {...props}
          />

          {/* Password Requirements */}
          {renderRequirements()}

          {/* Password Strength Meter */}
          {renderStrengthMeter()}
        </div>

        {/* Confirm Password Input */}
        <div className="passwordInput__field">
          <InputGlobal
            type={confirmVisible ? "text" : "password"}
            onChange={onConfirmChange}
            version={version}
            placeholder={t("inputs.password.placeholder.repeat")}
            value={confirmPassword}
            name={confirmPasswordName}
            withLabel={true}
            labelProps={{
              title: t("inputs.password.label.repeat"),
              message: t("inputs.password.label.repeat"),
            }}
            withMessage={true}
            messageProps={{
              withHint: confirmPassword.length === 0,
              hintMessage: t("inputs.password.hint.repeat"),
              withSuccessMessage: passwordsMatch === true,
              successMessage: t("inputs.password.success.match"),
              withErrorMessage:
                passwordsMatch === false || !!externalErrors.confirm,
              errorMessage:
                externalErrors.confirm || t("inputs.password.error.mismatch"),
            }}
            withLeftIcon={true}
            leftIconProps={{
              isActive: true,
              type: "lucide",
              lucid: "RotateCw",
            }}
            withRightIcon={true}
            rightIconProps={{
              isActive: true,
              type: "lucide",
              lucid: confirmVisible ? "EyeOff" : "Eye",
              iconProps: {
                onClick: onConfirmVisibleToggle,
              },
            }}
            {...props}
          />
        </div>
      </div>
    );
  }

  return null;
};

PasswordInput.propTypes = {
  type: PropTypes.oneOf(["signIn", "signUp", "change"]).isRequired,
  version: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  currentPassword: PropTypes.string,
  newPassword: PropTypes.string,
  confirmPassword: PropTypes.string,
  currentPasswordName: PropTypes.string,
  newPasswordName: PropTypes.string,
  confirmPasswordName: PropTypes.string,
  onCurrentChange: PropTypes.func,
  onNewChange: PropTypes.func,
  onConfirmChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  currentVisible: PropTypes.bool,
  newVisible: PropTypes.bool,
  confirmVisible: PropTypes.bool,
  onCurrentVisibleToggle: PropTypes.func,
  onNewVisibleToggle: PropTypes.func,
  onConfirmVisibleToggle: PropTypes.func,
  showValidation: PropTypes.bool,
  externalErrors: PropTypes.object,
};

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
