import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { DISPLAY_NAME } = ADMIN_endpoints.MENU_CATEGORY.GET_ONE;
const isDebug = true;

const MenuCategory_getOne = async (id) => {
  const endpoint = ADMIN_endpoints.MENU_CATEGORY.GET_ONE.ENDPOINT(id);

  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...ADMIN_endpoints.MENU_CATEGORY.GET_ONE.PROPERTIES });
    const backendResponse = await response.json();

    isDebug && console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to fetch menu category",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to fetch menu category", data: null };
  }
};

export default MenuCategory_getOne;
