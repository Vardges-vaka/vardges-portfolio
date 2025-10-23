const displayName = "AdminForgotPassword_validator.js";

export const AdminForgotPassword_validator = (email, t, isDebug) => {
  if (!email) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Email is required"
      );
    return t("emailRequired");
  }
  if (typeof email !== "string" || email.trim().length === 0) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Email must be a valid string"
      );
    return t("invalidEmail");
  }
  isDebug && console.log(`${displayName} is [VALIDATION_PASSED]`);
  return null;
};
