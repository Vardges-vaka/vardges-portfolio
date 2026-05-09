import { validateSectionRoute } from "./brand_section_vld_helpers.js";

const displayName = " | brand_updateSectionItem_vld.js | ";

export const brand_updateSectionItem_vld = async (req) =>
  validateSectionRoute(req, { displayName, mode: "updateItem" });
