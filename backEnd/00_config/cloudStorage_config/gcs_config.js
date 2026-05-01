const GCS_BUCKET_NAME = (process.env.GCS_BUCKET_NAME || "").trim();

const GCS_APP_CRED_PATH = (
  process.env.GOOGLE_APPLICATION_CREDENTIALS || ""
).trim();

const GCP_PROJECT_ID = (process.env.GCP_PROJECT_ID || "").trim();

const GCS_OBJECT_KEY_PREFIX = (
  process.env.GCS_OBJECT_KEY_PREFIX || "vkusno/dev"
).replace(/^\/+|\/+$/g, "");

const GCS_MAX_KEY_LEN = 1024;

/** Google V4 signed URLs: ~7 day ceiling (ms). Env `GCS_EXP_MAX_TIME` cannot exceed this. */
const GCS_EXP_MAX_TIME_HARD_CAP = 7 * 24 * 60 * 60 * 1000 - 1000;

const GCS_EXP_MAX_TIME = Math.min(
  parseInt(process.env.GCS_EXP_MAX_TIME, 10) || 24 * 60 * 60 * 1000, // 24 h default
  GCS_EXP_MAX_TIME_HARD_CAP,
);

const GCS_EXP_DEFAULT_TIME = Math.min(
  parseInt(process.env.GCS_EXP_DEFAULT_TIME, 10) || 3 * 60 * 60 * 1000, // 3 h default
  GCS_EXP_MAX_TIME,
);

export {
  GCS_BUCKET_NAME,
  GCS_APP_CRED_PATH,
  GCP_PROJECT_ID,
  GCS_OBJECT_KEY_PREFIX,
  GCS_MAX_KEY_LEN,
  GCS_EXP_MAX_TIME,
  GCS_EXP_DEFAULT_TIME,
  GCS_EXP_MAX_TIME_HARD_CAP,
};
