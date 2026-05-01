import { GCS_BUCKET_NAME } from "../../../00_config/cloudStorage_config/gcs_config.js";
import {
  gcs_resolveBucket,
  gcs_normalizeObjectKey,
} from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_GCS_delete.js | ";

/**
 * Removes one object from the bucket.
 *
 * @param {{ objectKey: string, ignoreNotFound?: boolean }} params
 * @param {boolean} isDebug
 * @returns {Promise<{ success: boolean, message: string, data?: { bucket: string, objectKey: string } }>}
 */

const CS_GCS_delete = async (params, isDebug = false) => {
  const resolved = gcs_resolveBucket();
  if (!resolved.ok) {
    return { success: false, message: `${displayName}${resolved.message}` };
  }

  const keyRes = gcs_normalizeObjectKey(params?.objectKey);
  if (!keyRes.ok) {
    return { success: false, message: `${displayName}${keyRes.message}` };
  }

  const ignoreNotFound = params?.ignoreNotFound === true;
  const { bucket } = resolved;

  try {
    const file = bucket.file(keyRes.key);
    await file.delete();

    return {
      success: true,
      message: "Object deleted",
      data: {
        bucket: GCS_BUCKET_NAME,
        objectKey: keyRes.key,
      },
    };
  } catch (error) {
    const code = error?.code;
    const is404 =
      code === 404 ||
      code === "404" ||
      String(error?.message || "").includes("No such object");
    if (ignoreNotFound && is404) {
      return {
        success: true,
        message: "Object not found (ignored)",
        data: {
          bucket: GCS_BUCKET_NAME,
          objectKey: keyRes.key,
        },
      };
    }

    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    const msg = error?.errors?.[0]?.message || error?.message || String(error);
    return { success: false, message: `${displayName.trim()} ${msg}` };
  }
};

export default CS_GCS_delete;
