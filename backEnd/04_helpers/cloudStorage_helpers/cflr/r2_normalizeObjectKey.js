import { R2_MAX_KEY_LEN } from "../../../00_config/_config.index.js";

export const r2_normalizeObjectKey = (key) => {
  const k = String(key ?? "").trim();
  if (!k) return { ok: false, message: "objectKey is required" };
  if (k.length > R2_MAX_KEY_LEN)
    return { ok: false, message: "objectKey exceeds max length" };
  if (k.startsWith("/") || k.includes("..") || k.includes("\\"))
    return { ok: false, message: "invalid objectKey" };
  return { ok: true, key: k };
};
