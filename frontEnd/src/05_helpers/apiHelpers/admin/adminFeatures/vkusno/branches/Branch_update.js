import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { DISPLAY_NAME } = ADMIN_endpoints.BRANCH.UPDATE;
const isDebug = true;

const Branch_update = async (id, payload) => {
  const endpoint = ADMIN_endpoints.BRANCH.UPDATE.ENDPOINT(id);
  const properties = ADMIN_endpoints.BRANCH.UPDATE.PROPERTIES;

  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...properties(payload) });
    const backendResponse = await response.json();

    isDebug && console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to update branch",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to update branch", data: null };
  }
};

export default Branch_update;
