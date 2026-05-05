import { Settings } from "../../../06_models/_models.index.js";
import {
  R2_EXP_DEFAULT_TIME,
  R2_EXP_MAX_TIME,
} from "../../../00_config/_config.index.js";

const SEC_PER_HOUR = 60 * 60;
const MIN_TTL_MS = 60_000;

const clampMs = (ms, minMs, maxMs) => Math.min(Math.max(ms, minMs), maxMs);

export const r2_getExpTime = async (requestedTimeInHours = null) => {
  const defaultTtlMs = clampMs(R2_EXP_DEFAULT_TIME, MIN_TTL_MS, R2_EXP_MAX_TIME);
  const defaultSecs = Math.floor(defaultTtlMs / 1000);

  const h = Number(requestedTimeInHours);
  const hasValidHours =
    requestedTimeInHours != null && Number.isFinite(h) && h > 0;
  if (!hasValidHours) return defaultSecs;

  let doc = null;
  try {
    doc = await Settings.findOne({}).lean();
  } catch {
    return defaultSecs;
  }

  const customAllowed = doc?.storage?.r2?.customExpTime === true;
  if (!customAllowed) return defaultSecs;

  const ttlMs = clampMs(h * SEC_PER_HOUR * 1000, MIN_TTL_MS, R2_EXP_MAX_TIME);
  return Math.floor(ttlMs / 1000);
};
