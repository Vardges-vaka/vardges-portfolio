import { Access } from "../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../03_services/_services.index.js";

const displayName = " | access_getCodes_srv.js | |<=>| ";

export const access_getCodes_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾💾💾${displayName}[REQUEST]`, req);

  try {
    // const access = await Access;
    return {
      success: true,
      message: "",
      data: null,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
