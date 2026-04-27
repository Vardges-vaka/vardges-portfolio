import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { DISPLAY_NAME } = ADMIN_endpoints.BRAND.UPDATE;
const isDebug = true;

const Brand_update = async (id, payload) => {
  const endpoint = ADMIN_endpoints.BRAND.UPDATE.ENDPOINT(id);
  const properties = ADMIN_endpoints.BRAND.UPDATE.PROPERTIES;

  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...properties(payload) });
    const backendResponse = await response.json();

    isDebug && console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to update brand",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to update brand", data: null };
  }
};

export default Brand_update;
