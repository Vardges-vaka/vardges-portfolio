const displayName = "AdminSignUp_validator.js";

export const AdminSignUp_validator = (payload, t, isDebug) => {
  const { email, password, confirmPassword, key, rememberMe } = payload;
  if (!email) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Email is required"
      );
    return t("emailRequired");
  }
  if (!password) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Password is required"
      );
    return t("passwordRequired");
  }
  if (!validator.isEmail(email)) {
    isDebug &&
      console.error(`${displayName} is [VALIDATION_ERROR]`, "Invalid email");
    return t("invalidEmail");
  }
  if (!confirmPassword) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Confirm password is required"
      );
    return t("confirmPasswordRequired");
  }
  if (password !== confirmPassword) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Passwords do not match"
      );
    return t("passwordsDoNotMatch");
  }
  if (!key) {
    isDebug &&
      console.error(`${displayName} is [VALIDATION_ERROR]`, "Key is required");
    return t("keyRequired");
  }
  if (rememberMe !== true && rememberMe !== false) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Remember me must be a boolean"
      );
    return t("rememberMeMustBeBoolean");
  }
  isDebug && console.log(`${displayName} is [VALIDATION_PASSED]`);
  return null;
};
