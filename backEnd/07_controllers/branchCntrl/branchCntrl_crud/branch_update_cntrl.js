import { branch_update_srv } from "../_utils/branchCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const isDebug = true;
const displayName = " | branch_update_cntrl.js | ";

const branch_update_cntrl = async (req, res) => {
  isDebug && console.log(`🛑 ↘️ 🏃‍➡️ ${displayName} [STARTED]`);
  try {
    const { success, message, data } = await branch_update_srv(req, isDebug);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🚩🚩🚩${displayName}[COMPLETED]`);
  }
};

export default branch_update_cntrl;
