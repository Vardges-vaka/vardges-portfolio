import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } = ADMIN_endpoints.MENU.ADD;
const isDebug = true;

const Menu_add = async (payload) => {
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${ENDPOINT}]`);

  try {
    const response = await fetch(ENDPOINT, { ...PROPERTIES(payload) });
    const backendResponse = await response.json();

    isDebug && console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to add menu",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to add menu", data: null };
  }
};

export default Menu_add;
