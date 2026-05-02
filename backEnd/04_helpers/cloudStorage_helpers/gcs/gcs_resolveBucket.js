import { Storage } from "@google-cloud/storage";
import {
  GCS_BUCKET_NAME,
  GCS_APP_CRED_PATH,
} from "../../../00_config/_config.index.js";

/**
 * Shared ADC + bucket wiring for GCS services (single place for env checks).
 * Lazy singleton — client is created on first successful call and reused thereafter.
 *
 * @returns {{ ok: true, storage: Storage, bucket: import("@google-cloud/storage").Bucket } | { ok: false, message: string }}
 */

let _cache = null;

export const gcs_resolveBucket = () => {
  if (_cache) return { ok: true, ..._cache };

  if (!GCS_APP_CRED_PATH) {
    return {
      ok: false,
      message:
        "GOOGLE_APPLICATION_CREDENTIALS missing — path to service account JSON required",
    };
  }
  if (!GCS_BUCKET_NAME) {
    return { ok: false, message: "GCS_BUCKET_NAME missing — check .env" };
  }

  const storage = new Storage();
  const bucket = storage.bucket(GCS_BUCKET_NAME);
  _cache = { storage, bucket };
  return { ok: true, storage, bucket };
};
