const CLOUDFLARE_ACCOUNT_ID = (process.env.CLOUDFLARE_ACCOUNT_ID || "").trim();

const R2_ACCESS_KEY_ID = (process.env.R2_ACCESS_KEY_ID || "").trim();

const R2_SECRET_ACCESS_KEY = (process.env.R2_SECRET_ACCESS_KEY || "").trim();

const R2_BUCKET_NAME = (process.env.R2_BUCKET_NAME || "").trim();

const R2_ENDPOINT = (process.env.R2_ENDPOINT || "").trim();

const CLOUDFLARE_API_TOKEN = (process.env.CLOUDFLARE_API_TOKEN || "").trim();

const R2_KEY_PREFIX = (
  process.env.R2_KEY_PREFIX || "vkusno/dev"
).replace(/^\/+|\/+$/g, "");

const R2_MAX_KEY_LEN = 1024;

/** R2 signed URLs: 7 day ceiling (ms). Env `R2_EXP_MAX_TIME` cannot exceed this. */
const R2_EXP_MAX_TIME_HARD_CAP = 7 * 24 * 60 * 60 * 1000 - 1000;

const R2_EXP_MAX_TIME = Math.min(
  parseInt(process.env.R2_EXP_MAX_TIME, 10) || 24 * 60 * 60 * 1000, // 24 h default
  R2_EXP_MAX_TIME_HARD_CAP,
);

const R2_EXP_DEFAULT_TIME = Math.min(
  parseInt(process.env.R2_EXP_DEFAULT_TIME, 10) || 3 * 60 * 60 * 1000, // 3 h default
  R2_EXP_MAX_TIME,
);

export {
  CLOUDFLARE_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  R2_ENDPOINT,
  CLOUDFLARE_API_TOKEN,
  R2_KEY_PREFIX,
  R2_MAX_KEY_LEN,
  R2_EXP_MAX_TIME,
  R2_EXP_DEFAULT_TIME,
};
