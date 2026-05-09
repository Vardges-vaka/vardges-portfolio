import { validateBrandCreateBranch } from "./brand_relation_vld_helpers.js";

const displayName = " | brand_createBranch_vld.js | ";

export const brand_createBranch_vld = async (req) =>
  validateBrandCreateBranch(req, displayName);
