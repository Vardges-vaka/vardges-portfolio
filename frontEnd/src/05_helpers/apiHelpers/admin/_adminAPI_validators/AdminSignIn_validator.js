const displayName = "AdminSignIn_validator.js";

export const AdminSignIn_validator = (payload, t, isDebug) => {
  const { email, password, rememberMe } = payload;
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
  // if (!validator.isEmail(email)) {
  //   isDebug &&
  //     console.error(`${displayName} is [VALIDATION_ERROR]`, "Invalid email");
  //   return t("invalidEmail");
  // }
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
