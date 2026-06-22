import { DFLT_F_D_SALES_PLATFORM_FULL } from "../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const isPlainObj = (v) => v && typeof v === "object" && !Array.isArray(v);

export const seedFullFromSalesPlatform = (item = {}) => ({
  ...DFLT_F_D_SALES_PLATFORM_FULL,
  name: item.name || "",
  notes: item.notes || "",
  links: {
    ...DFLT_F_D_SALES_PLATFORM_FULL.links,
    ...(isPlainObj(item.links) ? item.links : {}),
    other: Array.isArray(item.links?.other) ? item.links.other : [],
  },
  kam: isPlainObj(item.kam) ? item.kam : {},
  loginCredentials: Array.isArray(item.loginCredentials)
    ? item.loginCredentials
    : [],
  support: Array.isArray(item.support) ? item.support : [],
});

export const SALES_PLATFORM_DETAIL_FIELD_LABELS = {
  basic: "Basics",
  links: "Links",
  kam: "Key account manager",
  loginCredentials: "Login credentials",
  support: "Support contacts",
};

export const SALES_PLATFORM_DETAIL_FIELD_KEYS = Object.keys(
  SALES_PLATFORM_DETAIL_FIELD_LABELS,
);

export const SALES_PLATFORM_FIELD_API_MAP = {
  basic: "slsPlatform_updateAll",
  links: "slsPlatform_update_links",
  kam: "slsPlatform_update_kam",
  loginCredentials: "slsPlatform_update_loginCredentials",
  support: "slsPlatform_update_support",
};

export const pickSalesPlatformFieldPayload = (fieldKey, draft) => {
  switch (fieldKey) {
    case "basic":
      return { name: draft.name, notes: draft.notes };
    case "links":
      return { links: draft.links };
    case "kam":
      return { kam: draft.kam };
    case "loginCredentials":
      return { loginCredentials: draft.loginCredentials };
    case "support":
      return { support: draft.support };
    default:
      return {};
  }
};

const stableStringify = (value) => JSON.stringify(value ?? null);

export const isSalesPlatformFieldChanged = (fieldKey, baseline, draft) =>
  stableStringify(pickSalesPlatformFieldPayload(fieldKey, baseline)) !==
  stableStringify(pickSalesPlatformFieldPayload(fieldKey, draft));

export const getSalesPlatformChangedFieldKeys = (
  baseline,
  draft,
  keys = SALES_PLATFORM_DETAIL_FIELD_KEYS,
) => keys.filter((key) => isSalesPlatformFieldChanged(key, baseline, draft));

export const isSalesPlatformDraftDirty = ({ detailMode, editingField }) =>
  detailMode === "editAll" || Boolean(editingField);
