import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3_resolveClient } from "./s3_resolveClient.js";

const displayName = " | s3_bucketPing.js | ";

export const s3_bucketPing = async (isDebug = false) => {
  const resolved = s3_resolveClient();
  if (!resolved.ok)
    return { success: false, message: `${displayName} ${resolved.message}` };

  try {
    const response = await resolved.client.send(
      new ListObjectsV2Command({ Bucket: resolved.bucket, MaxKeys: 5 })
    );
    return {
      success: true,
      message:
        "S3 client authenticated; bucket list succeeded (smoke OK).",
      bucket: resolved.bucket,
      listedCount: response.Contents?.length ?? 0,
    };
  } catch (error) {
    isDebug &&
      console.error(
        `${displayName} [FAIL]`,
        error?.message || error
      );
    return {
      success: false,
      message: `${displayName.trim()} ${error?.message || String(error)}`,
    };
  }
};
