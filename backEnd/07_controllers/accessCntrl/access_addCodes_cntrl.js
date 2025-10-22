import { access_addCodes_srv } from "./_accessCntrl_utils/accessCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../03_services/_services.index.js";

const isDebug = true;
const displayName = "access_addCodes_cntrl.js";

const access_addCodes_cntrl = async (req, res) => {
  isDebug && console.log(`🛑 ↘️ 🏃‍➡️ ${displayName} |<=>| [STARTED]`);

  try {
    const { success, message, data } = await access_addCodes_srv(req, isDebug);

    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🚩🚩🚩${displayName}[COMPLETED]`);
  }
};
export default access_addCodes_cntrl;
