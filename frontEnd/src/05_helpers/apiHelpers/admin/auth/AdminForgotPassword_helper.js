import { AUTH } from "../../../../03_config/config.index.js";
import { AdminForgotPassword_validator } from "../_adminAPI_validators/_adminAPI_validators.index.js";

const endpoint = AUTH.FORGOT_PASSWORD.ENDPOINT;
const properties = AUTH.FORGOT_PASSWORD.PROPERTIES;

const displayName = AUTH.FORGOT_PASSWORD.DISPLAY_NAME;
const isDebug = true;

const AdminForgotPassword_helper = async (email, t, tCommon) => {
  isDebug &&
    console.log(`${displayName} is [CALLED] | ENDPOINT: [${endpoint}]`);

  isDebug && console.log(`${displayName} is [EMAIL]`, { email });

  const validationErrors = AdminForgotPassword_validator(email, t, isDebug);
  if (validationErrors) {
    return {
      success: false,
      message: validationErrors,
    };
  }

  try {
    const payload = { email };
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

export default AdminForgotPassword_helper;
