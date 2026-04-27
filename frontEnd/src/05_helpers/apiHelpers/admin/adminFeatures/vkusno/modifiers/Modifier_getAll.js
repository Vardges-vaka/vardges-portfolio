import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = ADMIN_endpoints.MODIFIER.GET_ALL;
const isDebug = true;

const Modifier_getAll = async () => {
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${ENDPOINT}]`);

  try {
    const response = await fetch(ENDPOINT, { ...PROPERTIES });
    const backendResponse = await response.json();

    isDebug && console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to fetch modifiers",
      data: backendResponse.payload || [],
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to fetch modifiers", data: [] };
  }
};

export default Modifier_getAll;
