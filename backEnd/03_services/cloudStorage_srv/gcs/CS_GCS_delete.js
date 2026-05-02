import { GCS_BUCKET_NAME } from "../../../00_config/_config.index.js";
import { gcs_resolveBucketKey } from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_GCS_delete.js | ";

/**
 * Removes one object from the bucket.
 *
 * @param {{ objectKey: string, ignoreNotFound?: boolean }} params
 * @param {boolean} isDebug
 * @returns {Promise<{ success: boolean, message: string, data?: { bucket: string, objectKey: string } }>}
 */

const CS_GCS_delete = async (params, isDebug = false) => {
  const resolveBucketKey = gcs_resolveBucketKey(params?.objectKey);
  if (!resolveBucketKey.ok) {
    return { success: false, message: `${displayName}${resolveBucketKey.message}` };
  }

  const ignoreNotFound = params?.ignoreNotFound === true;

  try {
    const file = resolveBucketKey.bucket.file(resolveBucketKey.key);
    await file.delete();

    return {
      success: true,
      message: "Object deleted",
      data: {
        bucket: GCS_BUCKET_NAME,
        objectKey: resolveBucketKey.key,
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
          objectKey: resolveBucketKey.key,
        },
      };
    }

    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    const msg = error?.errors?.[0]?.message || error?.message || String(error);
    return { success: false, message: `${displayName.trim()} ${msg}` };
  }
};

export default CS_GCS_delete;
