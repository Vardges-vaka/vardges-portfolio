import { user_authCheck_srv } from "../_utils/userCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const displayName = " | user_authCheck_cntrl.js | |<=>| ";
const isDebug = true;

const user_authCheck_cntrl = async (req, res) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  try {
    const { success, message, data } = await user_authCheck_srv(req, isDebug);

    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  }
};

export default user_authCheck_cntrl;
