import { Readable } from "stream";
import fs from "fs";
import { AZURE_STORAGE_CONTAINER_NAME } from "../../../00_config/_config.index.js";
import { msft_resolveClientKey } from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_MSFT_put.js | ";
const STREAM_THRESHOLD = 5 * 1024 * 1024;

const CS_MSFT_put = async (params, isDebug = false) => {
  if (!params || typeof params !== "object")
    return { success: false, message: `${displayName}params object is required` };

  const resolved = msft_resolveClientKey(params.objectKey);
  if (!resolved.ok) return { success: false, message: `${displayName}${resolved.message}` };

  const file = params.file;
  const isBuffer = Buffer.isBuffer(file);
  const isPath   = typeof file === "string" && file.length > 0;
  if (!isBuffer && !isPath)
    return { success: false, message: `${displayName}file must be a Buffer or non-empty path string` };

  const size = Number(params.size);
  if (!Number.isFinite(size) || size <= 0)
    return { success: false, message: `${displayName}size must be a positive number` };

  const contentType = String(params.contentType ?? "").trim() || "application/octet-stream";
  const blobClient  = resolved.containerClient.getBlockBlobClient(resolved.key);
  const options     = { blobHTTPHeaders: { blobContentType: contentType } };

  try {
    if (isBuffer && size < STREAM_THRESHOLD) {
      await blobClient.uploadData(file, options);
    } else {
      const stream = isBuffer ? Readable.from(file) : fs.createReadStream(file);
      await blobClient.uploadStream(stream, 4 * 1024 * 1024, 5, options);
    }
    return {
      success: true,
      message: "Object uploaded",
      data: { bucket: AZURE_STORAGE_CONTAINER_NAME, objectKey: resolved.key, contentType, bytes: size },
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    return { success: false, message: `${displayName.trim()} ${error?.message || String(error)}` };
  }
};

export default CS_MSFT_put;
