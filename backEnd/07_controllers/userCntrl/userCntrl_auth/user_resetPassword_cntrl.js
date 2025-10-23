import { user_resetPassword_srv } from "../_utils/userCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const displayName = " | user_resetPassword_cntrl.js | |<=>| ";
const isDebug = false;

const user_resetPassword_cntrl = async (req, res) => {
  try {
    const { success, message, data } = await user_resetPassword_srv(
      req,
      isDebug
    );

    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(error, res, displayName, isDebug);
  }
};

export default user_resetPassword_cntrl;
