import { Settings } from "../../../06_models/_models.index.js";
import {
  GCS_EXP_MAX_TIME,
  GCS_EXP_DEFAULT_TIME,
} from "../../../00_config/cloudStorage_config/gcs_config.js";

const MS_PER_HOUR = 60 * 60 * 1000;
const MIN_TTL_MS = 60_000;

const clampMs = (ms, minMs, maxMs) => Math.min(Math.max(ms, minMs), maxMs);

export const gcs_getExpTime = async (requestedTimeInHours = null) => {
  let defaultTtlMs = clampMs(
    GCS_EXP_DEFAULT_TIME,
    MIN_TTL_MS,
    GCS_EXP_MAX_TIME,
  );

  let doc = null;
  try {
    doc = await Settings.findOne({}).lean();
  } catch {
    return Date.now() + defaultTtlMs;
  }

  const customAllowed = doc?.storage?.gcs?.customExpTime === true;

  if (!customAllowed) {
    return Date.now() + defaultTtlMs;
  }

  const h = Number(requestedTimeInHours);
  const hasValidHours =
    requestedTimeInHours != null && Number.isFinite(h) && h > 0;

  let ttlMs = defaultTtlMs;
  if (hasValidHours) {
    ttlMs = clampMs(h * MS_PER_HOUR, MIN_TTL_MS, GCS_EXP_MAX_TIME);
  }

  return Date.now() + ttlMs;
};
