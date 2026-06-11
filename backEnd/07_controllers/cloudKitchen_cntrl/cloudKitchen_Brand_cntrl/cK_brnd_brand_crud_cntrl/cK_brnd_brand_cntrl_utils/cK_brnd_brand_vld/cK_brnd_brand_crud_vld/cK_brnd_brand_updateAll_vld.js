import { request_success } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_brnd_brand_updateAll_vld.js | ";
const isDebug = true;

// TODO: real field validation. For now pass the body through (shallow copy so
// the middleware's req.body.sanitizedData assignment can't create a cycle).
export const cK_brnd_brand_updateAll_vld = async (req) => {
  const data = { ...(req.body?.body_Data || req.body || {}) };
  return request_success(displayName, isDebug, data);
};
