import { validateBrandTargetId } from "./brand_relation_vld_helpers.js";

const displayName = " | brand_unlinkBranch_vld.js | ";

export const brand_unlinkBranch_vld = async (req) =>
  validateBrandTargetId(req, { displayName, paramName: "branchId" });
