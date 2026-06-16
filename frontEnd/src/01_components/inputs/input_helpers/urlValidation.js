/** URL prefix validation — requires full `https://` or `http://` (https checked first). */
export const getUrlValidationStatus = (value) => {
  const trimmed = String(value ?? "").trim();

  if (!trimmed) return "empty";

  const lower = trimmed.toLowerCase();

  if (lower.startsWith("https://")) return "secure";
  if (lower.startsWith("http://")) return "insecure";
  return "invalid";
};

export const URL_VALIDATION_MESSAGES = {
  insecure:
    "This connection may not be secure. Prefer https:// when possible.",
  invalid: "URL must start with http:// or https://",
};

export const DEFAULT_URL_LEFT_ICON = {
  isActive: true,
  type: "lucide",
  lucidIcon: "Link",
  decorative: true,
};

export const getUrlStatusRightIcon = (status) => {
  if (status === "secure") {
    return {
      isActive: true,
      type: "lucide",
      lucidIcon: "CircleCheck",
      decorative: true,
      className: "input_url__statusIcon input_url__statusIcon--success",
    };
  }

  if (status === "insecure") {
    return {
      isActive: true,
      type: "lucide",
      lucidIcon: "AlertTriangle",
      decorative: true,
      className: "input_url__statusIcon input_url__statusIcon--warning",
    };
  }

  if (status === "invalid") {
    return {
      isActive: true,
      type: "lucide",
      lucidIcon: "CircleX",
      decorative: true,
      className: "input_url__statusIcon input_url__statusIcon--error",
    };
  }

  return { isActive: false };
};

export const getUrlStatusHints = (status) => {
  if (status === "insecure") {
    return {
      isActive: true,
      type: "hint",
      message: URL_VALIDATION_MESSAGES.insecure,
      className: "input_url__hint input_url__hint--warning",
    };
  }

  if (status === "invalid") {
    return {
      isActive: true,
      type: "error",
      message: URL_VALIDATION_MESSAGES.invalid,
    };
  }

  return { isActive: false };
};

/** Prefixes hidden in read-only display (longest matched first). */
const READONLY_HIDDEN_PREFIXES = [
  "https://www.",
  "http://www.",
  "https://",
  "http://",
];

export const stripReadOnlyUrlPrefix = (value) => {
  const str = String(value ?? "");
  const lower = str.toLowerCase();

  for (const prefix of READONLY_HIDDEN_PREFIXES) {
    if (lower.startsWith(prefix)) {
      return str.slice(prefix.length);
    }
  }

  return str;
};

/** Read-only display — hide protocol/www, show max N chars of the remainder. */
export const formatReadOnlyUrlDisplay = (value, maxChars = 10) => {
  const rest = stripReadOnlyUrlPrefix(value);
  if (!rest) return "";
  if (rest.length <= maxChars) return rest;
  return `${rest.slice(0, maxChars)}…`;
};

export const canOpenUrlValue = (value) => {
  const status = getUrlValidationStatus(value);
  return status === "secure" || status === "insecure";
};

export default getUrlValidationStatus;
