import { SalesPlatform } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";
import { SALES_PLATFORM_LOGIN_CREDENTIAL_SELECT } from "../../cK_gen_salesPlatform_hlpr/cK_gen_salesPlatform_credentials_hlprs.js";

const displayName = " | cK_gen_salesPlatform_getOne_srv.js | ";

export const cK_gen_salesPlatform_getOne_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);

  try {
    const { id } = req.params;
    let query = SalesPlatform.findById(id).select(
      SALES_PLATFORM_LOGIN_CREDENTIAL_SELECT,
    );
    const record = await query.lean();

    if (!record) {
      return { success: false, message: "Sales platform not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Fetched: ${id}`);

    return {
      success: true,
      message: "Sales platform fetched successfully",
      data: record,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
