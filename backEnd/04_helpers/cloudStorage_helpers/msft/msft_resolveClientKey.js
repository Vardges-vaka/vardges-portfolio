import { msft_resolveClient }     from "./msft_resolveClient.js";
import { msft_normalizeObjectKey } from "./msft_normalizeObjectKey.js";

export const msft_resolveClientKey = (objectKey) => {
  const resolved = msft_resolveClient();
  if (!resolved.ok) return { ok: false, message: resolved.message };
  const keyRes = msft_normalizeObjectKey(objectKey);
  if (!keyRes.ok) return { ok: false, message: keyRes.message };
  return { ok: true, ...resolved, key: keyRes.key };
};
