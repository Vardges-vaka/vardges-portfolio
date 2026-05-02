import { ADMIN_endpoints } from "../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = ADMIN_endpoints.SETTINGS.PUT_PROVIDER;
const isDebug = false;

/**
 * @param {string} provider - "s3" | "gcs" | "r2" | "blob"
 * @param {{ isEnabled?: boolean, isDefault?: boolean, consoleUrl?: string, customExpTime?: boolean }} body
 */
const Settings_putProvider = async (provider, body) => {
  isDebug &&
    console.log(`${DISPLAY_NAME} [CALLED] | provider: ${provider}`, body);

  try {
    const response = await fetch(ENDPOINT(provider), PROPERTIES(body));
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success === true,
      message: backendResponse.message || "Failed to update provider",
      data: backendResponse.payload ?? null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to update provider",
      data: null,
    };
  }
};

export default Settings_putProvider;
