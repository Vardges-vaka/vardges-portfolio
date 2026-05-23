import { cK_gen_salesChannel_update_storeUrl_srv } from "../_cK_gen_salesChannel_crud_cntrl.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../../../03_services/_services.index.js";

const isDebug = true;
const displayName = " | cK_gen_salesChannel_update_storeUrl_cntrl.js | ";

const cK_gen_salesChannel_update_storeUrl_cntrl = async (req, res) => {
  isDebug && console.log(`🛑 ↘️ 🏃‍➡️ ${displayName} [STARTED]`);
  try {
    const { success, message, data } = await cK_gen_salesChannel_update_storeUrl_srv(req, isDebug);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🚩🚩🚩${displayName}[COMPLETED]`);
  }
};

export default cK_gen_salesChannel_update_storeUrl_cntrl;
