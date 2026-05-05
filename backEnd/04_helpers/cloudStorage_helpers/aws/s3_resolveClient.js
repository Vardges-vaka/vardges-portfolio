import { S3Client } from "@aws-sdk/client-s3";
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
} from "../../../00_config/_config.index.js";

let _cache = null;

export const s3_resolveClient = () => {
  if (_cache) return { ok: true, ..._cache };

  if (!AWS_ACCESS_KEY_ID)
    return { ok: false, message: "AWS_ACCESS_KEY_ID missing — check .env" };
  if (!AWS_SECRET_ACCESS_KEY)
    return {
      ok: false,
      message: "AWS_SECRET_ACCESS_KEY missing — check .env",
    };
  if (!AWS_REGION)
    return { ok: false, message: "AWS_REGION missing — check .env" };
  if (!AWS_S3_BUCKET_NAME)
    return { ok: false, message: "AWS_S3_BUCKET_NAME missing — check .env" };

  const client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
  _cache = { client, bucket: AWS_S3_BUCKET_NAME, region: AWS_REGION };
  return {
    ok: true,
    client,
    bucket: AWS_S3_BUCKET_NAME,
    region: AWS_REGION,
  };
};
