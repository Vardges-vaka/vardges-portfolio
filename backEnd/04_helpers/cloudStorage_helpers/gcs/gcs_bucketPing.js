import { GCS_BUCKET_NAME } from "../../../00_config/_config.index.js";
import { gcs_resolveBucket } from "./gcs_resolveBucket.js";

const displayName = " | gcs_bucketPing.js | ";

// ! Temporary file for testing GCS bucket connectivity.
/**
 * Verifies ADC (`GOOGLE_APPLICATION_CREDENTIALS`) and bucket object IAM:
 * performs a trivial `objects.list` (works with Storage Object Admin on the bucket).
 *
 * Why not `bucket.exists()`? That often requires extra bucket-metadata permissions;
 * listing objects matches what uploads will actually use.
 *
 * @param {boolean} isDebug
 * @returns {Promise<{ success: boolean, message: string, bucket?: string, listedCount?: number }>}
 */

export const gcs_bucketPing = async (isDebug = false) => {
  const resolved = gcs_resolveBucket();
  if (!resolved.ok) {
    return {
      success: false,
      message: `${displayName} ${resolved.message}`,
    };
  }

  try {
    const [files] = await resolved.bucket.getFiles({
      maxResults: 5,
      autoPaginate: false,
    });

    return {
      success: true,
      message: "GCS client authenticated; bucket list succeeded (smoke OK).",
      bucket: GCS_BUCKET_NAME,
      listedCount: files.length,
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    const msg = error?.errors?.[0]?.message || error?.message || String(error);
    return {
      success: false,
      message: `${displayName.trim()} ${msg}`,
    };
  }
};
