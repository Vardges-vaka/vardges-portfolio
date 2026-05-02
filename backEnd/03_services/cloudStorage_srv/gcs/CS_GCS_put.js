import { GCS_BUCKET_NAME } from "../../../00_config/_config.index.js";
import {
  gcs_resolveBucketKey,
  gcs_streamUpload,
} from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_GCS_put.js | ";

const RESUMABLE_THRESHOLD_BYTES = 5 * 1024 * 1024;

/**
 * Upserts bytes at `objectKey` (PUT semantics — overwrites existing object).
 *
 * @param {{
 *   objectKey: string,
 *   file: Buffer | string,
 *   size: number,
 *   contentType?: string,
 * }} params
 * @param {boolean} isDebug
 * @returns {Promise<{ success: boolean, message: string, data?: { bucket: string, objectKey: string, contentType: string, bytes: number } }>}
 */

const CS_GCS_put = async (params, isDebug = false) => {
  if (!params || typeof params !== "object") {
    return {
      success: false,
      message: `${displayName}params object is required`,
    };
  }

  const resolveBucketKey = gcs_resolveBucketKey(params.objectKey);
  if (!resolveBucketKey.ok) {
    return {
      success: false,
      message: `${displayName}${resolveBucketKey.message}`,
    };
  }

  const file = params.file;
  const isBuffer = Buffer.isBuffer(file);
  const isPath = typeof file === "string" && file.length > 0;

  if (!isBuffer && !isPath) {
    return {
      success: false,
      message: `${displayName}file must be a Buffer or non-empty path string`,
    };
  }

  const size = Number(params.size);
  if (!Number.isFinite(size) || size <= 0) {
    return {
      success: false,
      message: `${displayName}size must be a positive number`,
    };
  }

  const contentType =
    String(params.contentType ?? "").trim() || "application/octet-stream";

  try {
    const gcsFile = resolveBucketKey.bucket.file(resolveBucketKey.key);

    if (isBuffer) {
      const resumable = size >= RESUMABLE_THRESHOLD_BYTES;
      await gcsFile.save(file, { resumable, contentType });
    } else {
      await gcs_streamUpload(gcsFile, file, contentType);
    }

    return {
      success: true,
      message: "Object uploaded",
      data: {
        bucket: GCS_BUCKET_NAME,
        objectKey: resolveBucketKey.key,
        contentType,
        bytes: size,
      },
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    const msg = error?.errors?.[0]?.message || error?.message || String(error);
    return { success: false, message: `${displayName.trim()} ${msg}` };
  }
};

export default CS_GCS_put;
