import { brand_setMenu_srv } from "../_utils/brandCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const isDebug = true;
const displayName = " | brand_setMenu_cntrl.js | ";

const brand_setMenu_cntrl = async (req, res) => {
  try {
    const { success, message, data } = await brand_setMenu_srv(req, isDebug);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  }
};

export default brand_setMenu_cntrl;
