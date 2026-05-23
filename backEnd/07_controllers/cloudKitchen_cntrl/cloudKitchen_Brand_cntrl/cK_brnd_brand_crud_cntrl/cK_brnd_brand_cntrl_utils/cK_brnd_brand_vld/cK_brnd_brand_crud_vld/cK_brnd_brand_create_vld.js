import {
  request_failed,
  request_success,
} from "../../../../../../../03_services/_services.index.js";
import { sample_schemaField_vld_util } from "../../../../../../../02_utils/_utils.index.js";

const displayName = " | cK_brnd_brand_create_vld.js | ";
const isDebug = true;

export const cK_brnd_brand_create_vld = async (req) => {
  const data = req.body.body_Data || req.body;

  const result = sample_schemaField_vld_util(data);
  if (!result.isValid) {
    return request_failed(result.message, displayName, isDebug);
  } else {
    return request_success(displayName, isDebug, result.sanitized);
  }
};
