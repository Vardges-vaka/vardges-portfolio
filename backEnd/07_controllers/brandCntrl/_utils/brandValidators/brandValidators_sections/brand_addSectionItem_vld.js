import { validateSectionRoute } from "./brand_section_vld_helpers.js";

const displayName = " | brand_addSectionItem_vld.js | ";

export const brand_addSectionItem_vld = async (req) =>
  validateSectionRoute(req, { displayName, mode: "addItem" });
