import { brand_addSectionItem_srv } from "../_utils/brandCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const isDebug = true;
const displayName = " | brand_addSectionItem_cntrl.js | ";

const brand_addSectionItem_cntrl = async (req, res) => {
  try {
    const { success, message, data } = await brand_addSectionItem_srv(req, isDebug);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  }
};

export default brand_addSectionItem_cntrl;
