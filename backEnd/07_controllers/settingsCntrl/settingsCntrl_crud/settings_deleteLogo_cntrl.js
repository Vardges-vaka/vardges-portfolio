import { settings_deleteLogo_srv } from "../_utils/settingsServices/settings_deleteLogo_srv.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const displayName = " | settings_deleteLogo_cntrl.js | ";

const settings_deleteLogo_cntrl = async (req, res) => {
  const isDebug = true;
  try {
    const { success, message, data } = await settings_deleteLogo_srv(
      req,
      isDebug,
    );
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  }
};

export default settings_deleteLogo_cntrl;
