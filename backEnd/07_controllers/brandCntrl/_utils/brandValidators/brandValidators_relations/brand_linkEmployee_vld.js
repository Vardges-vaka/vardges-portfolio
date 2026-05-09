import { validateBrandTargetId } from "./brand_relation_vld_helpers.js";

const displayName = " | brand_linkEmployee_vld.js | ";

export const brand_linkEmployee_vld = async (req) =>
  validateBrandTargetId(req, { displayName, paramName: "employeeId" });
