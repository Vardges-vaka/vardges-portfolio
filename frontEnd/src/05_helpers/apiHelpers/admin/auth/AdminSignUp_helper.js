import { AUTH } from "../../../../03_config/config.index.js";

import { AdminSignUp_validator } from "../_adminAPI_validators/_adminAPI_validators.index.js";

const endpoint = AUTH.SIGNUP.ENDPOINT;
const properties = AUTH.SIGNUP.PROPERTIES;

const displayName = AUTH.SIGNUP.DISPLAY_NAME;
const isDebug = true;

const AdminSignUp_helper = async (payload, t, tCommon) => {
  isDebug &&
    console.log(`${displayName} is [CALLED] | ENDPOINT: [${endpoint}]`);

  isDebug && console.log(`${displayName} is [PAYLOAD]`, { payload });

  const validationErrors = AdminSignUp_validator(payload, t, isDebug);
  if (validationErrors) {
    return {
      success: false,
      message: validationErrors,
    };
  }

  try {
    const response = await fetch(endpoint, { ...properties(payload) });

    isDebug && console.log(`${displayName} is [RESPONSE]`, response);

    const backendResponse = await response.json();

    isDebug &&
      console.log(`${displayName} is [BACKEND RESPONSE]`, backendResponse);

    // Return backend's success status, not always true
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

export default AdminSignUp_helper;
