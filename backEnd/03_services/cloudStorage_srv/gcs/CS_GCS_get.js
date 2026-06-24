import { GCS_BUCKET_NAME } from "../../../00_config/_config.index.js";
import {
  gcs_resolveBucketKey,
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
  const resolveBucketKey = gcs_resolveBucketKey(params?.objectKey);
  if (!resolveBucketKey.ok) {
    return { success: false, message: `${displayName}${resolveBucketKey.message}` };
  }

  try {
    const timeInHours = params?.timeInHours || null;
    const expiresAtMs = await gcs_getExpTime(timeInHours);

    const file = resolveBucketKey.bucket.file(resolveBucketKey.key);

    const signedUrlOptions = {
      version: "v4",
      action: "read",
      expires: expiresAtMs,
    };

    if (params?.downloadFilename) {
      signedUrlOptions.responseDisposition = `attachment; filename="${String(params.downloadFilename).replace(/"/g, "'")}"`;
    }

    const [readUrl] = await file.getSignedUrl(signedUrlOptions);

    return {
      success: true,
      message: "Signed read URL issued",
      data: {
        bucket: GCS_BUCKET_NAME,
        objectKey: resolveBucketKey.key,
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
