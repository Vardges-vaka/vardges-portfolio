import { DFLT_F_D_INTEGRATION_FULL } from "../05_cK_setup_cnst/_cK_setup_cnst.index.js";

const isPlainObj = (v) => v && typeof v === "object" && !Array.isArray(v);

const normalizeIdList = (items = []) =>
  (Array.isArray(items) ? items : [])
    .map((item) => (typeof item === "string" ? item : item?._id))
    .filter(Boolean);

export const seedFullFromIntegration = (item = {}) => ({
  ...DFLT_F_D_INTEGRATION_FULL,
  provider: item.provider || "",
  kind: item.kind || "",
  accountLabel: item.accountLabel || "",
  description: item.description || "",
  status: item.status || DFLT_F_D_INTEGRATION_FULL.status,
  lifecycle: isPlainObj(item.lifecycle) ? item.lifecycle : {},
  links: {
    ...DFLT_F_D_INTEGRATION_FULL.links,
    ...(isPlainObj(item.links) ? item.links : {}),
    other: Array.isArray(item.links?.other) ? item.links.other : [],
  },
  payment: {
    ...DFLT_F_D_INTEGRATION_FULL.payment,
    ...(isPlainObj(item.payment) ? item.payment : {}),
  },
  loginCredentials: Array.isArray(item.loginCredentials)
    ? item.loginCredentials
    : [],
  kam: isPlainObj(item.kam) ? item.kam : {},
  support: Array.isArray(item.support) ? item.support : [],
  scheduledMaintenances: Array.isArray(item.scheduledMaintenances)
    ? item.scheduledMaintenances
    : [],
  brands: normalizeIdList(item.brands),
  branches: normalizeIdList(item.branches),
  contract:
    typeof item.contract === "string"
      ? item.contract
      : item.contract?._id || null,
  files: isPlainObj(item.files) ? item.files : {},
  notes: item.notes || "",
});

export const INTEGRATION_DETAIL_FIELD_LABELS = {
  identity: "Identity",
  status: "Status",
  lifecycle: "Lifecycle",
  links: "Links",
  payment: "Payment",
  loginCredentials: "Login credentials",
  kam: "Key account manager",
  support: "Support contacts",
  scheduledMaintenances: "Scheduled maintenances",
  brands: "Brands",
  branches: "Branches",
  contract: "Contract",
  files: "Files",
  notes: "Notes",
};

export const INTEGRATION_DETAIL_FIELD_KEYS = Object.keys(
  INTEGRATION_DETAIL_FIELD_LABELS,
);

export const INTEGRATION_FIELD_API_MAP = {
  identity: "integration_updateAll",
  status: "integration_update_status",
  lifecycle: "integration_update_lifecycle",
  links: "integration_update_links",
  payment: "integration_update_payment",
  loginCredentials: "integration_update_loginCredentials",
  kam: "integration_update_kam",
  support: "integration_update_support",
  scheduledMaintenances: "integration_update_scheduledMaintenances",
  brands: "integration_update_brands",
  branches: "integration_update_branches",
  contract: "integration_update_contract",
  files: "integration_update_files",
  notes: "integration_update_notes",
};

export const pickIntegrationFieldPayload = (fieldKey, draft) => {
  switch (fieldKey) {
    case "identity":
      return {
        provider: draft.provider,
        kind: draft.kind,
        accountLabel: draft.accountLabel,
        description: draft.description,
      };
    case "status":
      return { status: draft.status };
    case "lifecycle":
      return { lifecycle: draft.lifecycle };
    case "links":
      return { links: draft.links };
    case "payment":
      return { payment: draft.payment };
    case "loginCredentials":
      return { loginCredentials: draft.loginCredentials };
    case "kam":
      return { kam: draft.kam };
    case "support":
      return { support: draft.support };
    case "scheduledMaintenances":
      return { scheduledMaintenances: draft.scheduledMaintenances };
    case "brands":
      return { brands: normalizeIdList(draft.brands) };
    case "branches":
      return { branches: normalizeIdList(draft.branches) };
    case "contract":
      return { contract: draft.contract };
    case "files":
      return { files: draft.files };
    case "notes":
      return { notes: draft.notes };
    default:
      return {};
  }
};

const stableStringify = (value) => JSON.stringify(value ?? null);

export const isIntegrationFieldChanged = (fieldKey, baseline, draft) =>
  stableStringify(pickIntegrationFieldPayload(fieldKey, baseline)) !==
  stableStringify(pickIntegrationFieldPayload(fieldKey, draft));

export const getIntegrationChangedFieldKeys = (
  baseline,
  draft,
  keys = INTEGRATION_DETAIL_FIELD_KEYS,
) => keys.filter((key) => isIntegrationFieldChanged(key, baseline, draft));

export const isIntegrationDraftDirty = ({ detailMode, editingField }) =>
  detailMode === "editAll" || Boolean(editingField);
