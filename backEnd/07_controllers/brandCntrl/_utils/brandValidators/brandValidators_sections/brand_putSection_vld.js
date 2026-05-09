import { validateSectionRoute } from "./brand_section_vld_helpers.js";

const displayName = " | brand_putSection_vld.js | ";

export const brand_putSection_vld = async (req) =>
  validateSectionRoute(req, { displayName, mode: "put" });
