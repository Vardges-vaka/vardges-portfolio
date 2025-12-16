import { project_add_srv } from "./_projectCntrl_utils/_projectCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../03_services/_services.index.js";

const isDebug = true;
const displayName = " | project_add_cntrl.js |<=>| ";

const project_add_cntrl = async (req, res) => {
  isDebug && console.log(`🛑 ↘️ 🏃‍➡️ ${displayName} |<=>| [STARTED]`);

  try {
    const { success, message, data } = await project_add_srv(req, isDebug);

    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🚩🚩🚩${displayName}[COMPLETED]`);
  }
};

export default project_add_cntrl;
