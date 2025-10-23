import { AUTH } from "../../../../03_config/config.index.js";
import { AdminResetPassword_validator } from "../_adminAPI_validators/_adminAPI_validators.index.js";

const endpoint = AUTH.RESET_PASSWORD.ENDPOINT;
const properties = AUTH.RESET_PASSWORD.PROPERTIES;

const displayName = AUTH.RESET_PASSWORD.DISPLAY_NAME;
const isDebug = true;

const AdminResetPassword_helper = async (token, newPassword, t, tCommon) => {
  isDebug &&
    console.log(`${displayName} is [CALLED] | ENDPOINT: [${endpoint}]`);

  isDebug &&
    console.log(`${displayName} is [PARAMS]`, { token, newPassword: "***" });

  const validationErrors = AdminResetPassword_validator(
    token,
    newPassword,
    t,
    isDebug
  );
  if (validationErrors) {
    return {
      success: false,
      message: validationErrors,
    };
  }

  try {
    const payload = { token, newPassword };
    const response = await fetch(endpoint, { ...properties(payload) });

    isDebug && console.log(`${displayName} is [RESPONSE]`, response);

    const backendResponse = await response.json();

    isDebug &&
      console.log(`${displayName} is [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || tCommon("API.success"),
      data: backendResponse.payload || backendResponse, // Backend uses 'payload' not 'data'
    };
  } catch (error) {
    isDebug && console.error(`${displayName} is [ERROR]`, error);
    return {
      success: false,
      message: error.message || tCommon("API.globalError"),
    };
  }
};

export default AdminResetPassword_helper;
