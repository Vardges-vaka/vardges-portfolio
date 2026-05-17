import {
  request_failed,
  request_success,
} from "../../../../../../03_services/_services.index.js";
import { sample_schemaField_vld_util } from "../../../../../../02_utils/_utils.index.js";

const displayName = " | XXX_vld.js | ";
const isDebug = true;

export const XXX_vld = async (req) => {
  const data = req.body.body_Data || req.body;

  const result = sample_schemaField_vld_util(data);
  if (!result.isValid) {
    return request_failed(result.message, displayName, isDebug);
  } else {
    return request_success(displayName, isDebug, result.sanitized);
  }
};

// cloudKitchen_menu_create
// cloudKitchen_menu_getAll
// cloudKitchen_menu_getOne
// cloudKitchen_menu_updateAll
// cloudKitchen_menu_getCategoriesPopulated
// cloudKitchen_menu_getAllByOwnerType
// cloudKitchen_menu_delete
