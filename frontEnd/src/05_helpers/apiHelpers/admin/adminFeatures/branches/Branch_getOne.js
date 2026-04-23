import { ADMIN_endpoints } from "../../../../../03_config/config.index";

const { DISPLAY_NAME } = ADMIN_endpoints.BRANCH.GET_ONE;
const isDebug = true;

const Branch_getOne = async (id) => {
  const endpoint = ADMIN_endpoints.BRANCH.GET_ONE.ENDPOINT(id);
  const properties = ADMIN_endpoints.BRANCH.GET_ONE.PROPERTIES;

  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...properties });
    const backendResponse = await response.json();

    isDebug && console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to fetch branch",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to fetch branch", data: null };
  }
};

export default Branch_getOne;
