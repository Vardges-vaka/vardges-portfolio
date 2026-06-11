import { request_success } from "../../../../../../../03_services/_services.index.js";

const displayName = " | cK_gen_cuisineTag_updateAll_vld.js | ";
const isDebug = true;

export const cK_gen_cuisineTag_updateAll_vld = async (req) => {
  const data = { ...(req.body?.body_Data || req.body || {}) };
  return request_success(displayName, isDebug, data);
};
