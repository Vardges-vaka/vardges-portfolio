const AZURE_STORAGE_ACCOUNT_NAME = (process.env.AZURE_STORAGE_ACCOUNT_NAME || "").trim();

const AZURE_STORAGE_ACCOUNT_KEY = (process.env.AZURE_STORAGE_ACCOUNT_KEY || "").trim();

const AZURE_STORAGE_CONTAINER_NAME = (process.env.AZURE_STORAGE_CONTAINER_NAME || "").trim();

const AZURE_RESOURCE_GROUP = (process.env.AZURE_RESOURCE_GROUP || "").trim();

const AZURE_SUBSCRIPTION_ID = (process.env.AZURE_SUBSCRIPTION_ID || "").trim();

const AZURE_TENANT_ID = (process.env.AZURE_TENANT_ID || "").trim();

const AZURE_CLIENT_ID = (process.env.AZURE_CLIENT_ID || "").trim();

const AZURE_CLIENT_SECRET = (process.env.AZURE_CLIENT_SECRET || "").trim();

const AZURE_BLOB_KEY_PREFIX = (
  process.env.AZURE_BLOB_KEY_PREFIX || "vkusno/dev"
).replace(/^\/+|\/+$/g, "");

const AZURE_BLOB_MAX_KEY_LEN = 1024;

/** Azure Blob Storage signed URLs: 7 day ceiling (ms). Env `AZURE_BLOB_EXP_MAX_TIME` cannot exceed this. */
const AZURE_BLOB_EXP_MAX_TIME_HARD_CAP = 7 * 24 * 60 * 60 * 1000 - 1000;

const AZURE_BLOB_EXP_MAX_TIME = Math.min(
  parseInt(process.env.AZURE_BLOB_EXP_MAX_TIME, 10) || 24 * 60 * 60 * 1000, // 24 h default
  AZURE_BLOB_EXP_MAX_TIME_HARD_CAP,
);

const AZURE_BLOB_EXP_DEFAULT_TIME = Math.min(
  parseInt(process.env.AZURE_BLOB_EXP_DEFAULT_TIME, 10) || 3 * 60 * 60 * 1000, // 3 h default
  AZURE_BLOB_EXP_MAX_TIME,
);

export {
  AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_ACCOUNT_KEY,
  AZURE_STORAGE_CONTAINER_NAME,
  AZURE_RESOURCE_GROUP,
  AZURE_SUBSCRIPTION_ID,
  AZURE_TENANT_ID,
  AZURE_CLIENT_ID,
  AZURE_CLIENT_SECRET,
  AZURE_BLOB_KEY_PREFIX,
  AZURE_BLOB_MAX_KEY_LEN,
  AZURE_BLOB_EXP_MAX_TIME,
  AZURE_BLOB_EXP_DEFAULT_TIME,
};
