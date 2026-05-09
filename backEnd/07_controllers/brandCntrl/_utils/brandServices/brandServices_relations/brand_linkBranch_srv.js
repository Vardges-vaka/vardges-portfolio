import { Branch, Brand } from "../../../../../06_models/_models.index.js";
import { catch_errorHandler_service } from "../../../../../03_services/_services.index.js";
import { populateBrandById } from "../brandServices_helpers/brand_relationSync_helpers.js";

const displayName = " | brand_linkBranch_srv.js | ";

export const brand_linkBranch_srv = async (req, isDebug) => {
  try {
    const { id, branchId } = req.body.sanitizedData;
    const [brand, branch] = await Promise.all([
      Brand.findById(id),
      Branch.findById(branchId),
    ]);
    if (!brand) return { success: false, message: "Brand not found", data: null };
    if (!branch) return { success: false, message: "Branch not found", data: null };

    await Promise.all([
      Brand.findByIdAndUpdate(id, { $addToSet: { branches: branchId } }),
      Branch.findByIdAndUpdate(branchId, { $addToSet: { brands: id } }),
    ]);

    const populated = await populateBrandById(id);
    return { success: true, message: "Branch linked successfully", data: populated };
  } catch (error) {
    return catch_errorHandler_service(displayName, isDebug, error);
  }
};
