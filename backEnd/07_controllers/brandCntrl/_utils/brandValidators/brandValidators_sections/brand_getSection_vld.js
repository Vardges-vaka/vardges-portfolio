import { validateSectionRoute } from "./brand_section_vld_helpers.js";

const displayName = " | brand_getSection_vld.js | ";

export const brand_getSection_vld = async (req) =>
  validateSectionRoute(req, { displayName, mode: "get" });
