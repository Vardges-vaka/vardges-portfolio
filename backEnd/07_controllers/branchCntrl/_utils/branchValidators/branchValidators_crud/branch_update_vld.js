import mongoose from "mongoose";
import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";

const displayName = " | branch_update_vld.js | ";
const isDebug = true;

export const branch_update_vld = async (req) => {
  const id = req.params.id;
  const data = req.body.body_Data || req.body;
  const { name, ...rest } = data;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return request_failed("Invalid branch ID", { id }, displayName, isDebug);
  }

  if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
    return request_failed("Branch name cannot be empty", { name }, displayName, isDebug);
  }

  const sanitizedData = {
    id,
    ...(name !== undefined && { name: name.trim() }),
    ...rest,
  };

  return request_success(displayName, isDebug, sanitizedData);
};
