import { request_success } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_brnd_brand_create_vld.js | ";
const isDebug = true;

// TODO: real field validation. For now pass the body straight through as
// sanitizedData so brands can be created end-to-end. The create service
// prunes empty values before saving.
export const cK_brnd_brand_create_vld = async (req) => {
  // Shallow-copy so sanitizedData is NOT the same object as req.body — the
  // middleware assigns req.body.sanitizedData, which would otherwise create a
  // self-referential cycle on req.body.
  const data = { ...(req.body?.body_Data || req.body || {}) };
  return request_success(displayName, isDebug, data);
};
