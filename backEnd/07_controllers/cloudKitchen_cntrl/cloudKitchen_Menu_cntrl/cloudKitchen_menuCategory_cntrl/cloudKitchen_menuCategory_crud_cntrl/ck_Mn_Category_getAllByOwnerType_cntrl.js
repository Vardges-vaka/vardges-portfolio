import { ck_Mn_Category_getAllByOwnerType_srv } from "../_cloudKitchen_menuCategory_cntrl.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../../../03_services/_services.index.js";

const isDebug = true;
const displayName =
  " | ck_Mn_Category_getAllByOwnerType_cntrl.js | ";

const ck_Mn_Category_getAllByOwnerType_cntrl = async (req, res) => {
  isDebug && console.log(`🛑 ↘️ 🏃‍➡️ ${displayName} [STARTED]`);
  try {
    const { success, message, data } =
      await ck_Mn_Category_getAllByOwnerType_srv(req, isDebug);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🚩🚩🚩${displayName}[COMPLETED]`);
  }
};

export default ck_Mn_Category_getAllByOwnerType_cntrl;
