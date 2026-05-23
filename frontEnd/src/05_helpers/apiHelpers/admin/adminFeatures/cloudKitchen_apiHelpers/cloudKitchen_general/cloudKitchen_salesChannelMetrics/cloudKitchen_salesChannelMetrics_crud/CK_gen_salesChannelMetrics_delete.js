import { CK_SALES_CHANNEL_METRICS_CONFIG } from "../../../../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } =
  CK_SALES_CHANNEL_METRICS_CONFIG.CRUD.DELETE;
const isDebug = true;

const CK_gen_salesChannelMetrics_delete = async (payload) => {
  const id = typeof payload === "string" ? payload : payload?.id;
  const url = ENDPOINT(id);
  isDebug && console.log(`${DISPLAY_NAME} [CALLED] | ENDPOINT: [${url}]`);
  isDebug && console.log(`${DISPLAY_NAME} [PAYLOAD]`, payload);

  try {
    const response = await fetch(url, { ...PROPERTIES() });
    const backendResponse = await response.json();

    isDebug &&
      console.log(`${DISPLAY_NAME} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || "Failed to delete sales channel metrics",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to delete sales channel metrics",
      data: null,
    };
  }
};

export default CK_gen_salesChannelMetrics_delete;
