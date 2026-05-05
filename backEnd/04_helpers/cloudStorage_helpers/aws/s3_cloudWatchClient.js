import { CloudWatchClient } from "@aws-sdk/client-cloudwatch";
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
} from "../../../00_config/_config.index.js";

let _cache = null;

export const s3_cloudWatchClient = () => {
  if (_cache) return { ok: true, ..._cache };

  if (!AWS_ACCESS_KEY_ID)
    return { ok: false, message: "AWS_ACCESS_KEY_ID missing" };
  if (!AWS_SECRET_ACCESS_KEY)
    return { ok: false, message: "AWS_SECRET_ACCESS_KEY missing" };
  if (!AWS_REGION)
    return { ok: false, message: "AWS_REGION missing" };
  if (!AWS_S3_BUCKET_NAME)
    return { ok: false, message: "AWS_S3_BUCKET_NAME missing" };

  const client = new CloudWatchClient({
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
