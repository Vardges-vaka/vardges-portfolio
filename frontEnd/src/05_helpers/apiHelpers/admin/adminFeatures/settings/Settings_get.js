import { ADMIN_endpoints } from "../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = ADMIN_endpoints.SETTINGS.GET;
const isDebug = false;

const Settings_get = async () => {
  isDebug &&
    console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${ENDPOINT}]`);

  try {
    const response = await fetch(ENDPOINT, { ...PROPERTIES });
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success === true,
      message: backendResponse.message || "Failed to load settings",
      data: backendResponse.payload ?? null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to load settings",
      data: null,
    };
  }
};

export default Settings_get;
