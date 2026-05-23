import { CK_RATING_CONFIG } from "../../../../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } =
  CK_RATING_CONFIG.FIELDS.UPDATE_PLATFORMORDERID;
const isDebug = true;

const CK_gen_rating_update_platformOrderId = async (payload) => {
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
      message: backendResponse.message || "Failed to update rating platformOrderId",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to update rating platformOrderId",
      data: null,
    };
  }
};

export default CK_gen_rating_update_platformOrderId;
