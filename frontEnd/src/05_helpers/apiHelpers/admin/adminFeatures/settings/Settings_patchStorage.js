import { ADMIN_endpoints } from "../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = ADMIN_endpoints.SETTINGS.PATCH_STORAGE;
const isDebug = false;

/**
 * @param {{ provider: string, isEnabled?: boolean, isDefault?: boolean }} payload
 */
const Settings_patchStorage = async (payload) => {
  isDebug &&
    console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${ENDPOINT}]`);

  try {
    const response = await fetch(ENDPOINT, PROPERTIES(payload));
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success === true,
      message: backendResponse.message || "Failed to update storage",
      data: backendResponse.payload ?? null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to update storage",
      data: null,
    };
  }
};

export default Settings_patchStorage;
