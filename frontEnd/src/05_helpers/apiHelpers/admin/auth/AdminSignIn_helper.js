import { AUTH } from "../../../../03_config/config.index.js";
import { useTranslation } from "react-i18next";
import { AdminSignIn_validator } from "../_adminAPI_validators/_adminAPI_validators.index.js";

const endpoint = AUTH.SIGNIN.ENDPOINT;
const properties = AUTH.SIGNIN.PROPERTIES;

const displayName = AUTH.SIGNIN.DISPLAY_NAME;
const isDebug = true;

const AdminSignIn_helper = async (payload) => {
  const { t } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  isDebug &&
    console.log(`${displayName} is [CALLED] | ENDPOINT: [${endpoint}]`);

  isDebug && console.log(`${displayName} is [PAYLOAD]`, { payload });

  const validationErrors = AdminSignIn_validator(payload, t, isDebug);
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

    return {
      success: true,
      message: backendResponse.message || tCommon("API.success"),
      data: backendResponse,
    };
  } catch (error) {
    isDebug && console.error(`${displayName} is [ERROR]`, error);
    return {
      success: false,
      message: error.message || tCommon("API.globalError"),
    };
  }
};

export default AdminSignIn_helper;
