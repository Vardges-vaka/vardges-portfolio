import { DFLT_F_D_FILES } from "../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import CK_brnd_brand_get_fileReadUrl from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_brand/cloudKitchen_brand/cloudKitchen_brand_fields/CK_brnd_brand_get_fileReadUrl.js";
import CK_gen_integration_get_fileReadUrl from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_integration/cloudKitchen_integration_fields/CK_gen_integration_get_fileReadUrl.js";

export const LOGO_FILE_TITLE = "Logo";
export const LOGO_TITLE_SEPARATOR = " · ";

export const LOGO_FORMAT_SLOTS = [
  { key: "pdf", label: "PDF", accept: ".pdf,application/pdf" },
  { key: "png", label: "PNG", accept: ".png,image/png" },
  { key: "webp", label: "WebP", accept: ".webp,image/webp" },
  { key: "ico", label: "ICO", accept: ".ico,image/x-icon,image/vnd.microsoft.icon" },
  { key: "svg", label: "SVG", accept: ".svg,image/svg+xml" },
  { key: "jpg", label: "JPG", accept: ".jpg,.jpeg,image/jpeg" },
  {
    key: "png_noBackground",
    label: "PNG (no bg)",
    accept: ".png,image/png",
  },
];

export const LOGO_FORMAT_SLOT_KEYS = LOGO_FORMAT_SLOTS.map((slot) => slot.key);

export const LOGO_DISPLAY_PRIORITY = [
  "png_noBackground",
  "png",
  "webp",
  "svg",
  "jpg",
  "ico",
];

export const buildLogoVariantTitle = (slotKey) =>
  `${LOGO_FILE_TITLE}${LOGO_TITLE_SEPARATOR}${slotKey}`;

export const isLegacyBareLogo = (item) =>
  String(item?.title || "")
    .trim()
    .toLowerCase() === LOGO_FILE_TITLE.toLowerCase();

/** @deprecated use isLogoVariantItem */
export const isLogoTitle = (title) =>
  String(title || "")
    .trim()
    .toLowerCase() === LOGO_FILE_TITLE.toLowerCase();

export const isLogoVariantItem = (item) => {
  const title = String(item?.title || "").trim();
  if (!title) return false;
  if (isLegacyBareLogo(item)) return true;

  const lower = title.toLowerCase();
  if (LOGO_FORMAT_SLOTS.some((slot) => lower === buildLogoVariantTitle(slot.key).toLowerCase())) {
    return true;
  }

  return /^logo[\s·\-_.]/i.test(title);
};

const inferLogoVariantKeyFromUrl = (url = "") => {
  if (!url) return null;

  const ext = url.split(/[?#]/)[0].split(".").pop()?.toLowerCase();
  const extMap = {
    pdf: "pdf",
    png: "png",
    webp: "webp",
    ico: "ico",
    svg: "svg",
    jpg: "jpg",
    jpeg: "jpg",
  };

  return extMap[ext] || null;
};

export const getLogoVariantKeyFromItem = (item) => {
  if (!item) return null;

  const title = String(item.title || "").trim();

  if (isLegacyBareLogo(item)) {
    return inferLogoVariantKeyFromUrl(item.url) || "png";
  }

  const exactSlot = LOGO_FORMAT_SLOTS.find(
    (slot) => title.toLowerCase() === buildLogoVariantTitle(slot.key).toLowerCase(),
  );
  if (exactSlot) return exactSlot.key;

  const suffixMatch = title.match(/^logo[\s·\-_.]+(.+)$/i);
  if (suffixMatch) {
    const key = suffixMatch[1].trim().toLowerCase();
    if (LOGO_FORMAT_SLOT_KEYS.includes(key)) return key;
  }

  const formatKey = String(item.format || "")
    .trim()
    .toLowerCase();
  if (LOGO_FORMAT_SLOT_KEYS.includes(formatKey)) return formatKey;

  return inferLogoVariantKeyFromUrl(item.url);
};

export const buildLogoVariantMap = (items = []) => {
  const map = Object.fromEntries(LOGO_FORMAT_SLOTS.map((slot) => [slot.key, null]));
  const list = Array.isArray(items) ? items : [];

  list.forEach((item) => {
    if (!isLogoVariantItem(item)) return;

    const key = getLogoVariantKeyFromItem(item);
    if (key && key in map) {
      map[key] = item;
    }
  });

  return map;
};

export const countPresentLogoVariants = (map = {}) => {
  const present = LOGO_FORMAT_SLOTS.filter((slot) => Boolean(map[slot.key]?.url)).length;
  return { present, total: LOGO_FORMAT_SLOTS.length };
};

export const getDisplayLogoItem = (map = {}) => {
  for (const key of LOGO_DISPLAY_PRIORITY) {
    const item = map[key];
    if (item?.url) return item;
  }

  return null;
};

export const getPrimaryLogoAuditItem = (map = {}) => {
  const displayItem = getDisplayLogoItem(map);
  if (displayItem) return displayItem;

  return LOGO_FORMAT_SLOTS.map((slot) => map[slot.key]).find(Boolean) || null;
};

export const splitBrandFileItems = (items = []) => {
  const list = Array.isArray(items) ? items : [];
  const logoVariantMap = buildLogoVariantMap(list);
  const otherItems = list.filter((item) => !isLogoVariantItem(item));

  return {
    logoVariantMap,
    displayLogoItem: getDisplayLogoItem(logoVariantMap),
    primaryAuditItem: getPrimaryLogoAuditItem(logoVariantMap),
    otherItems,
  };
};

export const findLogoVariantIndex = (items = [], slotKey) => {
  const list = Array.isArray(items) ? items : [];

  let index = list.findIndex((item) => getLogoVariantKeyFromItem(item) === slotKey);
  if (index >= 0) return index;

  if (slotKey === "png") {
    index = list.findIndex((item) => isLegacyBareLogo(item));
  }

  return index;
};

export const getOtherFileIndices = (items = []) => {
  const list = Array.isArray(items) ? items : [];
  return list
    .map((_, index) => index)
    .filter((index) => !isLogoVariantItem(list[index]));
};

export const countPresentOtherFiles = (items = []) => {
  const list = Array.isArray(items) ? items : [];
  const otherItems = list.filter((item) => !isLogoVariantItem(item));
  const present = otherItems.filter((item) => Boolean(item?.url)).length;
  return { present, total: otherItems.length };
};

export const formatFileItemValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

export const getFileItemUsedIn = (item) => {
  if (typeof item?.usedIn === "string") return item.usedIn;
  if (Array.isArray(item?.usedIn)) return item.usedIn[0] || "";
  return "";
};

const normalizeFileItem = (item = {}) => ({
  url: item.url ?? "",
  format: item.format ?? "",
  sizeIn_KB: item.sizeIn_KB ?? "",
  description: {
    value: item.description?.value ?? "",
    short: item.description?.short ?? "",
    long: item.description?.long ?? "",
  },
  notes: item.notes ?? "",
  ref: item.ref ?? "",
  usedIn: getFileItemUsedIn(item),
  title: item.title ?? "",
  createdBy: item.createdBy ?? null,
  updatedBy: item.updatedBy ?? null,
  deletedBy: item.deletedBy ?? null,
  deletedAt: item.deletedAt ?? null,
  isDeleted: item.isDeleted ?? false,
  deletedReason: item.deletedReason ?? "",
});

export const normalizeBrandFiles = (files) => ({
  cloudStorage: {
    isDefault: files?.cloudStorage?.isDefault ?? true,
    value: files?.cloudStorage?.value ?? "",
  },
  items: Array.isArray(files?.items)
    ? files.items.map(normalizeFileItem)
    : [],
});

export const seedFilesFromBrand = (brand = {}) =>
  normalizeBrandFiles(brand?.files ?? DFLT_F_D_FILES);

export const stripPendingFiles = (files) => ({
  ...files,
  items: (files?.items ?? []).map((item) => {
    const clean = { ...item };
    delete clean._pendingFile;
    return clean;
  }),
});

/** Stored cloud path — not a browser-ready http(s) or blob preview URL. */
export const isStorageObjectKey = (url = "") =>
  typeof url === "string" &&
  url.trim().length > 0 &&
  !url.startsWith("blob:") &&
  !/^https?:\/\//i.test(url.trim());

const IMAGE_FORMATS = new Set([
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "svg",
  "ico",
  "bmp",
]);

const VIDEO_FORMATS = new Set(["mp4", "webm", "ogg", "mov", "avi", "mkv", "m4v"]);

const AUDIO_FORMATS = new Set(["mp3", "wav", "aac", "m4a", "flac", "oga", "opus"]);

const ALL_KNOWN_EXTS = new Set([
  ...IMAGE_FORMATS,
  ...VIDEO_FORMATS,
  ...AUDIO_FORMATS,
  "pdf",
]);

const MIME_SUBTYPE_TO_EXT = {
  jpeg: "jpg",
  jpg: "jpg",
  png: "png",
  webp: "webp",
  gif: "gif",
  svg: "svg",
  "svg+xml": "svg",
  ico: "ico",
  "x-icon": "ico",
  "vnd.microsoft.icon": "ico",
  pdf: "pdf",
  mpeg: "mp3",
  mp3: "mp3",
  mp4: "mp4",
  webm: "webm",
  quicktime: "mov",
  "x-msvideo": "avi",
  wav: "wav",
  "x-wav": "wav",
  ogg: "ogg",
  flac: "flac",
  aac: "aac",
  m4a: "m4a",
  "x-m4a": "m4a",
  opus: "opus",
};

export const normalizeFormatExt = (format = "") => {
  let ext = String(format).trim().toLowerCase().replace(/^\./, "");
  if (!ext) return "";

  if (ext.includes("/")) {
    ext = ext.split("/").pop() || ext;
  }

  if (ext.includes("_")) {
    const [prefix, ...rest] = ext.split("_");
    if (["audio", "video", "image", "application"].includes(prefix) && rest.length) {
      ext = rest.join("_");
    }
  }

  if (MIME_SUBTYPE_TO_EXT[ext]) return MIME_SUBTYPE_TO_EXT[ext];
  if (ALL_KNOWN_EXTS.has(ext)) return ext;
  return "";
};

const getTitleExtension = (title = "") => {
  const match = String(title).trim().match(/\.([a-z0-9]+)$/i);
  if (!match) return "";
  const ext = match[1].toLowerCase();
  return ALL_KNOWN_EXTS.has(ext) ? ext : "";
};

export const inferExtFromUrl = (url = "") => {
  if (!url || url.startsWith("blob:")) return "";

  const path = String(url).split(/[?#]/)[0];
  const ext = path.split(".").pop()?.toLowerCase() || "";
  if (!ext || ext.includes("/")) return "";
  return ext;
};

const inferExtFromMime = (mime = "") => {
  if (!mime || !mime.includes("/")) return "";
  const [, subtype = ""] = mime.toLowerCase().split("/");
  return normalizeFormatExt(subtype) || (subtype === "jpeg" ? "jpg" : subtype.split("+")[0]);
};

export const getFileMediaKind = (item = {}) => {
  const ext =
    normalizeFormatExt(item?.format) ||
    inferExtFromUrl(item?.url) ||
    inferExtFromMime(item?._pendingFile?.type);

  if (IMAGE_FORMATS.has(ext)) return "image";
  if (VIDEO_FORMATS.has(ext)) return "video";
  if (AUDIO_FORMATS.has(ext)) return "audio";
  if (ext === "pdf") return "pdf";

  const mime = item?._pendingFile?.type || "";
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  if (mime === "application/pdf") return "pdf";

  return "other";
};

const IN_APP_MEDIA_KINDS = new Set(["audio", "video", "pdf", "image"]);

export const supportsInAppMediaViewer = (item = {}) =>
  IN_APP_MEDIA_KINDS.has(getFileMediaKind(item));

export const getInAppMediaOpenLabel = (item = {}) => {
  const kind = getFileMediaKind(item);
  if (kind === "audio") return "Listen";
  if (kind === "video") return "Watch";
  if (kind === "pdf" || kind === "image") return "View";
  return "Open";
};

export const getFileDownloadName = (item = {}) => {
  const pendingName = item?._pendingFile?.name;
  if (pendingName) return pendingName;

  const title = String(item?.title || "file").trim() || "file";

  // Title already includes a known extension (e.g. "Track.mp3") — use as-is.
  if (getTitleExtension(title)) return title;

  const ext =
    normalizeFormatExt(item?.format) ||
    inferExtFromUrl(item?.url) ||
    inferExtFromMime(item?._pendingFile?.type);

  if (!ext) return title;
  if (title.toLowerCase().endsWith(`.${ext}`)) return title;
  return `${title}.${ext}`;
};

export const buildFilePreviewUrl = (item, resolveFileUrl) => {
  const raw = item?.url || "";
  if (!raw) return "";
  if (raw.startsWith("blob:") || /^https?:\/\//i.test(raw)) return raw;
  return resolveFileUrl?.(raw) || "";
};

export const triggerFileDownload = async ({
  url = "",
  filename = "download",
  brandId = "",
  integrationId = "",
  objectKey = "",
} = {}) => {
  const storageKey =
    objectKey || (isStorageObjectKey(url) ? url : "");

  const fetchSignedDownloadUrl = async () => {
    if (integrationId) {
      return CK_gen_integration_get_fileReadUrl({
        id: integrationId,
        objectKey: storageKey,
        download: true,
        filename,
      });
    }

    if (brandId) {
      return CK_brnd_brand_get_fileReadUrl({
        id: brandId,
        objectKey: storageKey,
        download: true,
        filename,
      });
    }

    return null;
  };

  if ((brandId || integrationId) && storageKey) {
    const res = await fetchSignedDownloadUrl();
    const downloadUrl = res?.data?.readUrl;

    if (downloadUrl) {
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      return;
    }
  }

  if (!url) return;

  if (url.startsWith("blob:")) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    return;
  }

  try {
    const response = await fetch(url, { mode: "cors", credentials: "omit" });
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

const isLogoVariantReadyForSave = (item = {}) => {
  if (item._pendingFile instanceof File) return true;
  return typeof item.url === "string" && item.url.trim().length > 0;
};

const isOtherFileReadyForSave = (item = {}) => {
  if (item._pendingFile instanceof File) return true;
  return typeof item.url === "string" && item.url.trim().length > 0;
};

/**
 * Drops empty logo slot stubs created by metadata edits before upload.
 * Non-logo items are always kept.
 */
export const prepareBrandFilesForSubmit = (filesDraft = {}) => {
  const items = Array.isArray(filesDraft.items) ? filesDraft.items : [];

  return {
    ...filesDraft,
    items: items.filter((item) => {
      if (isLogoVariantItem(item)) {
        return isLogoVariantReadyForSave(item);
      }
      return isOtherFileReadyForSave(item);
    }),
  };
};

export const removeLogoVariantFromItems = (items = [], slotKey) => {
  const index = findLogoVariantIndex(items, slotKey);
  if (index < 0) return [...items];
  return items.filter((_, itemIndex) => itemIndex !== index);
};

export const removeOtherFileFromItems = (items = [], otherIndex) => {
  const otherIndices = getOtherFileIndices(items);
  const targetIndex = otherIndices[otherIndex];
  if (targetIndex == null) return [...items];
  return items.filter((_, itemIndex) => itemIndex !== targetIndex);
};

export const revokeFilePreviewUrl = (item = {}) => {
  const url = item?.url;
  if (typeof url === "string" && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

export const hasRemovableFileContent = (item = {}) =>
  Boolean(item?.url) || item?._pendingFile instanceof File;

/** Append or merge a logo variant without unshift (keeps upload indexes stable). */
export const upsertLogoVariantInItems = (items = [], slotKey, patch = {}) => {
  const next = [...items];
  const variantTitle = buildLogoVariantTitle(slotKey);
  const variantIndex = findLogoVariantIndex(next, slotKey);

  if (variantIndex < 0) {
    next.push({
      ...buildEmptyFileItem(variantTitle),
      title: variantTitle,
      format: slotKey,
      usedIn: "branding",
      ...patch,
    });
    return next;
  }

  next[variantIndex] = { ...next[variantIndex], ...patch };
  return next;
};

const stableStringify = (value) => JSON.stringify(value ?? null);

export const isBrandFilesChanged = (baseline, draft) =>
  stableStringify(stripPendingFiles(baseline)) !==
  stableStringify(stripPendingFiles(draft));

export const buildEmptyFileItem = (title = "") => ({
  ...normalizeFileItem(DFLT_F_D_FILES.items[0]),
  title,
});
