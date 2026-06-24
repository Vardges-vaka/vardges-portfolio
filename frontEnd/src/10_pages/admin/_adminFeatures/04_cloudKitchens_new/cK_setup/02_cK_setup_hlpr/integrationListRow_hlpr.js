import { isStorageObjectKey, splitBrandFileItems } from "./brandFiles_hlpr.js";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

export const formatIntegrationEnumLabel = (value = "") => {
  if (!hasText(value)) return "—";
  return String(value)
    .trim()
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const getIntegrationDisplayName = (integration = {}) => {
  if (!integration || typeof integration !== "object")
    return "Untitled integration";
  return (
    integration.provider?.trim?.() ||
    integration.provider ||
    "Untitled integration"
  );
};

export const getIntegrationAccountLabel = (integration = {}) =>
  integration.accountLabel?.trim?.() || integration.accountLabel || "";

export const getIntegrationNameInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "?";

export const getIntegrationListLogoItem = (integration = {}) => {
  const { displayLogoItem } = splitBrandFileItems(
    integration.files?.items ?? [],
  );
  return displayLogoItem;
};

export const hasIntegrationListLogoUrl = (integration = {}) => {
  const raw = getIntegrationListLogoItem(integration)?.url || "";
  return (
    hasText(raw) &&
    (raw.startsWith("blob:") ||
      /^https?:\/\//i.test(raw) ||
      isStorageObjectKey(raw))
  );
};

export const countIntegrationAttachedFiles = (integration = {}) => {
  const items = integration.files?.items ?? [];
  return items.filter((item) => Boolean(item?.url)).length;
};

export const countIntegrationLoginCredentials = (integration = {}) => {
  const items = integration.loginCredentials ?? [];
  if (!items.length) return 0;

  return items.filter(
    (item) =>
      hasText(item?.label) ||
      hasText(item?.loginType) ||
      hasText(item?.belongsTo?.name) ||
      item?.requiresOtp === true,
  ).length;
};

export const countIntegrationKamFields = (integration = {}) => {
  const kam = integration.kam ?? {};
  return Object.values(kam).filter(hasText).length;
};

export const countIntegrationSupportContacts = (integration = {}) => {
  const items = integration.support ?? [];
  if (!items.length) return 0;

  return items.filter(
    (item) =>
      hasText(item?.label) ||
      hasText(item?.email) ||
      hasText(item?.phone) ||
      hasText(item?.whatsApp) ||
      hasText(item?.hours),
  ).length;
};

export const getIntegrationListRowStats = (integration = {}) => ({
  kam: countIntegrationKamFields(integration),
  files: countIntegrationAttachedFiles(integration),
  brands: integration.brands?.length ?? 0,
  branches: integration.branches?.length ?? 0,
  credentials: countIntegrationLoginCredentials(integration),
  support: countIntegrationSupportContacts(integration),
  maintenances: integration.scheduledMaintenances?.length ?? 0,
});

export const INTEGRATION_LIST_TABLE_COLUMNS = [
  { key: "index", label: "#", align: "center" },
  { key: "name", label: "Name", align: "left" },
  { key: "kind", label: "Kind", align: "center" },
  { key: "status", label: "Status", align: "center" },
  { key: "payment", label: "Payment", align: "center" },
  { key: "loginCredentials", label: "Secrets", align: "center" }, // done
  { key: "support", label: "Support", align: "center" }, // done
  { key: "kam", label: "KAM", align: "center" }, // done

  { key: "files", label: "Files", align: "center" },
  { key: "brands", label: "Brands", align: "center" },
  { key: "branches", label: "Branches", align: "center" },
  { key: "credentials", label: "Credentials", align: "center" },
  { key: "support", label: "Support", align: "center" },
  { key: "maintenances", label: "Maintenance", align: "center" },
  { key: "actions", label: "Actions", align: "right" },
];
