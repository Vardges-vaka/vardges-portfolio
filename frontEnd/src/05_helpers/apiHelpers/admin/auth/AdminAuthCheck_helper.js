import { AUTH } from "../../../../03_config/config.index.js";

const endpoint = AUTH.CHECK.ENDPOINT;
const properties = AUTH.CHECK.PROPERTIES;

const displayName = AUTH.CHECK.DISPLAY_NAME;
const isDebug = true;

const AdminAuthCheck_helper = async () => {
  isDebug &&
    console.log(`${displayName} is [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...properties });

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

export default AdminAuthCheck_helper;
