import { request_success } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_gen_cuisineTag_create_vld.js | ";
const isDebug = true;

// TODO: real validation. Pass-through (shallow copy avoids a req.body cycle).
export const cK_gen_cuisineTag_create_vld = async (req) => {
  const data = { ...(req.body?.body_Data || req.body || {}) };
  return request_success(displayName, isDebug, data);
};
