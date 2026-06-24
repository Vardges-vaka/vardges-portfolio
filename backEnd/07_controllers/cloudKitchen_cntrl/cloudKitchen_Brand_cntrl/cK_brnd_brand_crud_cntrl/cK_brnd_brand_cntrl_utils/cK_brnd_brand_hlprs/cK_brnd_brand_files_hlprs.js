import mongoose from "mongoose";
import path from "path";
import { randomUUID } from "crypto";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../../../05_constants/cloudStorageProviders.js";
import { Settings } from "../../../../../../06_models/_models.index.js";
import { getCloudOps } from "../../../../../settingsCntrl/_utils/settingshelpers/cloudStorageDispatch.js";

export const FILES_USED_IN_VALUES = [
  "internal",
  "aggrigator",
  "website",
  "inApp",
  "socials",
  "google",
  "legal",
  "branding",
  "menus",
  "recipe",
  "miscellaneous",
  "packaging",
  "other",
];

export const DEFAULT_BRAND_FILES = () => ({
  cloudStorage: { isDefault: true, value: "" },
  items: [],
});

export const isValidObjectId = (value) =>
  typeof value === "string" && mongoose.Types.ObjectId.isValid(value);

export const parseJsonField = (raw, fieldName) => {
  if (raw == null || raw === "") {
    return { ok: false, message: `${fieldName} is required` };
  }

  if (typeof raw === "object") {
    return { ok: true, value: raw };
  }

  if (typeof raw !== "string") {
    return { ok: false, message: `${fieldName} must be a JSON string` };
  }

  try {
    return { ok: true, value: JSON.parse(raw) };
  } catch {
    return { ok: false, message: `${fieldName} must be valid JSON` };
  }
};

export const validateUploadedFile = (file, label = "file") => {
  if (!file) {
    return { ok: false, message: `${label} is missing` };
  }

  if (!Buffer.isBuffer(file.buffer) && !file.path) {
    return {
      ok: false,
      message: `${label} has neither buffer nor disk path`,
    };
  }

  if (typeof file.size !== "number" || file.size <= 0) {
    return { ok: false, message: `${label} has invalid size` };
  }

  return { ok: true };
};

const normalizeDescription = (description = {}) => ({
  value: description?.value ?? "",
  short: description?.short ?? "",
  long: description?.long ?? "",
});

export const normalizeFileItemInput = (item = {}) => {
  const usedIn =
    typeof item.usedIn === "string" &&
    FILES_USED_IN_VALUES.includes(item.usedIn)
      ? item.usedIn
      : undefined;

  const ref =
    item.ref && isValidObjectId(String(item.ref))
      ? String(item.ref)
      : undefined;

  const sizeRaw = item.sizeIn_KB;
  const sizeIn_KB =
    sizeRaw === "" || sizeRaw == null ? undefined : Number(sizeRaw);

  return {
    url: typeof item.url === "string" ? item.url : "",
    format: typeof item.format === "string" ? item.format : "",
    sizeIn_KB:
      Number.isFinite(sizeIn_KB) && sizeIn_KB >= 0 ? sizeIn_KB : undefined,
    description: normalizeDescription(item.description),
    notes: typeof item.notes === "string" ? item.notes : "",
    ref,
    title: typeof item.title === "string" ? item.title : "",
    usedIn,
    ...(item.createdBy != null && { createdBy: item.createdBy }),
    ...(item.updatedBy != null && { updatedBy: item.updatedBy }),
    ...(item.deletedBy != null && { deletedBy: item.deletedBy }),
    ...(item.deletedAt != null && { deletedAt: item.deletedAt }),
    ...(item.isDeleted != null && { isDeleted: item.isDeleted }),
    ...(typeof item.deletedReason === "string" && {
      deletedReason: item.deletedReason,
    }),
  };
};

export const normalizeFilesPayload = (payload = {}) => {
  const cloudStorage = payload.cloudStorage ?? {};
  const providerValue =
    typeof cloudStorage.value === "string" ? cloudStorage.value.trim() : "";

  const normalized = {
    cloudStorage: {
      isDefault: cloudStorage.isDefault !== false,
      value:
        providerValue && CLOUD_STORAGE_PROVIDERS.includes(providerValue)
          ? providerValue
          : "",
    },
    items: Array.isArray(payload.items)
      ? payload.items.map(normalizeFileItemInput)
      : [],
  };

  return normalized;
};

export const parseUploadItemIndexes = (raw, fileCount) => {
  if (!fileCount) return { ok: true, value: [] };

  const parsed = parseJsonField(raw ?? "[]", "uploadItemIndexes");
  if (!parsed.ok) return parsed;

  if (!Array.isArray(parsed.value)) {
    return {
      ok: false,
      message: "uploadItemIndexes must be a JSON array",
    };
  }

  if (parsed.value.length !== fileCount) {
    return {
      ok: false,
      message:
        "uploadItemIndexes length must match the number of uploaded files",
    };
  }

  const indexes = [];

  for (let index = 0; index < parsed.value.length; index += 1) {
    const num = Number(parsed.value[index]);
    if (!Number.isInteger(num) || num < 0) {
      return {
        ok: false,
        message: `uploadItemIndexes[${index}] must be a non-negative integer`,
      };
    }
    indexes.push(num);
  }

  return { ok: true, value: indexes };
};

export const resolveBrandStorageProvider = async (cloudStorage = {}) => {
  const explicit = cloudStorage?.value?.trim?.() ?? "";
  if (explicit && CLOUD_STORAGE_PROVIDERS.includes(explicit)) {
    return explicit;
  }

  const settings = await Settings.findOne().lean();
  const storage = settings?.storage ?? {};

  const defaultEnabled = Object.entries(storage).find(
    ([, entry]) => entry?.isDefault && entry?.isEnabled,
  );
  if (defaultEnabled) return defaultEnabled[0];

  const anyEnabled = Object.entries(storage).find(
    ([, entry]) => entry?.isEnabled,
  );
  if (anyEnabled) return anyEnabled[0];

  return explicit || "gcs";
};

export const buildBrandFileObjectKey = (brandId, item, file) => {
  const slugSource =
    item?.title || item?.format || file?.originalname || "file";
  const slug =
    String(slugSource)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "file";

  const ext = path.extname(file?.originalname || "") || "";
  return `cloudKitchen/brands/${brandId}/files/${slug}-${randomUUID()}${ext}`;
};

export const isCloudStorageObjectKey = (url = "") =>
  typeof url === "string" &&
  url.trim().length > 0 &&
  !url.startsWith("blob:") &&
  !/^https?:\/\//i.test(url.trim());

export const collectBrandFileObjectKeys = (items = []) =>
  new Set(
    (Array.isArray(items) ? items : [])
      .map((item) => item?.url)
      .filter((url) => isCloudStorageObjectKey(url)),
  );

export const findRemovedBrandFileKeys = (
  previousItems = [],
  nextItems = [],
) => {
  const nextKeys = collectBrandFileObjectKeys(nextItems);
  const removed = [];

  for (const item of Array.isArray(previousItems) ? previousItems : []) {
    const key = item?.url;
    if (isCloudStorageObjectKey(key) && !nextKeys.has(key)) {
      removed.push(key);
    }
  }

  return [...new Set(removed)];
};

export const deleteBrandFileObjects = async ({
  objectKeys = [],
  provider,
  isDebug = false,
}) => {
  if (!objectKeys.length) {
    return { ok: true, deleted: [] };
  }

  const { delete: deleteFn } = getCloudOps(provider);
  const deleted = [];

  for (const objectKey of objectKeys) {
    const delResult = await deleteFn(
      { objectKey, ignoreNotFound: true },
      isDebug,
    );
    if (!delResult.success) {
      return {
        ok: false,
        message:
          delResult.message || "Failed to delete removed file from storage",
        deleted,
      };
    }
    deleted.push(objectKey);
  }

  return { ok: true, deleted };
};

export const coerceFileFormat = (item, file) => {
  if (item?.format) return item.format;
  const ext = path.extname(file?.originalname || "").replace(".", "");
  if (ext) return ext.toLowerCase();
  const mime = file?.mimetype || "";
  if (mime.includes("/")) return mime.split("/").pop();
  return "";
};

export const ensureBrandFilesShape = (files) => {
  if (!files || Array.isArray(files) || typeof files !== "object") {
    return DEFAULT_BRAND_FILES();
  }

  return normalizeFilesPayload(files);
};
