import { r2_resolveClient } from "./r2_resolveClient.js";
import { r2_normalizeObjectKey } from "./r2_normalizeObjectKey.js";

export const r2_resolveClientKey = (objectKey) => {
  const resolved = r2_resolveClient();
  if (!resolved.ok) return { ok: false, message: resolved.message };
  const keyRes = r2_normalizeObjectKey(objectKey);
  if (!keyRes.ok) return { ok: false, message: keyRes.message };
  return {
    ok: true,
    client: resolved.client,
    bucket: resolved.bucket,
    key: keyRes.key,
  };
};
