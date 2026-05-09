import { Branch, Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { populateBrandById } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_unlinkBranch_srv.js | ";

export const brand_unlinkBranch_srv = async (req, isDebug) => {
  try {
    const { id, branchId } = req.body.sanitizedData;
    await Promise.all([
      Brand.findByIdAndUpdate(id, { $pull: { branches: branchId } }),
      Branch.findByIdAndUpdate(branchId, { $pull: { brands: id } }),
    ]);

    const populated = await populateBrandById(id);
    if (!populated) return { success: false, message: "Brand not found", data: null };
    return { success: true, message: "Branch unlinked successfully", data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
