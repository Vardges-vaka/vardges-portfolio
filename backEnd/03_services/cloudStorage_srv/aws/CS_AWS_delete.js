import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { AWS_S3_BUCKET_NAME } from "../../../00_config/_config.index.js";
import { s3_resolveClientKey } from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_AWS_delete.js | ";

const CS_AWS_delete = async (params, isDebug = false) => {
  const resolved = s3_resolveClientKey(params?.objectKey);
  if (!resolved.ok) return { success: false, message: `${displayName}${resolved.message}` };

  try {
    await resolved.client.send(
      new DeleteObjectCommand({ Bucket: resolved.bucket, Key: resolved.key })
    );
    return {
      success: true,
      message: "Object deleted",
      data: { bucket: AWS_S3_BUCKET_NAME, objectKey: resolved.key },
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    return { success: false, message: `${displayName.trim()} ${error?.message || String(error)}` };
  }
};

export default CS_AWS_delete;
