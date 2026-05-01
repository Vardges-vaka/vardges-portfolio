import { GCS_BUCKET_NAME } from "../../../00_config/_config.index.js";
import {
  gcs_resolveBucket,
  gcs_normalizeObjectKey,
  gcs_getExpTime,
} from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_GCS_get.js | ";

/**
 * V4 signed URL for **GET** (private bucket — time-limited read).
 *
 * @param {{ objectKey: string, timeInHours?: number|null }} params
 * @param {boolean} isDebug
 * @returns {Promise<{ success: boolean, message: string, data?: { bucket: string, objectKey: string, readUrl: string, expiresAt: string, method: string } }>}
 */

const CS_GCS_get = async (params, isDebug = false) => {
  const resolved = gcs_resolveBucket();
  if (!resolved.ok) {
    return { success: false, message: `${displayName}${resolved.message}` };
  }

  const keyRes = gcs_normalizeObjectKey(params?.objectKey);
  if (!keyRes.ok) {
    return { success: false, message: `${displayName}${keyRes.message}` };
  }

  const { bucket } = resolved;

  try {
    const timeInHours = params?.timeInHours || null;
    const expiresAtMs = await gcs_getExpTime(timeInHours);

    const file = bucket.file(keyRes.key);

    const [readUrl] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: expiresAtMs,
    });

    return {
      success: true,
      message: "Signed read URL issued",
      data: {
        bucket: GCS_BUCKET_NAME,
        objectKey: keyRes.key,
        readUrl,
        expiresAt: new Date(expiresAtMs).toISOString(),
        method: "GET",
      },
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    const msg = error?.errors?.[0]?.message || error?.message || String(error);
    return { success: false, message: `${displayName.trim()} ${msg}` };
  }
};

export default CS_GCS_get;
