import { access_getCodes_srv } from "./_accessCntrl_utils/accessCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../03_services/_services.index.js";

const isDebug = true;
const displayName = "access_getCodes_cntrl.js";

const access_getCodes_cntrl = async (req, res) => {
  isDebug && console.log(`🛑 ↘️ 🏃‍➡️ ${displayName} |<=>| [STARTED]`);

  try {
    // !NOTE: Uncomment this when the service is implemented
    // const { success, message, data } = await access_getCodes_cntrl_srv(req, isDebug);
    // ?------------------------------------------------------------------------
    // return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🚩🚩🚩${displayName}[COMPLETED]`);
  }
};
export default access_getCodes_cntrl;
