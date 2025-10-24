import { user_signUp_srv } from "../_utils/userCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";
import { setJWT_Cookie } from "../../../03_services/_services.index.js";
const isDebug = true;
const displayName = " | user_signUp_cntrl.js |<=>| ";

const user_signUp_cntrl = async (req, res) => {
  isDebug && console.log(`🛑 ↘️ 🏃‍➡️ ${displayName} |<=>| [STARTED]`);

  try {
    // Pass res to service so it can set cookies/session
    const { success, message, data, session_data, token } =
      await user_signUp_srv(req, isDebug);

    // req.session.user = session_data;
    // token && setJWT_Cookie(res, token);

    if (success) {
      if (session_data) {
        req.session.user = session_data;
        isDebug &&
          console.log(
            `✅${displayName}Session set for user: ${session_data.name}`
          );
      }
      if (token) {
        setJWT_Cookie(res, token);
        isDebug && console.log(`✅${displayName}JWT cookie set`);
      }
    }

    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🚩🚩🚩${displayName}[COMPLETED]`);
  }
};

export default user_signUp_cntrl;
