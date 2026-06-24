import {
  formatSupportContactDisplayValue,
  getSupportContactCardTitle,
  getSupportContactFieldHref,
} from "./salesPlatformSupportContacts_hlpr.js";

const hasText = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const countSalesPlatformSupportContacts = (platform = {}) => {
  const items = platform.support ?? [];
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

export const formatSupportListHeaderCount = (total = 0) =>
  `${total} contact${total === 1 ? "" : "s"}`;

export const SUPPORT_LIST_POPOVER_FIELDS = [
  { key: "email", label: "Email", copyable: true, linkable: true },
  { key: "phone", label: "Phone", copyable: true, linkable: true },
  { key: "whatsApp", label: "WhatsApp", copyable: true, linkable: true },
  { key: "hours", label: "Hours", copyable: true },
];

export const getSupportListFieldDisplay = (item, field) => {
  const rawValue = item?.[field.key];
  const displayValue = formatSupportContactDisplayValue(rawValue);
  const hasValue = displayValue !== "-";
  const trimmedValue = hasValue ? String(rawValue).trim() : "";
  const href =
    field.linkable && hasValue
      ? getSupportContactFieldHref(field.key, rawValue)
      : null;

  return { displayValue, hasValue, trimmedValue, href };
};

export const shouldOpenSupportListLinkInNewTab = (fieldKey) =>
  fieldKey === "whatsApp";

export const copySupportListText = async (text) => {
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
