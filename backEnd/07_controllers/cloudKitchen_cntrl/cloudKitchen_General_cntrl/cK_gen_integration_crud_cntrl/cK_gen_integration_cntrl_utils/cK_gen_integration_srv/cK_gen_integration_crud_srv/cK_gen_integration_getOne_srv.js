import { Integration } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";
import {
  INTEGRATION_DETAIL_POPULATE,
  INTEGRATION_LOGIN_CREDENTIAL_SELECT,
} from "../../cK_gen_integration_hlpr/cK_gen_integration_credentials_hlprs.js";

const displayName = " | cK_gen_integration_getOne_srv.js | ";

export const cK_gen_integration_getOne_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.params;
    let query = Integration.findById(id).select(
      INTEGRATION_LOGIN_CREDENTIAL_SELECT,
    );

    INTEGRATION_DETAIL_POPULATE.forEach((path) => {
      query = query.populate(path);
    });

    const record = await query.lean();

    if (!record) {
      return { success: false, message: "Integration not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Fetched: ${id}`);

    return {
      success: true,
      message: "Integration fetched successfully",
      data: record,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
