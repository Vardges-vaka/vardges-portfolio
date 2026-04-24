import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { DISPLAY_NAME } = ADMIN_endpoints.BRANCH.DELETE;
const isDebug = true;

const Branch_delete = async (id) => {
  const endpoint = ADMIN_endpoints.BRANCH.DELETE.ENDPOINT(id);
  const properties = ADMIN_endpoints.BRANCH.DELETE.PROPERTIES;

  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...properties });
    const backendResponse = await response.json();

    isDebug && console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to delete branch",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to delete branch", data: null };
  }
};

export default Branch_delete;
