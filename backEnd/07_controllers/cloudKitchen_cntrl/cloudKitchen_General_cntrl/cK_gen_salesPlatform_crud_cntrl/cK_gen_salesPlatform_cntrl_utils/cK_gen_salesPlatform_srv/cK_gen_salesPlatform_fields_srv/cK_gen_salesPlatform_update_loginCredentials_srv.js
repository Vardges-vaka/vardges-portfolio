import { SalesPlatform } from "../../../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../../../03_services/_services.index.js";
import { pruneEmptyDeep } from "../../../../_cK_gen_shared/cK_gen_crud_srv_utils.js";
import { SALES_PLATFORM_LOGIN_CREDENTIAL_SELECT } from "../../cK_gen_salesPlatform_hlpr/cK_gen_salesPlatform_credentials_hlprs.js";

const displayName = " | cK_gen_salesPlatform_update_loginCredentials_srv.js | ";

export const cK_gen_salesPlatform_update_loginCredentials_srv = async (req, isDebug) => {
  isDebug && console.log(`▄︻デ══━一💥${displayName}[STARTED]`);
  isDebug && console.log(`💾${displayName}[REQUEST]`, req.body.sanitizedData);

  try {
    const { id } = req.params;
    const clean = pruneEmptyDeep(req.body.sanitizedData) || {};

    const updated = await SalesPlatform.findByIdAndUpdate(id, clean, {
      new: true,
      runValidators: true,
    })
      .select(SALES_PLATFORM_LOGIN_CREDENTIAL_SELECT)
      .lean();

    if (!updated) {
      return { success: false, message: "Sales platform not found", data: null };
    }

    isDebug && console.log(`✅${displayName}Updated: ${updated._id}`);

    return {
      success: true,
      message: "Sales platform updated successfully",
      data: updated,
    };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  } finally {
    isDebug && console.log(`🏁🏁🏁${displayName}[COMPLETED]`);
  }
};
