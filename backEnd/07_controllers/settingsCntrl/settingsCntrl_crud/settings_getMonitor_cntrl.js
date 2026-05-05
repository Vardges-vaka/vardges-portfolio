import { settings_getMonitor_srv } from "../_utils/settingsServices/settings_getMonitor_srv.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const displayName = " | settings_getMonitor_cntrl.js | ";

const settings_getMonitor_cntrl = async (req, res) => {
  const isDebug = false;
  try {
    const { success, message, data } = await settings_getMonitor_srv(
      req,
      isDebug,
    );
    !data && console.log("data____________________________", data);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  }
};

export default settings_getMonitor_cntrl;
