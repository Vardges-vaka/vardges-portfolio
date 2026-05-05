import { Settings } from "../../../06_models/_models.index.js";
import { AZURE_BLOB_EXP_DEFAULT_TIME, AZURE_BLOB_EXP_MAX_TIME } from "../../../00_config/_config.index.js";

const MIN_TTL_MS = 60_000;
const clampMs = (ms, minMs, maxMs) => Math.min(Math.max(ms, minMs), maxMs);

export const msft_getExpTime = async (requestedTimeInHours = null) => {
  const defaultTtlMs = clampMs(AZURE_BLOB_EXP_DEFAULT_TIME, MIN_TTL_MS, AZURE_BLOB_EXP_MAX_TIME);

  const h = Number(requestedTimeInHours);
  const hasValidHours = requestedTimeInHours != null && Number.isFinite(h) && h > 0;

  if (!hasValidHours) return new Date(Date.now() + defaultTtlMs);

  let doc = null;
  try { doc = await Settings.findOne({}).lean(); } catch { return new Date(Date.now() + defaultTtlMs); }

  const customAllowed = doc?.storage?.blob?.customExpTime === true;
  if (!customAllowed) return new Date(Date.now() + defaultTtlMs);

  const ttlMs = clampMs(h * 60 * 60 * 1000, MIN_TTL_MS, AZURE_BLOB_EXP_MAX_TIME);
  return new Date(Date.now() + ttlMs);
};
