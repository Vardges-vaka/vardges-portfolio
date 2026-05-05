import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2_resolveClient } from "./r2_resolveClient.js";

const displayName = " | r2_bucketPing.js | ";

export const r2_bucketPing = async (isDebug = false) => {
  const resolved = r2_resolveClient();
  if (!resolved.ok)
    return { success: false, message: `${displayName} ${resolved.message}` };

  try {
    const response = await resolved.client.send(
      new ListObjectsV2Command({ Bucket: resolved.bucket, MaxKeys: 5 })
    );
    return {
      success: true,
      message:
        "R2 client authenticated; bucket list succeeded (smoke OK).",
      bucket: resolved.bucket,
      listedCount: response.Contents?.length ?? 0,
    };
  } catch (error) {
    isDebug &&
      console.error(`${displayName} [FAIL]`, error?.message || error);
    return {
      success: false,
      message: `${displayName.trim()} ${error?.message || String(error)}`,
    };
  }
};
