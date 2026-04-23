import { ADMIN_endpoints } from "../../../../../03_config/config.index";

const endpoint = ADMIN_endpoints.VKUSNO.ADD.ENDPOINT;
const properties = ADMIN_endpoints.VKUSNO.ADD.PROPERTIES;

const displayName = ADMIN_endpoints.VKUSNO.ADD.DISPLAY_NAME;
const isDebug = true;

const Project_add = async (payload) => {
  const { type, title, description, projectInfo, config } = payload;

  // Append type as query parameter
  const endpointWithQuery = `${endpoint}?type=${encodeURIComponent(type)}`;

  isDebug &&
    console.log(
      `${displayName} is [CALLED] | ENDPOINT: [${endpointWithQuery}]`,
    );

  const sanitizedData = { title, description, projectInfo, config };

  try {
    const response = await fetch(endpointWithQuery, {
      ...properties(sanitizedData),
    });

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
