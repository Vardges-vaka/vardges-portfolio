import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { validateModifierFields } from "../modifier_fields_vld.js";

const displayName = " | modifier_add_vld.js | ";
const isDebug = true;

export const modifier_add_vld = async (req) => {
  const data = req.body.body_Data || req.body;
  const { _id, __v, createdAt, updatedAt, ...safeData } = data;

  const result = validateModifierFields(safeData, { isUpdate: false });
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
