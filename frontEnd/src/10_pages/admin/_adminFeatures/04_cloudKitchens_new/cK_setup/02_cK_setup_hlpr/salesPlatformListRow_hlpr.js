import {
  countSalesPlatformLoginCredentials,
} from "./salesPlatformCredentialsList_hlpr.js";
import {
  countSalesPlatformSupportContacts,
} from "./salesPlatformSupportList_hlpr.js";

const hasText = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const hasSalesPlatformLogoUrl = (platform = {}) =>
  hasText(platform.links?.logoUrl);

export const getSalesPlatformDisplayName = (platform) => {
  if (!platform || typeof platform !== "object") return "Untitled platform";
  return platform.name?.trim?.() || platform.name || "Untitled platform";
};

export const getSalesPlatformNameInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "?";

export const countSalesPlatformKamFields = (platform = {}) => {
  const kam = platform.kam ?? {};
  return Object.values(kam).filter(hasText).length;
};

export const countSalesPlatformLinks = (platform = {}) => {
  const links = platform.links ?? {};
  let count = 0;

  if (hasText(links.logoUrl)) count += 1;
  if (hasText(links.websiteUrl)) count += 1;
  if (hasText(links.partnerPortalUrl)) count += 1;

  count += (links.other ?? []).filter(
    (item) => hasText(item?.label) || hasText(item?.link),
  ).length;

  return count;
};

export const countSalesPlatformSecrets = (platform = {}) =>
  countSalesPlatformLoginCredentials(platform);

export const countSalesPlatformSupport = (platform = {}) =>
  countSalesPlatformSupportContacts(platform);

export const getSalesPlatformListRowStats = (platform = {}) => ({
  kam: countSalesPlatformKamFields(platform),
  links: countSalesPlatformLinks(platform),
  secrets: countSalesPlatformSecrets(platform),
  support: countSalesPlatformSupport(platform),
});

/** Placeholder until sales metrics are wired to the API. */
export const SALES_PLATFORM_LIST_METRIC_PLACEHOLDER = "Not yet";

export const getSalesPlatformListRowMetrics = () => ({
  avgMonthlySales: SALES_PLATFORM_LIST_METRIC_PLACEHOLDER,
  avgDailySales: SALES_PLATFORM_LIST_METRIC_PLACEHOLDER,
  sites: SALES_PLATFORM_LIST_METRIC_PLACEHOLDER,
  brands: SALES_PLATFORM_LIST_METRIC_PLACEHOLDER,
});

export const SALES_PLATFORM_LIST_METRIC_COLUMN_KEYS = [
  "avgMonthlySales",
  "avgDailySales",
  "sites",
  "brands",
];

export const SALES_PLATFORM_LIST_TABLE_COLUMNS = [
  { key: "index", label: "#", align: "center" },
  { key: "logo", label: "Logo", align: "center" },
  { key: "name", label: "Name", align: "center" },
  {
    key: "avgMonthlySales",
    label: "Avg monthly sales",
    align: "center",
    title: "Average monthly sales",
  },
  {
    key: "avgDailySales",
    label: "Avg daily sales",
    align: "center",
    title: "Average daily sales",
  },
  {
    key: "sites",
    label: "Sites",
    align: "center",
    title: "Connected sites",
  },
  {
    key: "brands",
    label: "Brands",
    align: "center",
    title: "Linked brands",
  },
  {
    key: "kam",
    label: "KAM",
    align: "center",
    iconKey: "kam",
    title: "Key account manager",
  },
  {
    key: "links",
    label: "Links",
    align: "center",
    iconKey: "links",
    title: "Links",
  },
  {
    key: "secrets",
    label: "Secrets",
    align: "center",
    iconKey: "secrets",
    title: "Login credentials",
  },
  {
    key: "support",
    label: "Support",
    align: "center",
    iconKey: "support",
    title: "Support contacts",
  },
  { key: "actions", label: "Actions", align: "center" },
];
