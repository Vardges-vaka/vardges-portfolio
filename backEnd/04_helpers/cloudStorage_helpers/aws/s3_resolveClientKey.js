import { s3_resolveClient } from "./s3_resolveClient.js";
import { s3_normalizeObjectKey } from "./s3_normalizeObjectKey.js";

export const s3_resolveClientKey = (objectKey) => {
  const resolved = s3_resolveClient();
  if (!resolved.ok) return { ok: false, message: resolved.message };

  const keyRes = s3_normalizeObjectKey(objectKey);
  if (!keyRes.ok) return { ok: false, message: keyRes.message };

  return {
    ok: true,
    client: resolved.client,
    bucket: resolved.bucket,
    region: resolved.region,
    key: keyRes.key,
  };
};
