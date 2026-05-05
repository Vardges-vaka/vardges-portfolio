import { S3Client } from "@aws-sdk/client-s3";
import {
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_ENDPOINT,
  R2_BUCKET_NAME,
} from "../../../00_config/_config.index.js";

let _cache = null;

export const r2_resolveClient = () => {
  if (_cache) return { ok: true, ..._cache };
  if (!R2_ACCESS_KEY_ID)
    return { ok: false, message: "R2_ACCESS_KEY_ID missing — check .env" };
  if (!R2_SECRET_ACCESS_KEY)
    return { ok: false, message: "R2_SECRET_ACCESS_KEY missing — check .env" };
  if (!R2_ENDPOINT)
    return { ok: false, message: "R2_ENDPOINT missing — check .env" };
  if (!R2_BUCKET_NAME)
    return { ok: false, message: "R2_BUCKET_NAME missing — check .env" };

  const client = new S3Client({
    region: "auto",
    endpoint: R2_ENDPOINT,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
  _cache = { client, bucket: R2_BUCKET_NAME };
  return { ok: true, client, bucket: R2_BUCKET_NAME };
};
