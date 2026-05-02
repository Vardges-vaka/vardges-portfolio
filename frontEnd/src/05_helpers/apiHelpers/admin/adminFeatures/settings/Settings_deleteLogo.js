import { ADMIN_endpoints } from "../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = ADMIN_endpoints.SETTINGS.DELETE_LOGO;
const isDebug = false;

/**
 * @param {string} provider
 */
const Settings_deleteLogo = async (provider) => {
  isDebug &&
    console.log(`${DISPLAY_NAME} [CALLED] | provider: ${provider}`);

  try {
    const response = await fetch(ENDPOINT(provider), { ...PROPERTIES });
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success === true,
      message: backendResponse.message || "Failed to delete logo",
      data: backendResponse.payload ?? null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to delete logo",
      data: null,
    };
  }
};

export default Settings_deleteLogo;
