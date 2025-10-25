import { access_addCodes_srv } from "./_accessCntrl_utils/accessCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
  logger,
} from "../../03_services/_services.index.js";

const isDebug = true;
const displayName = "access_addCodes_cntrl.js";

const access_addCodes_cntrl = async (req, res) => {
  logger.controller.start(displayName, { userId: req.user?.id, ip: req.ip });

  try {
    const { success, message, data } = await access_addCodes_srv(req, isDebug);

    logger.controller.success(displayName, { success, message });
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    logger.controller.error(displayName, error, { userId: req.user?.id });
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    logger.controller.complete(displayName);
  }
};
export default access_addCodes_cntrl;
