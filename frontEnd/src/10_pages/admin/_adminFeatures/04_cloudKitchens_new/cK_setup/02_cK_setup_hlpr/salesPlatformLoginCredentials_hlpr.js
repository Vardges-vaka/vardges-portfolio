export const DFLT_SALES_PLATFORM_LOGIN_CREDENTIAL = {
  label: "",
  username: "",
  password: "",
  email: "",
  phone: "",
  loginType: "",
  belongsTo: { name: "", employee: "" },
  accessSites: [],
  requiresOtp: false,
  notes: "",
};

export const LOGIN_TYPE_LABELS = {
  email: "Email",
  phone: "Phone",
};

export const LOGIN_CREDENTIAL_CARD_FIELDS = [
  { key: "username", label: "Username", iconKey: "username" },
  { key: "password", label: "Password", masked: true, iconKey: "password" },
  { key: "email", label: "Login email", iconKey: "email" },
  { key: "phone", label: "Login phone", iconKey: "phone" },
  { key: "loginType", label: "Login type", format: "loginType", iconKey: "loginType" },
  {
    key: "belongsTo.name",
    label: "Belongs to",
    nested: "belongsTo",
    nestedKey: "name",
    iconKey: "belongsTo",
  },
  { key: "requiresOtp", label: "Requires OTP", format: "boolean", iconKey: "requiresOtp" },
  { key: "notes", label: "Notes", iconKey: "notes" },
];

export const LOGIN_CREDENTIAL_CARD_PREVIEW_FIELDS = LOGIN_CREDENTIAL_CARD_FIELDS.filter(
  (field) => field.key !== "notes",
);

export const LOGIN_CREDENTIAL_COPYABLE_CARD_FIELDS = new Set(["username", "password"]);

const hasText = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const formatLoginCredentialDisplayValue = (value, format) => {
  if (format === "boolean") return value ? "Yes" : "No";
  if (format === "loginType") {
    if (!hasText(value)) return "-";
    return LOGIN_TYPE_LABELS[value] || String(value).trim();
  }
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "string") return value.trim() || "-";
  return String(value);
};

export const getLoginCredentialFieldValue = (item, field) => {
  if (field.nested) {
    return item?.[field.nested]?.[field.nestedKey];
  }
  return item?.[field.key];
};

export const getLoginCredentialCardTitle = (item, index) =>
  item?.label?.trim?.() || `Credential ${index + 1}`;

export const getLoginCredentialUsernameHref = (item, partnerPortalUrl = "") => {
  const portal = String(partnerPortalUrl ?? "").trim();
  if (portal) {
    if (/^https?:\/\//i.test(portal)) return portal;
    return `https://${portal}`;
  }

  const email = String(item?.email ?? "").trim();
  if (item?.loginType === "email" && email) return `mailto:${email}`;

  const username = String(item?.username ?? "").trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) return `mailto:${username}`;

  return null;
};

export const getLoginCredentialPasswordHref = (partnerPortalUrl = "") => {
  const portal = String(partnerPortalUrl ?? "").trim();
  if (!portal) return null;
  if (/^https?:\/\//i.test(portal)) return portal;
  return `https://${portal}`;
};

export const cloneLoginCredential = (item = {}) => ({
  ...DFLT_SALES_PLATFORM_LOGIN_CREDENTIAL,
  ...(item && typeof item === "object" ? item : {}),
  belongsTo: {
    ...DFLT_SALES_PLATFORM_LOGIN_CREDENTIAL.belongsTo,
    ...(item?.belongsTo && typeof item.belongsTo === "object"
      ? item.belongsTo
      : {}),
  },
  accessSites: Array.isArray(item?.accessSites) ? [...item.accessSites] : [],
});

export const duplicateLoginCredential = (item = {}) => {
  const clone = cloneLoginCredential(item);
  const baseLabel = clone.label?.trim?.() || "";

  if (baseLabel) {
    clone.label = `${baseLabel} (copy)`;
  }

  return clone;
};

export const copyLoginCredentialText = async (text) => {
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

export const seedLoginCredentialsFromPlatform = (loginCredentials = []) => {
  if (!Array.isArray(loginCredentials)) return [];

  return loginCredentials.map((item) => cloneLoginCredential(item));
};

/** Credential cards per row; column 6 is always the controls card on the last visible row. */
export const LOGIN_CREDENTIALS_PER_ROW = 5;

export const LOGIN_CREDENTIALS_SLOTS_PER_ROW = 6;

export const formatLoginCredentialTotalLabel = (total = 0) =>
  `${total} credential${total === 1 ? "" : "s"}`;

export const buildLoginCredentialGridRows = ({
  total = 0,
  visibleRows = 1,
  showAll = false,
}) => {
  const maxVisibleCredentials = showAll
    ? total
    : Math.min(total, visibleRows * LOGIN_CREDENTIALS_PER_ROW);

  const rows = [];

  for (
    let index = 0;
    index < maxVisibleCredentials;
    index += LOGIN_CREDENTIALS_PER_ROW
  ) {
    rows.push({
      credentialIndices: Array.from(
        {
          length: Math.min(
            LOGIN_CREDENTIALS_PER_ROW,
            maxVisibleCredentials - index,
          ),
        },
        (_, offset) => index + offset,
      ),
      showControls: false,
    });
  }

  if (rows.length === 0) {
    rows.push({ credentialIndices: [], showControls: true });
    return rows;
  }

  rows[rows.length - 1].showControls = true;
  return rows;
};

export const getLoginCredentialGridMeta = ({
  total = 0,
  visibleRows = 1,
  showAll = false,
}) => {
  const maxVisibleCredentials = showAll
    ? total
    : Math.min(total, visibleRows * LOGIN_CREDENTIALS_PER_ROW);
  const hasHiddenCredentials = !showAll && total > maxVisibleCredentials;

  const canShowLess = showAll || visibleRows > 1;

  return {
    maxVisibleCredentials,
    hasHiddenCredentials,
    canShowMore: hasHiddenCredentials,
    canShowAll: hasHiddenCredentials,
    canShowLess,
  };
};
