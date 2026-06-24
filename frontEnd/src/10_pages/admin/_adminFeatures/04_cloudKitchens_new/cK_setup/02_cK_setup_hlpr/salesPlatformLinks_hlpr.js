const hasText = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const seedLinksDraftFromPlatform = (links = {}) => ({
  logoUrl: links.logoUrl ?? "",
  websiteUrl: links.websiteUrl ?? "",
  partnerPortalUrl: links.partnerPortalUrl ?? "",
  other: Array.isArray(links.other) ? links.other : [],
  _pendingLogoFile: null,
});

export const seedLinksUrlsDraftFromPlatform = (links = {}) => ({
  websiteUrl: links.websiteUrl ?? "",
  partnerPortalUrl: links.partnerPortalUrl ?? "",
});

export const SALES_PLATFORM_LINKS_POPOVER_FIELDS = [
  { key: "websiteUrl", linkable: true, copyable: true },
  { key: "partnerPortalUrl", linkable: true, copyable: true },
];

export const SALES_PLATFORM_LINKS_FIELD_ARIA = {
  websiteUrl: "Website URL",
  partnerPortalUrl: "Partner portal URL",
};

export const formatSalesPlatformLinksDisplayValue = (value) => {
  if (!hasText(value)) return "-";
  return String(value).trim();
};

export const getSalesPlatformLinksFieldHref = (_fieldKey, value) => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

export const shouldOpenSalesPlatformLinksLinkInNewTab = () => true;

export const hasPendingSalesPlatformLogoUpload = (links = {}) =>
  links?._pendingLogoFile instanceof File;

export const getSalesPlatformLinksDraftSignature = (draft = {}) => {
  const links = draft.links ?? draft;
  const pending = links?._pendingLogoFile;

  return JSON.stringify({
    logoUrl:
      typeof links.logoUrl === "string" &&
      !links.logoUrl.startsWith("blob:") &&
      !links.logoUrl.startsWith("data:")
        ? links.logoUrl.trim()
        : "",
    websiteUrl: links.websiteUrl ?? "",
    partnerPortalUrl: links.partnerPortalUrl ?? "",
    other: links.other ?? [],
    pendingLogoName: pending?.name || "",
    pendingLogoSize: pending?.size || 0,
  });
};
