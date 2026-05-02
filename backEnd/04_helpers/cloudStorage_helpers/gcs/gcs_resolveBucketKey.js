import { gcs_resolveBucket } from "./gcs_resolveBucket.js";
import { gcs_normalizeObjectKey } from "./gcs_objectKey_normalize.js";

/**
 * Combined env/bucket resolution + objectKey normalization.
 * Used by every GCS service (put, get, delete) — they all need the same pair.
 *
 * @param {string} objectKey
 * @returns {{ ok: true, bucket: import("@google-cloud/storage").Bucket, key: string } | { ok: false, message: string }}
 */

export const gcs_resolveBucketKey = (objectKey) => {
  const resolved = gcs_resolveBucket();
  if (!resolved.ok) return { ok: false, message: resolved.message };

  const keyRes = gcs_normalizeObjectKey(objectKey);
  if (!keyRes.ok) return { ok: false, message: keyRes.message };

  return { ok: true, bucket: resolved.bucket, key: keyRes.key };
};
