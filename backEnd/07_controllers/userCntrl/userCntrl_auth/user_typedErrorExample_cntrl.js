import { user_typedErrorExample_srv } from "../_utils/userCntrl_utils.index.js";
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const displayName = " | user_typedErrorExample_cntrl.js | |<=>| ";
const isDebug = true;

/**
 * Controller demonstrating typed error handling
 * Tests all error types: validation (400), unauthorized (401), not found (404), duplicate (409)
 *
 * Expected request body:
 * - email: string (required)
 * - password: string (required for 'protected' action)
 * - action: 'find' | 'create' | 'protected' | undefined
 */
const user_typedErrorExample_cntrl = async (req, res) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { success, message, data } = await user_typedErrorExample_srv(
      req,
      isDebug
    );

    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  }
};

export default user_typedErrorExample_cntrl;
