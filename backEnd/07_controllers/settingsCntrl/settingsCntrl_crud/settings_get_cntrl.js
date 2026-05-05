import { settings_get_srv } from "../_utils/settingsServices/settings_get_srv.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const displayName = " | settings_get_cntrl.js | ";
const isDebug = false;

const settings_get_cntrl = async (req, res) => {
  try {
    const { success, message, data } = await settings_get_srv(req, isDebug);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  }
};

export default settings_get_cntrl;
