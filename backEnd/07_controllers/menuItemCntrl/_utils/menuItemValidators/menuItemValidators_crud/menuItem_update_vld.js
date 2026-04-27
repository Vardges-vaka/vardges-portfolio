import mongoose from "mongoose";
import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { validateMenuItemFields } from "../menuItem_fields_vld.js";

const displayName = " | menuItem_update_vld.js | ";
const isDebug = true;

export const menuItem_update_vld = async (req) => {
  const id = req.params.id;
  const data = req.body.body_Data || req.body;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return request_failed("Invalid menu item ID", { id }, displayName, isDebug);
  }

  const { _id, __v, createdAt, updatedAt, ...safeData } = data;

  const result = validateMenuItemFields(safeData, { isUpdate: true });
  if (!result.ok) {
    return request_failed(
      result.message,
      { field: result.field },
      displayName,
      isDebug,
    );
  }

  return request_success(displayName, isDebug, { id, ...result.sanitized });
};
