import { AUTH } from "../../../../03_config/config.index.js";
import { useTranslation } from "react-i18next";

const endpoint = AUTH.SIGNOUT.ENDPOINT;
const properties = AUTH.SIGNOUT.PROPERTIES;

const displayName = AUTH.SIGNOUT.DISPLAY_NAME;
const isDebug = true;

const AdminSignOut_helper = async () => {
  const { t } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");

  isDebug &&
    console.log(`${displayName} is [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...properties });

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

export default AdminSignOut_helper;
