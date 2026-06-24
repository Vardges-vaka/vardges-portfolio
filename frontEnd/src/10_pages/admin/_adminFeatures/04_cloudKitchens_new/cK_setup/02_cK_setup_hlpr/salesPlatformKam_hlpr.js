const hasText = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const DFLT_SALES_PLATFORM_KAM = {
  name: "",
  email: "",
  phone: "",
  whatsApp: "",
  hours: "",
  telegram: "",
  notes: "",
};

export const SALES_PLATFORM_KAM_POPOVER_FIELDS = [
  { key: "email", linkable: true, copyable: true },
  { key: "phone", linkable: true, copyable: true },
  { key: "whatsApp", linkable: true, copyable: true },
  { key: "hours", copyable: true },
  { key: "telegram", linkable: true, copyable: true },
  { key: "notes", copyable: true, multiline: true },
];

export const SALES_PLATFORM_KAM_FIELD_ARIA = {
  email: "Email",
  phone: "Phone",
  whatsApp: "WhatsApp",
  hours: "Working hours",
  telegram: "Telegram",
  notes: "Notes",
};

export const seedKamDraftFromPlatform = (kam = {}) => ({
  ...DFLT_SALES_PLATFORM_KAM,
  ...(kam && typeof kam === "object" ? kam : {}),
});

export const formatSalesPlatformKamDisplayValue = (value) => {
  if (!hasText(value)) return "-";
  return String(value).trim();
};

export const formatSalesPlatformKamHeaderName = (kam = {}) => {
  if (!hasText(kam.name)) return "-";
  return String(kam.name).trim();
};

export const getSalesPlatformKamFieldHref = (fieldKey, value) => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return null;

  switch (fieldKey) {
    case "email":
      return `mailto:${trimmed}`;
    case "phone": {
      const digits = trimmed.replace(/\D/g, "");
      return digits ? `tel:${digits}` : null;
    }
    case "whatsApp": {
      const digits = trimmed.replace(/\D/g, "");
      return digits ? `https://wa.me/${digits}` : null;
    }
    case "telegram": {
      if (/^https?:\/\//i.test(trimmed)) return trimmed;
      const username = trimmed.replace(/^@/, "").trim();
      return username ? `https://t.me/${username}` : null;
    }
    default:
      return null;
  }
};

export const shouldOpenSalesPlatformKamLinkInNewTab = (fieldKey) =>
  fieldKey === "whatsApp" || fieldKey === "telegram";
