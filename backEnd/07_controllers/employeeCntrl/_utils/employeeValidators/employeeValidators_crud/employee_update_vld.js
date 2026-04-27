import mongoose from "mongoose";
import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { validateEmployeeFields } from "../employee_fields_vld.js";

const displayName = " | employee_update_vld.js | ";
const isDebug = true;

export const employee_update_vld = async (req) => {
  const id = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return request_failed("Invalid employee ID", { id }, displayName, isDebug);
  }
  
  const data = req.body.body_Data || req.body;
  const { _id, __v, createdAt, updatedAt, ...safeData } = data;
  const result = validateEmployeeFields(safeData, { isUpdate: true });
  if (!result.ok) {
    return request_failed(result.message, { field: result.field }, displayName, isDebug);
  }
  return request_success(displayName, isDebug, { id, ...result.sanitized });

};
