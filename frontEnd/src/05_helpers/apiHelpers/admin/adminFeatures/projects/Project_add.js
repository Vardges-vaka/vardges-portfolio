import { ADMIN_endpoints } from "../../../../../03_config/config.index";

const endpoint = ADMIN_endpoints.PROJECT.ADD.ENDPOINT;
const properties = ADMIN_endpoints.PROJECT.ADD.PROPERTIES;

const displayName = ADMIN_endpoints.PROJECT.ADD.DISPLAY_NAME;
const isDebug = true;

const Project_add = async (payload) => {
  isDebug &&
    console.log(`${displayName} is [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...properties(payload) });

    isDebug && console.log(`${displayName} is [RESPONSE]`, response);

    const backendResponse = await response.json();

    isDebug &&
      console.log(`${displayName} is [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Auth check completed",
      data: backendResponse.payload || null, // Backend uses 'payload' not 'data'
    };
  } catch (error) {
    isDebug && console.error(`${displayName} is [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to check authentication",
      data: null,
    };
  }
};

export default Project_add;
