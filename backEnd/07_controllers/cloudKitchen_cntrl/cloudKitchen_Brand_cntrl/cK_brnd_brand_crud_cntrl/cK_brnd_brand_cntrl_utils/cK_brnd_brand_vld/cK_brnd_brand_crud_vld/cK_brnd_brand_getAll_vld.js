import { request_success } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_brnd_brand_getAll_vld.js | ";
const isDebug = true;

// No input to validate for getAll (yet). Pass through; filters/projection
// will be added here once the frontend decides what it needs.
export const cK_brnd_brand_getAll_vld = async (req) => {
  return request_success(displayName, isDebug, {});
};
