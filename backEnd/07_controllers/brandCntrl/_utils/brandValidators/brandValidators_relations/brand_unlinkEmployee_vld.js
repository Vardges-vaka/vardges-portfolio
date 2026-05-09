import { validateBrandTargetId } from "./brand_relation_vld_helpers.js";

const displayName = " | brand_unlinkEmployee_vld.js | ";

export const brand_unlinkEmployee_vld = async (req) =>
  validateBrandTargetId(req, { displayName, paramName: "employeeId" });
