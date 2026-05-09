import { validateSectionRoute } from "./brand_section_vld_helpers.js";

const displayName = " | brand_removeSectionItem_vld.js | ";

export const brand_removeSectionItem_vld = async (req) =>
  validateSectionRoute(req, { displayName, mode: "removeItem" });
