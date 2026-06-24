import {
  formatLoginCredentialDisplayValue,
  getLoginCredentialCardTitle,
  getLoginCredentialFieldValue,
  getLoginCredentialPasswordHref,
  getLoginCredentialUsernameHref,
  LOGIN_TYPE_LABELS,
} from "./salesPlatformLoginCredentials_hlpr.js";

const hasText = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const countSalesPlatformLoginCredentials = (platform = {}) => {
  const items = platform.loginCredentials ?? [];
  if (!items.length) return 0;

  return items.filter(
    (item) =>
      hasText(item?.label) ||
      hasText(item?.loginType) ||
      hasText(item?.belongsTo?.name) ||
      item?.requiresOtp === true,
  ).length;
};

export const formatCredentialsListHeaderCount = (total = 0) =>
  `${total} credential${total === 1 ? "" : "s"}`;

export const getCredentialsListSafeSummary = (item = {}, index = 0) => ({
  title: getLoginCredentialCardTitle(item, index),
  loginType: item?.loginType
    ? LOGIN_TYPE_LABELS[item.loginType] || String(item.loginType).trim()
    : "-",
  belongsTo: hasText(item?.belongsTo?.name)
    ? String(item.belongsTo.name).trim()
    : "-",
  requiresOtp: item?.requiresOtp ? "Yes" : "No",
});

export const CREDENTIALS_LIST_SECRET_FIELDS = [
  { key: "username", label: "Username", copyable: true, linkable: true },
  { key: "email", label: "Login email", copyable: true, linkable: true },
  { key: "phone", label: "Login phone", copyable: true, linkable: true },
  {
    key: "password",
    label: "Password",
    copyable: true,
    linkable: true,
    masked: true,
  },
];

export const getCredentialsListSecretFieldValue = (item, field, partnerPortalUrl) => {
  const rawValue = getLoginCredentialFieldValue(item, { key: field.key });
  const displayValue = formatLoginCredentialDisplayValue(rawValue);

  let href = null;
  if (field.key === "username") {
    href = getLoginCredentialUsernameHref(item, partnerPortalUrl);
  } else if (field.key === "password") {
    href = getLoginCredentialPasswordHref(partnerPortalUrl);
  } else if (field.key === "email" && hasText(rawValue)) {
    href = `mailto:${String(rawValue).trim()}`;
  } else if (field.key === "phone" && hasText(rawValue)) {
    const digits = String(rawValue).replace(/\D/g, "");
    href = digits ? `tel:${digits}` : null;
  }

  return {
    rawValue,
    displayValue:
      field.masked && hasText(rawValue)
        ? "•".repeat(Math.min(String(rawValue).trim().length, 12))
        : displayValue,
    href,
    hasValue: displayValue !== "-",
  };
};

export const copyCredentialsListText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};
