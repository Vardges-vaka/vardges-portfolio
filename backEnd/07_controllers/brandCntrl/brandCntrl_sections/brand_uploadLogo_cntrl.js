import { brand_uploadLogo_srv } from "../_utils/brandCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";
import { cleanupTempFile } from "../../../02_utils/utils.index.js";

const isDebug = true;
const displayName = " | brand_uploadLogo_cntrl.js | ";

const brand_uploadLogo_cntrl = async (req, res) => {
  try {
    const { success, message, data } = await brand_uploadLogo_srv(req, isDebug);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    cleanupTempFile(req.file);
  }
};

export default brand_uploadLogo_cntrl;
