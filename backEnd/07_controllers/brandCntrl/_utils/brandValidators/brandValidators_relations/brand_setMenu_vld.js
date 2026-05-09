import { validateBrandTargetId } from "./brand_relation_vld_helpers.js";

const displayName = " | brand_setMenu_vld.js | ";

export const brand_setMenu_vld = async (req) =>
  validateBrandTargetId(req, { displayName, paramName: "menuId" });
