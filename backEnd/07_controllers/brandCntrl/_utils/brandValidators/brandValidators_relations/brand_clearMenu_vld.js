import { validateBrandBaseId } from "./brand_relation_vld_helpers.js";

const displayName = " | brand_clearMenu_vld.js | ";

export const brand_clearMenu_vld = async (req) =>
  validateBrandBaseId(req, displayName);
