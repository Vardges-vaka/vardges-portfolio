/** Must match backend `CLOUD_STORAGE_PROVIDERS`. */
import {
  GrabTech_Logo,
  Sapaad_Logo,
  Supy_Logo,
  UrbanPiper_Logo,
} from "../00_assets/_assets.index.js";
export const CLOUD_STORAGE_PROVIDERS = /** @type {const} */ ([
  "s3",
  "gcs",
  "r2",
  "blob",
]);

export const CLOUD_STORAGE_PROVIDERS_OPTIONS = [
  { value: "s3", label: "Amazon S3" },
  { value: "gcs", label: "Google Cloud Storage" },
  { value: "r2", label: "Cloudflare R2" },
  { value: "blob", label: "Azure Blob Storage" },
];

/*
GrabTech_Logo.png
RestHero_Logo.png
Sapaad_Logo.png
Supy_Logo.png
UrbanPiper_Logo.png
*/
