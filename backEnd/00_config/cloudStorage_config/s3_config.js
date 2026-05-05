const AWS_ACCESS_KEY_ID = (process.env.AWS_ACCESS_KEY_ID || "").trim();

const AWS_SECRET_ACCESS_KEY = (process.env.AWS_SECRET_ACCESS_KEY || "").trim();

const AWS_REGION = (process.env.AWS_REGION || "us-east-1").trim();

const AWS_S3_BUCKET_NAME = (process.env.AWS_S3_BUCKET_NAME || "").trim();

const AWS_S3_KEY_PREFIX = (
  process.env.AWS_S3_KEY_PREFIX || "vkusno/dev"
).replace(/^\/+|\/+$/g, "");

const AWS_S3_MAX_KEY_LEN = 1024;

/** AWS S3 signed URLs: 7 day ceiling (ms). Env `AWS_S3_EXP_MAX_TIME` cannot exceed this. */
const AWS_S3_EXP_MAX_TIME_HARD_CAP = 7 * 24 * 60 * 60 * 1000 - 1000;

const AWS_S3_EXP_MAX_TIME = Math.min(
  parseInt(process.env.AWS_S3_EXP_MAX_TIME, 10) || 24 * 60 * 60 * 1000, // 24 h default
  AWS_S3_EXP_MAX_TIME_HARD_CAP,
);

const AWS_S3_EXP_DEFAULT_TIME = Math.min(
  parseInt(process.env.AWS_S3_EXP_DEFAULT_TIME, 10) || 3 * 60 * 60 * 1000, // 3 h default
  AWS_S3_EXP_MAX_TIME,
);

export {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_S3_KEY_PREFIX,
  AWS_S3_MAX_KEY_LEN,
  AWS_S3_EXP_MAX_TIME,
  AWS_S3_EXP_DEFAULT_TIME,
};
