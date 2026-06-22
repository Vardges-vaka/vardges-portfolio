import { DFLT_F_D_FILES } from "../05_cK_setup_cnst/_cK_setup_cnst.index.js";

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

const stableStringify = (value) => JSON.stringify(value ?? null);

export const isBrandFilesChanged = (baseline, draft) =>
  stableStringify(stripPendingFiles(baseline)) !==
  stableStringify(stripPendingFiles(draft));

export const buildEmptyFileItem = (title = "") => ({
  ...normalizeFileItem(DFLT_F_D_FILES.items[0]),
  title,
});
