import { ADMIN_endpoints } from "../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = ADMIN_endpoints.SETTINGS.UPLOAD_LOGO;
const isDebug = false;

/**
 * @param {string} provider
 * @param {File} file
 */
const Settings_uploadLogo = async (provider, file) => {
  isDebug &&
    console.log(`${DISPLAY_NAME} [CALLED] | provider: ${provider}`);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(ENDPOINT(provider), PROPERTIES(formData));
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success === true,
      message: backendResponse.message || "Failed to upload logo",
      data: backendResponse.payload ?? null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to upload logo",
      data: null,
    };
  }
};

export default Settings_uploadLogo;
