import { CK_MENU_CATEGORY_API_CONFIG } from "../../../../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } =
  CK_MENU_CATEGORY_API_CONFIG.CRUD.GETALL_BY_OWNERTYPE;
const isDebug = true;

const CK_menuCategory_getAllByOwnerType = async (payload) => {
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${ENDPOINT}]`);
  isDebug && console.log(`${DISPLAY_NAME} [PAYLOAD]`, payload);

  try {
    const response = await fetch(ENDPOINT, { ...PROPERTIES(payload) });
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to add branch",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to add branch",
      data: null,
    };
  }
};

export default CK_menuCategory_getAllByOwnerType;
