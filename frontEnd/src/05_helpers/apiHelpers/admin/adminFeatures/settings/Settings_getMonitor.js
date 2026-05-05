import { ADMIN_endpoints } from "../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } =
  ADMIN_endpoints.SETTINGS.GET_MONITOR;
const isDebug = false;

/**
 * @param {string} provider
 * @param {boolean} [refresh] — pass true to bypass the 5-min server cache
 */
const Settings_getMonitor = async (provider, refresh = false) => {
  // console.log("refresh_________________________", refresh);
  // console.log("provider", provider);
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | provider: ${provider}`);

  try {
    const response = await fetch(ENDPOINT(provider, refresh), {
      ...PROPERTIES,
    });
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success === true,
      message: backendResponse.message || "Failed to load monitor data",
      data: backendResponse.payload ?? null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to load monitor data",
      data: null,
    };
  }
};

export default Settings_getMonitor;
