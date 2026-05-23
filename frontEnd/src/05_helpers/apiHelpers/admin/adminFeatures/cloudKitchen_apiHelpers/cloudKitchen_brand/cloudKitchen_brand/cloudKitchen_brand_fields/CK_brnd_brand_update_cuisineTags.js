import { CK_BRAND_CONFIG } from "../../../../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } =
  CK_BRAND_CONFIG.FIELDS.UPDATE_CUISINETAGS;
const isDebug = true;

const CK_brnd_brand_update_cuisineTags = async (payload) => {
  const { id, ...body } = payload;
  const url = ENDPOINT(id);
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${url}]`);
  isDebug && console.log(`${DISPLAY_NAME} [PAYLOAD]`, payload);

  try {
    const response = await fetch(url, { ...PROPERTIES(body) });
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to update brand cuisineTags",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to update brand cuisineTags",
      data: null,
    };
  }
};

export default CK_brnd_brand_update_cuisineTags;
