const displayName = "AdminResetPassword_validator.js";

export const AdminResetPassword_validator = (
  token,
  newPassword,
  t,
  isDebug
) => {
  if (!token) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Token is required"
      );
    return t("tokenRequired") || "Token is required";
  }
  if (typeof token !== "string" || token.trim().length === 0) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Token must be a valid string"
      );
    return t("invalidToken") || "Invalid token";
  }
  if (!newPassword) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "New password is required"
      );
    return t("passwordRequired");
  }
  if (typeof newPassword !== "string" || newPassword.length < 10) {
    isDebug &&
      console.error(
        `${displayName} is [VALIDATION_ERROR]`,
        "Password must be at least 10 characters"
      );
    return t("passwordTooShort") || "Password must be at least 10 characters";
  }
  isDebug && console.log(`${displayName} is [VALIDATION_PASSED]`);
  return null;
};
