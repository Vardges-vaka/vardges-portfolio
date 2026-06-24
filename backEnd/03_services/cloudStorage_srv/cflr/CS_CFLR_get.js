import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { R2_BUCKET_NAME } from "../../../00_config/_config.index.js";
import { r2_resolveClientKey, r2_getExpTime } from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_CFLR_get.js | ";

const CS_CFLR_get = async (params, isDebug = false) => {
  const resolved = r2_resolveClientKey(params?.objectKey);
  if (!resolved.ok) return { success: false, message: `${displayName}${resolved.message}` };

  try {
    const expiresInSeconds = await r2_getExpTime(params?.timeInHours ?? null);

    const commandInput = { Bucket: resolved.bucket, Key: resolved.key };

    if (params?.downloadFilename) {
      commandInput.ResponseContentDisposition = `attachment; filename="${String(params.downloadFilename).replace(/"/g, "'")}"`;
    }

    const readUrl = await getSignedUrl(
      resolved.client,
      new GetObjectCommand(commandInput),
      { expiresIn: expiresInSeconds },
    );

    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString();

    return {
      success: true,
      message: "Signed read URL issued",
      data: { bucket: R2_BUCKET_NAME, objectKey: resolved.key, readUrl, expiresAt, method: "GET" },
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    return { success: false, message: `${displayName.trim()} ${error?.message || String(error)}` };
  }
};

export default CS_CFLR_get;
