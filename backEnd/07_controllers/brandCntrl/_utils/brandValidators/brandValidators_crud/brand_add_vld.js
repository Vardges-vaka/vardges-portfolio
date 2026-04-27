import {
  request_failed,
  request_success,
} from "../../../../../03_services/_services.index.js";
import { validateBrandFields } from "../brand_fields_vld.js";

const displayName = " | brand_add_vld.js | ";
const isDebug = true;

export const brand_add_vld = async (req) => {
  const data = req.body.body_Data || req.body;
  // Strip Mongoose metadata up front — detail-edit flows may re-send subdocs.
  const { _id, __v, createdAt, updatedAt, ...safeData } = data;

  // Run the shared field validator. It enforces `name` required on add.
  const result = validateBrandFields(safeData, { isUpdate: false });
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
