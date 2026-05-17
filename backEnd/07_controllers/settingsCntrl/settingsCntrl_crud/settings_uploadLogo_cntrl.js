import { settings_uploadLogo_srv } from "../_utils/settingsServices/settings_uploadLogo_srv.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";
import { cleanupTempFile } from "../../../02_utils/_utils.index.js";

const displayName = " | settings_uploadLogo_cntrl.js | ";

const settings_uploadLogo_cntrl = async (req, res) => {
  const isDebug = true;
  try {
    const { success, message, data } = await settings_uploadLogo_srv(
      req,
      isDebug,
    );
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    await cleanupTempFile(req.file?.path, isDebug);
  }
};

export default settings_uploadLogo_cntrl;
