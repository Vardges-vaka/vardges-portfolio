import { ADMIN_endpoints } from "../../../../../../03_config/config.index";

const { DISPLAY_NAME } = ADMIN_endpoints.MENU_CATEGORY.DELETE;
const isDebug = true;

const MenuCategory_delete = async (id) => {
  const endpoint = ADMIN_endpoints.MENU_CATEGORY.DELETE.ENDPOINT(id);

  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...ADMIN_endpoints.MENU_CATEGORY.DELETE.PROPERTIES });
    const backendResponse = await response.json();

    isDebug && console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to delete menu category",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return { success: false, message: error.message || "Failed to delete menu category", data: null };
  }
};

export default MenuCategory_delete;
