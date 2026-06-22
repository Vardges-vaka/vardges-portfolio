import { request_success } from "../../../../03_services/_services.index.js";

// No body to validate (getAll / getOne / delete).
export const cK_gen_passthroughEmpty_vld = (displayName, isDebug = true) => async () =>
  request_success(displayName, isDebug, {});

// Pass request body through as sanitizedData (create / updateAll / field routes).
export const cK_gen_passthroughBody_vld =
  (displayName, isDebug = true) => async (req) => {
    const data = { ...(req.body?.body_Data || req.body || {}) };
    return request_success(displayName, isDebug, data);
  };
