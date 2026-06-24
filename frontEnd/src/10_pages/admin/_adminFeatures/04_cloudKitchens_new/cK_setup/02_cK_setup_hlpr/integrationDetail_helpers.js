import { DFLT_F_D_INTEGRATION_FULL } from "../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { seedLoginCredentialsFromIntegration } from "./integrationLoginCredentials_hlpr.js";

const isPlainObj = (v) => v && typeof v === "object" && !Array.isArray(v);

const normalizeIdList = (items = []) =>
  (Array.isArray(items) ? items : [])
    .map((item) => (typeof item === "string" ? item : item?._id))
    .filter(Boolean);

const toDateOnly = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const normalizeLifecyclePayload = (lifecycle = {}) => ({
  startAt: toDateOnly(lifecycle.startAt),
  restartedAt: toDateOnly(lifecycle.restartedAt),
  endAt: toDateOnly(lifecycle.endAt),
});

const normalizeLinksPayload = (links = {}) => ({
  websiteUrl: links.websiteUrl ?? "",
  portalUrl: links.portalUrl ?? "",
  other: (Array.isArray(links.other) ? links.other : []).map((item) => ({
    label: item?.label ?? "",
    url: item?.url ?? "",
  })),
});

export const cloneIntegrationDraft = (draft) => {
  if (!draft) return null;
  try {
    return structuredClone(draft);
  } catch {
    return JSON.parse(JSON.stringify(draft));
  }
};

export const INTEGRATION_IDENTITY_FIELD_KEYS = [
  "identity",
  "status",
  "notes",
  "lifecycle",
  "links",
];

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
  loginCredentials: seedLoginCredentialsFromIntegration(item.loginCredentials),
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

export const INTEGRATION_VIEW_ONLY_FIELD_KEYS = [
  "brands",
  "branches",
  "contract",
];

export const INTEGRATION_COLLAPSIBLE_FIELD_KEYS = [
  "payment",
  "loginCredentials",
  "kam",
  "support",
  "scheduledMaintenances",
  "brands",
  "branches",
  "contract",
];

export const isIntegrationViewOnlyField = (fieldKey) =>
  INTEGRATION_VIEW_ONLY_FIELD_KEYS.includes(fieldKey);

export const buildIntegrationFieldStates = (integrationDraft) => ({
  values: integrationDraft,
});

export const buildIntegrationFieldHandlers = (handlers) => ({
  onChange: handlers.onDraftChange,
});

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

export const pickIntegrationFieldPayload = (fieldKey, draft = {}) => {
  switch (fieldKey) {
    case "identity":
      return {
        provider: draft.provider ?? "",
        kind: draft.kind ?? "",
        accountLabel: draft.accountLabel ?? "",
        description: draft.description ?? "",
      };
    case "status":
      return { status: draft.status ?? "" };
    case "lifecycle":
      return { lifecycle: normalizeLifecyclePayload(draft.lifecycle) };
    case "links":
      return { links: normalizeLinksPayload(draft.links) };
    case "payment":
      return { payment: draft.payment ?? {} };
    case "loginCredentials":
      return { loginCredentials: draft.loginCredentials ?? [] };
    case "kam":
      return { kam: draft.kam ?? {} };
    case "support":
      return { support: draft.support ?? [] };
    case "scheduledMaintenances":
      return { scheduledMaintenances: draft.scheduledMaintenances ?? [] };
    case "brands":
      return { brands: normalizeIdList(draft.brands) };
    case "branches":
      return { branches: normalizeIdList(draft.branches) };
    case "contract":
      return { contract: draft.contract ?? null };
    case "files":
      return { files: draft.files ?? {} };
    case "notes":
      return { notes: draft.notes ?? "" };
    default:
      return {};
  }
};

/** Payload sent in one PUT /updateAll when saving the Identity hero section. */
export const pickIntegrationIdentityBatchPayload = (draft = {}) => ({
  provider: draft.provider ?? "",
  kind: draft.kind ?? "",
  accountLabel: draft.accountLabel ?? "",
  description: draft.description ?? "",
  status: draft.status ?? "",
  notes: draft.notes ?? "",
  lifecycle: draft.lifecycle ?? {},
  links: {
    websiteUrl: draft.links?.websiteUrl ?? "",
    portalUrl: draft.links?.portalUrl ?? "",
    other: Array.isArray(draft.links?.other) ? draft.links.other : [],
  },
});

const pickIntegrationIdentityComparePayload = (draft = {}) => ({
  ...pickIntegrationFieldPayload("identity", draft),
  ...pickIntegrationFieldPayload("status", draft),
  ...pickIntegrationFieldPayload("notes", draft),
  ...pickIntegrationFieldPayload("lifecycle", draft),
  ...pickIntegrationFieldPayload("links", draft),
});

const stableStringify = (value) => JSON.stringify(value ?? null);

export const isIntegrationIdentitySectionChanged = (baseline, draft) =>
  stableStringify(pickIntegrationIdentityComparePayload(baseline)) !==
  stableStringify(pickIntegrationIdentityComparePayload(draft));

export const isIntegrationFieldChanged = (fieldKey, baseline, draft) =>
  stableStringify(pickIntegrationFieldPayload(fieldKey, baseline)) !==
  stableStringify(pickIntegrationFieldPayload(fieldKey, draft));

export const getIntegrationChangedFieldKeys = (
  baseline,
  draft,
  keys = INTEGRATION_DETAIL_FIELD_KEYS,
) =>
  keys
    .filter((key) => key !== "files")
    .filter((key) => !isIntegrationViewOnlyField(key))
    .filter((key) => isIntegrationFieldChanged(key, baseline, draft));

export const isIntegrationDraftDirty = ({ detailMode, editingField }) =>
  detailMode === "editAll" || Boolean(editingField);
