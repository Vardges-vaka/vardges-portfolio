import {
  request_failed,
  request_success,
} from "../../../../../../../03_services/_services.index.js";
import { isValidObjectId } from "../../../../../cloudKitchen_Brand_cntrl/cK_brnd_brand_crud_cntrl/cK_brnd_brand_cntrl_utils/cK_brnd_brand_hlprs/cK_brnd_brand_files_hlprs.js";

const displayName = " | cK_gen_salesPlatform_get_fileReadUrl_vld.js | ";
const isDebug = true;

export const cK_gen_salesPlatform_get_fileReadUrl_vld = async (req) => {
  const { id } = req.params;
  const objectKey =
    typeof req.query?.objectKey === "string" ? req.query.objectKey.trim() : "";

  if (!isValidObjectId(id)) {
    return request_failed("Invalid sales platform id", displayName, isDebug);
  }

  if (!objectKey) {
    return request_failed("objectKey query param is required", displayName, isDebug);
  }

  const wantsDownload =
    req.query?.download === "1" || req.query?.download === "true";
  const downloadFilename =
    wantsDownload && typeof req.query?.filename === "string"
      ? req.query.filename.trim()
      : "";

  return request_success(displayName, isDebug, {
    id,
    objectKey,
    wantsDownload,
    downloadFilename,
  });
};
