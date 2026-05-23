import { CK_CONTRACT_CONFIG } from "../../../../../../../../03_config/config.index.js";

const { ENDPOINT, PROPERTIES, DISPLAY_NAME } =
  CK_CONTRACT_CONFIG.FIELDS.UPDATE_COMMISSIONPCT;
const isDebug = true;

const CK_gen_contract_update_commissionPct = async (payload) => {
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
      message: backendResponse.message || "Failed to update contract commissionPct",
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${DISPLAY_NAME} [ERROR]`, error);
    return {
      success: false,
      message: error.message || "Failed to update contract commissionPct",
      data: null,
    };
  }
};

export default CK_gen_contract_update_commissionPct;
