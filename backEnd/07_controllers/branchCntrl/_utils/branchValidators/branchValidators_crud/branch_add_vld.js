import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";

const displayName = " | branch_add_vld.js | ";
const isDebug = true;

export const branch_add_vld = async (req) => {
  const data = req.body.body_Data || req.body;
  const { name, ...rest } = data;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return request_failed("Branch name is required", req.body, displayName, isDebug);
  }

  const sanitizedData = {
    name: name.trim(),
    ...rest,
  };

  return request_success(displayName, isDebug, sanitizedData);
};
