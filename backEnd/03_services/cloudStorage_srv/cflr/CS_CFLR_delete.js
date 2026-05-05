import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { R2_BUCKET_NAME } from "../../../00_config/_config.index.js";
import { r2_resolveClientKey } from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_CFLR_delete.js | ";

const CS_CFLR_delete = async (params, isDebug = false) => {
  const resolved = r2_resolveClientKey(params?.objectKey);
  if (!resolved.ok) return { success: false, message: `${displayName}${resolved.message}` };

  try {
    await resolved.client.send(
      new DeleteObjectCommand({ Bucket: resolved.bucket, Key: resolved.key })
    );
    return {
      success: true,
      message: "Object deleted",
      data: { bucket: R2_BUCKET_NAME, objectKey: resolved.key },
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    return { success: false, message: `${displayName.trim()} ${error?.message || String(error)}` };
  }
};

export default CS_CFLR_delete;
