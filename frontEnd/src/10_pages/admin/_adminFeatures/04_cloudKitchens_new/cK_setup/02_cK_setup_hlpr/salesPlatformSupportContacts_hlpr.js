export const DFLT_SALES_PLATFORM_SUPPORT_CONTACT = {
  label: "",
  email: "",
  phone: "",
  whatsApp: "",
  hours: "",
};

export const SUPPORT_CONTACT_CARD_FIELDS = [
  { key: "label", label: "Label", iconKey: "label" },
  { key: "email", label: "Email", iconKey: "email" },
  { key: "phone", label: "Phone", iconKey: "phone" },
  { key: "whatsApp", label: "WhatsApp", iconKey: "whatsApp" },
  { key: "hours", label: "Hours", iconKey: "hours" },
];

export const SUPPORT_CONTACT_CARD_PREVIEW_FIELDS = SUPPORT_CONTACT_CARD_FIELDS.filter(
  (field) => field.key !== "label",
);

export const SUPPORT_CONTACT_COPYABLE_CARD_FIELDS = new Set([
  "email",
  "phone",
  "whatsApp",
]);

export const SUPPORT_CONTACT_LINK_FIELDS = new Set(["email", "phone", "whatsApp"]);

const hasText = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const formatSupportContactDisplayValue = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "string") return value.trim() || "-";
  return String(value);
};

export const getSupportContactFieldValue = (item, field) => item?.[field.key];

export const getSupportContactCardTitle = (item, index) =>
  item?.label?.trim?.() || `Contact ${index + 1}`;

export const cloneSupportContact = (item = {}) => ({
  ...DFLT_SALES_PLATFORM_SUPPORT_CONTACT,
  ...(item && typeof item === "object" ? item : {}),
});

export const duplicateSupportContact = (item = {}) => {
  const clone = cloneSupportContact(item);
  const baseLabel = clone.label?.trim?.() || "";

  if (baseLabel) {
    clone.label = `${baseLabel} (copy)`;
  }

  return clone;
};

export const copySupportContactText = async (text) => {
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

export const seedSupportContactsFromPlatform = (support = []) => {
  if (!Array.isArray(support)) return [];

  return support.map((item) => cloneSupportContact(item));
};

const digitsOnly = (value = "") => String(value).replace(/\D/g, "");

export const getSupportContactFieldHref = (fieldKey, value = "") => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return null;

  if (fieldKey === "email" && hasText(trimmed)) {
    return `mailto:${trimmed}`;
  }

  if (fieldKey === "phone") {
    const phoneDigits = digitsOnly(trimmed);
    return phoneDigits ? `tel:${phoneDigits}` : null;
  }

  if (fieldKey === "whatsApp") {
    const waDigits = digitsOnly(trimmed);
    return waDigits ? `https://wa.me/${waDigits}` : null;
  }

  return null;
};

/** Contact cards per row; column 6 is always the controls card on the last visible row. */
export const SUPPORT_CONTACTS_PER_ROW = 5;

export const SUPPORT_CONTACTS_SLOTS_PER_ROW = 6;

export const formatSupportContactTotalLabel = (total = 0) =>
  `${total} contact${total === 1 ? "" : "s"}`;

export const buildSupportContactGridRows = ({
  total = 0,
  visibleRows = 1,
  showAll = false,
}) => {
  const maxVisibleContacts = showAll
    ? total
    : Math.min(total, visibleRows * SUPPORT_CONTACTS_PER_ROW);

  const rows = [];

  for (
    let index = 0;
    index < maxVisibleContacts;
    index += SUPPORT_CONTACTS_PER_ROW
  ) {
    rows.push({
      contactIndices: Array.from(
        {
          length: Math.min(
            SUPPORT_CONTACTS_PER_ROW,
            maxVisibleContacts - index,
          ),
        },
        (_, offset) => index + offset,
      ),
      showControls: false,
    });
  }

  if (rows.length === 0) {
    rows.push({ contactIndices: [], showControls: true });
    return rows;
  }

  rows[rows.length - 1].showControls = true;
  return rows;
};

export const getSupportContactGridMeta = ({
  total = 0,
  visibleRows = 1,
  showAll = false,
}) => {
  const maxVisibleContacts = showAll
    ? total
    : Math.min(total, visibleRows * SUPPORT_CONTACTS_PER_ROW);
  const hasHiddenContacts = !showAll && total > maxVisibleContacts;

  const canShowLess = showAll || visibleRows > 1;

  return {
    maxVisibleContacts,
    hasHiddenContacts,
    canShowMore: hasHiddenContacts,
    canShowAll: hasHiddenContacts,
    canShowLess,
  };
};
