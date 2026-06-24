import {
  request_failed,
  request_success,
} from "../../../../../../../03_services/_services.index.js";
import {
  isValidObjectId,
  normalizeFilesPayload,
  parseJsonField,
  parseUploadItemIndexes,
  validateUploadedFile,
} from "../../cK_brnd_brand_hlprs/cK_brnd_brand_files_hlprs.js";

const displayName = " | cK_brnd_brand_update_files_vld.js | ";
const isDebug = true;

export const cK_brnd_brand_update_files_vld = async (req) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return request_failed("Invalid brand id", displayName, isDebug);
  }

  const filesMetaParsed = parseJsonField(req.body?.filesMeta, "filesMeta");
  if (!filesMetaParsed.ok) {
    return request_failed(filesMetaParsed.message, displayName, isDebug);
  }

  const files = normalizeFilesPayload(filesMetaParsed.value);
  const uploads = Array.isArray(req.files) ? req.files : [];

  for (let index = 0; index < uploads.length; index += 1) {
    const fileCheck = validateUploadedFile(
      uploads[index],
      `files[${index}]`,
    );
    if (!fileCheck.ok) {
      return request_failed(fileCheck.message, displayName, isDebug);
    }
  }

  const indexesParsed = parseUploadItemIndexes(
    req.body?.uploadItemIndexes,
    uploads.length,
  );
  if (!indexesParsed.ok) {
    return request_failed(indexesParsed.message, displayName, isDebug);
  }

  for (const itemIndex of indexesParsed.value) {
    if (itemIndex >= files.items.length) {
      return request_failed(
        `uploadItemIndexes references missing items[${itemIndex}]`,
        displayName,
        isDebug,
      );
    }
  }

  return request_success(displayName, isDebug, {
    id,
    files,
    uploads,
    uploadItemIndexes: indexesParsed.value,
  });
};
