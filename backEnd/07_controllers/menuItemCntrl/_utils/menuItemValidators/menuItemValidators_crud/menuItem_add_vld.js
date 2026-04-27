import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { validateMenuItemFields } from "../menuItem_fields_vld.js";

const displayName = " | menuItem_add_vld.js | ";
const isDebug = true;

export const menuItem_add_vld = async (req) => {
  const data = req.body.body_Data || req.body;
  const { _id, __v, createdAt, updatedAt, ...safeData } = data;

  const result = validateMenuItemFields(safeData, { isUpdate: false });
  if (!result.ok) {
    return request_failed(
      result.message,
      { field: result.field },
      displayName,
      isDebug,
    );
  }

  return request_success(displayName, isDebug, result.sanitized);
};
