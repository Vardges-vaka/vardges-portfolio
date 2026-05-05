import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";
import { AWS_S3_BUCKET_NAME } from "../../../00_config/_config.index.js";
import { s3_resolveClientKey } from "../../../04_helpers/helpers.index.js";

const displayName = " | CS_AWS_put.js | ";
const MULTIPART_THRESHOLD_BYTES = 5 * 1024 * 1024; // 5 MB

const CS_AWS_put = async (params, isDebug = false) => {
  if (!params || typeof params !== "object")
    return { success: false, message: `${displayName}params object is required` };

  const resolved = s3_resolveClientKey(params.objectKey);
  if (!resolved.ok) return { success: false, message: `${displayName}${resolved.message}` };

  const file = params.file;
  const isBuffer = Buffer.isBuffer(file);
  const isPath   = typeof file === "string" && file.length > 0;
  if (!isBuffer && !isPath)
    return { success: false, message: `${displayName}file must be a Buffer or non-empty path string` };

  const size = Number(params.size);
  if (!Number.isFinite(size) || size <= 0)
    return { success: false, message: `${displayName}size must be a positive number` };

  const contentType = String(params.contentType ?? "").trim() || "application/octet-stream";
  const { client, bucket, key } = resolved;

  try {
    const body = isBuffer ? file : fs.createReadStream(file);

    if (isBuffer && size < MULTIPART_THRESHOLD_BYTES) {
      // Small buffer — single PutObject
      await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType }));
    } else {
      // Large buffer or disk stream — multipart via lib-storage
      const upload = new Upload({
        client,
        params: { Bucket: bucket, Key: key, Body: body, ContentType: contentType },
      });
      await upload.done();
    }

    return {
      success: true,
      message: "Object uploaded",
      data: { bucket: AWS_S3_BUCKET_NAME, objectKey: key, contentType, bytes: size },
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [FAIL]`, error?.message || error);
    return { success: false, message: `${displayName.trim()} ${error?.message || String(error)}` };
  }
};

export default CS_AWS_put;
