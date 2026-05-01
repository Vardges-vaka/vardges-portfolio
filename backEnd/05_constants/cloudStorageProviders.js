/** Keys must stay in sync with `Settings.storage` and Branch `cloudStorage`.
 * s3 → aws, // Amazon S3
 * r2 → cflr, // Cloudflare R2
 * blob → msft, // Microsoft Azure Blob Storage
 * gcs → gcs, // Google Cloud Storage
 */

export const CLOUD_STORAGE_PROVIDERS = /** @type {const} */ ([
  "s3",
  "gcs",
  "r2",
  "blob",
]);
