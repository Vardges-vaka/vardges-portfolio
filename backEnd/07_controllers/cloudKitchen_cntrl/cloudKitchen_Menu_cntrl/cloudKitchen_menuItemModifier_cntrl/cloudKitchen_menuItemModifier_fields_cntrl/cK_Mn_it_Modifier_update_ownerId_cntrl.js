import { cK_Mn_it_Modifier_update_ownerId_srv } from "../_cloudKitchen_menuItemModifier_cntrl.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../../../03_services/_services.index.js";

const isDebug = true;
const displayName = " | cK_Mn_it_Modifier_update_ownerId_cntrl.js | ";

const cK_Mn_it_Modifier_update_ownerId_cntrl = async (req, res) => {
  isDebug && console.log(`🛑 ↘️ 🏃‍➡️ ${displayName} [STARTED]`);
  try {
    const { success, message, data } = await cK_Mn_it_Modifier_update_ownerId_srv(req, isDebug);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🚩🚩🚩${displayName}[COMPLETED]`);
  }
};

export default cK_Mn_it_Modifier_update_ownerId_cntrl;
