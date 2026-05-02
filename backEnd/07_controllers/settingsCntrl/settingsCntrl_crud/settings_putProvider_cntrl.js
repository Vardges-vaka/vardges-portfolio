import { settings_putProvider_srv } from "../_utils/settingsServices/settings_putProvider_srv.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const displayName = " | settings_putProvider_cntrl.js | ";

const settings_putProvider_cntrl = async (req, res) => {
  const isDebug = true;
  try {
    const { success, message, data } = await settings_putProvider_srv(
      req,
      isDebug,
    );
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  }
};

export default settings_putProvider_cntrl;
