import {
  DEFAULT_TEL_COUNTRY_CODE,
  COUNTRY_CODES,
} from "./telCountryCodes.js";

const digitsOnly = (value = "") => String(value).replace(/\D/g, "");

export const TEL_KINDS = ["phone", "whatsApp", "telegram"];

export const TELEGRAM_MODES = ["username", "number"];

export const DEFAULT_PHONE_LEFT_ICON = {
  isActive: true,
  type: "lucide",
  lucidIcon: "Phone",
  decorative: true,
};

export const parseTelNumberValue = (
  value,
  countries = COUNTRY_CODES,
  fallbackCode = DEFAULT_TEL_COUNTRY_CODE,
) => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) {
    return { countryCode: fallbackCode, nationalNumber: "" };
  }

  const sorted = [...countries].sort(
    (a, b) => b.code.length - a.code.length,
  );

  for (const country of sorted) {
    if (trimmed.startsWith(country.code)) {
      return {
        countryCode: country.code,
        nationalNumber: digitsOnly(trimmed.slice(country.code.length)),
      };
    }

    const codeDigits = digitsOnly(country.code);
    const valueDigits = digitsOnly(trimmed);
    if (codeDigits && valueDigits.startsWith(codeDigits)) {
      return {
        countryCode: country.code,
        nationalNumber: valueDigits.slice(codeDigits.length),
      };
    }
  }

  return {
    countryCode: fallbackCode,
    nationalNumber: digitsOnly(trimmed),
  };
};

export const buildTelNumberValue = (countryCode, nationalNumber) => {
  const digits = digitsOnly(nationalNumber);
  if (!digits) return "";
  return `${countryCode}${digits}`;
};

export const detectTelegramMode = (value) => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "username";
  if (trimmed.startsWith("@")) return "username";
  if (/^[+0-9\s\-().]+$/.test(trimmed)) return "number";
  return "username";
};

export const sanitizeTelegramUsername = (value = "") =>
  String(value)
    .trim()
    .replace(/^@+/, "")
    .replace(/[^a-zA-Z0-9_]/g, "");

export const sanitizeNationalNumber = (value = "") => digitsOnly(value);

export const getTelValidationStatus = (
  kind,
  value,
  { telegramMode = "username" } = {},
) => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "empty";

  if (kind === "telegram" && telegramMode === "username") {
    const username = sanitizeTelegramUsername(trimmed);
    if (username.length < 3 || username.length > 32) return "invalid";
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "invalid";
    return "valid";
  }

  const digits = digitsOnly(trimmed);
  if (digits.length < 6 || digits.length > 15) return "invalid";
  return "valid";
};

export const getTelStatusRightIcon = (status) => {
  if (status === "valid") {
    return {
      isActive: true,
      type: "lucide",
      lucidIcon: "CircleCheck",
      decorative: true,
      className: "input_tel__statusIcon--success",
    };
  }

  if (status === "invalid") {
    return {
      isActive: true,
      type: "lucide",
      lucidIcon: "AlertTriangle",
      decorative: true,
      className: "input_tel__statusIcon--error",
    };
  }

  return { isActive: false };
};

export const getTelStatusHints = (status, kind) => {
  if (status === "invalid") {
    if (kind === "telegram") {
      return {
        isActive: true,
        type: "error",
        message: "Enter a valid Telegram username or phone number.",
      };
    }

    return {
      isActive: true,
      type: "error",
      message: "Enter a valid phone number with country code.",
    };
  }

  if (status === "valid") {
    return {
      isActive: true,
      type: "success",
      message: "Looks good.",
    };
  }

  return { isActive: false };
};

export const getTelActionHref = (
  kind,
  value,
  { telegramMode = "username" } = {},
) => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return null;

  if (kind === "telegram" && telegramMode === "username") {
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    const username = sanitizeTelegramUsername(trimmed);
    return username ? `https://t.me/${username}` : null;
  }

  const digits = digitsOnly(trimmed);
  if (!digits) return null;

  if (kind === "whatsApp") return `https://wa.me/${digits}`;
  return `tel:${digits}`;
};

export const getTelActionTitle = (kind, canOpen) => {
  if (!canOpen) {
    if (kind === "whatsApp") return "Enter a valid WhatsApp number to open chat";
    if (kind === "telegram") return "Enter a valid Telegram handle to open chat";
    return "Enter a valid phone number to call";
  }

  if (kind === "whatsApp") return "Open WhatsApp chat";
  if (kind === "telegram") return "Open Telegram chat";
  return "Call phone number";
};

export const formatReadOnlyTelDisplay = (value, maxChars = 18) => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "";
  if (trimmed.length <= maxChars) return trimmed;
  return `${trimmed.slice(0, maxChars)}…`;
};
