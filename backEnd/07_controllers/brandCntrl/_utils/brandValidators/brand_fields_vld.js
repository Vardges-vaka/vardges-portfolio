import mongoose from "mongoose";
import {
  date_vld,
  email_vld,
  phone_vld,
} from "../../../../09_validators/_validators.index.js";
import {
  getBrandSectionConfig,
  getByPath,
  setByPath,
} from "../brandSectionConfig.js";

const LANGS = ["en", "ru", "ar"];
const SOCIAL_ACCOUNT_KEYS = [
  "instagram",
  "facebook",
  "tikTok",
  "linkedIn",
  "youtube",
  "twitter",
];

const isStr = (value) => typeof value === "string";
const isBool = (value) => typeof value === "boolean";
const isObj = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const isFiniteNum = (value) =>
  typeof value === "number" && Number.isFinite(value) && !Number.isNaN(value);

const toNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  if (isFiniteNum(value)) return value;
  if (isStr(value)) {
    const number = Number(value.trim());
    if (Number.isFinite(number)) return number;
  }
  return undefined;
};

const ok = (value) => ({ ok: true, value });
const fail = (field, message) => ({ ok: false, field, message });

const checkStr = (value, { field, max, min = 0, required = false }) => {
  if (value === undefined || value === null) {
    if (required) return fail(field, `${field} is required`);
    return ok(undefined);
  }
  if (!isStr(value)) return fail(field, `${field} must be a string`);
  const trimmed = value.trim();
  if (required && trimmed.length === 0) return fail(field, `${field} is required`);
  if (!required && trimmed.length === 0) return ok("");
  if (min > 0 && trimmed.length < min) {
    return fail(field, `${field} is too short (min ${min})`);
  }
  if (max !== undefined && trimmed.length > max) {
    return fail(field, `${field} is too long (max ${max})`);
  }
  return ok(trimmed);
};

const checkBool = (value, { field }) => {
  if (value === undefined || value === null) return ok(undefined);
  if (!isBool(value)) return fail(field, `${field} must be true or false`);
  return ok(value);
};

const checkNum = (value, { field, min, max, integer = false }) => {
  if (value === undefined || value === null || value === "") return ok(null);
  const number = toNumber(value);
  if (number === undefined) return fail(field, `${field} must be a number`);
  if (integer && number !== null && !Number.isInteger(number)) {
    return fail(field, `${field} must be a whole number`);
  }
  if (min !== undefined && number !== null && number < min) {
    return fail(field, `${field} must be >= ${min}`);
  }
  if (max !== undefined && number !== null && number > max) {
    return fail(field, `${field} must be <= ${max}`);
  }
  return ok(number);
};

const checkDate = (value, { field }) => {
  if (value === undefined) return ok(undefined);
  const result = date_vld(value, { field });
  if (!result.isValid) return fail(field, result.message);
  return ok(result.sanitized);
};

const checkEmail = (value, { field }) => {
  if (value === undefined || value === null || value === "") return ok("");
  const result = email_vld(value);
  if (!result.isValid) return fail(field, `${field}: ${result.message}`);
  return ok(String(value).trim().toLowerCase());
};

const checkPhone = (value, { field }) => {
  if (value === undefined || value === null || value === "") return ok("");
  const result = phone_vld(value, { field });
  if (!result.isValid) return fail(field, result.message);
  return ok(result.sanitized ?? "");
};

const checkObjectId = (value, { field, allowEmpty = false } = {}) => {
  if (value === undefined) return ok(undefined);
  if (value === null || value === "") {
    return allowEmpty ? ok(null) : fail(field, `${field} is required`);
  }
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return fail(field, `${field} is invalid`);
  }
  return ok(value);
};

const checkObjectIdArray = (value, { field }) => {
  if (value === undefined || value === null) return ok(undefined);
  if (!Array.isArray(value)) return fail(field, `${field} must be an array`);
  const out = [];
  for (let index = 0; index < value.length; index += 1) {
    const result = checkObjectId(value[index], { field: `${field}[${index}]` });
    if (!result.ok) return result;
    if (!out.includes(result.value)) out.push(result.value);
  }
  return ok(out);
};

const setChecked = (target, key, result) => {
  if (!result.ok) return result;
  if (result.value !== undefined) target[key] = result.value;
  return ok(target);
};

const cleanLocalizedField = (
  value,
  { field, required = false, max = 200, min = 0 },
) => {
  if (value === undefined || value === null) {
    if (required) return fail(field, `${field}.value is required`);
    return ok(undefined);
  }

  const source = isStr(value) ? { value, translations: { en: value } } : value;
  if (!isObj(source)) {
    return fail(field, `${field} must be an object`);
  }

  const out = { translations: {} };

  const valueResult = checkStr(source.value, {
    field: `${field}.value`,
    min,
    max,
    required,
  });
  if (!valueResult.ok) return valueResult;
  if (valueResult.value !== undefined) out.value = valueResult.value;

  if (isObj(source.translations)) {
    for (const lang of LANGS) {
      if (lang in source.translations) {
        const result = checkStr(source.translations[lang], {
          field: `${field}.translations.${lang}`,
          max,
        });
        if (!result.ok) return result;
        if (result.value !== undefined) out.translations[lang] = result.value;
      }
    }
  }

  if (out.value && !out.translations.en) out.translations.en = out.value;
  return ok(out);
};

const cleanFileRefRows = (rows, field) => {
  if (rows === undefined || rows === null) return ok(undefined);
  if (!Array.isArray(rows)) return fail(field, `${field} must be an array`);
  const out = [];
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index] ?? {};
    if (!isObj(row)) return fail(`${field}[${index}]`, `${field}[${index}] must be an object`);
    const clean = {};
    for (const key of ["ref", "value"]) {
      if (key in row) {
        const result = checkStr(row[key], {
          field: `${field}[${index}].${key}`,
          max: key === "value" ? 2048 : 150,
        });
        const applied = setChecked(clean, key, result);
        if (!applied.ok) return applied;
      }
    }
    out.push(clean);
  }
  return ok(out);
};

const cleanContracts = (rows, field) => {
  if (rows === undefined || rows === null) return ok(undefined);
  if (!Array.isArray(rows)) return fail(field, `${field} must be an array`);
  const out = [];
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index] ?? {};
    if (!isObj(row)) return fail(`${field}[${index}]`, `${field}[${index}] must be an object`);
    const clean = {};
    if (row._id) clean._id = row._id;

    for (const key of ["with", "label", "description", "fileUrl", "fileFormat"]) {
      if (key in row) {
        const max = key === "description" ? 1000 : key === "fileUrl" ? 2048 : 150;
        const result = checkStr(row[key], { field: `${field}[${index}].${key}`, max });
        const applied = setChecked(clean, key, result);
        if (!applied.ok) return applied;
      }
    }
    for (const key of ["started", "ending"]) {
      if (key in row) {
        const result = checkDate(row[key], { field: `${field}[${index}].${key}` });
        const applied = setChecked(clean, key, result);
        if (!applied.ok) return applied;
      }
    }
    for (const key of ["isEnded", "isTerminated"]) {
      if (key in row) {
        const result = checkBool(row[key], { field: `${field}[${index}].${key}` });
        const applied = setChecked(clean, key, result);
        if (!applied.ok) return applied;
      }
    }
    if ("noticePeriodInDays" in row) {
      const result = checkNum(row.noticePeriodInDays, {
        field: `${field}[${index}].noticePeriodInDays`,
        min: 0,
        integer: true,
      });
      const applied = setChecked(clean, "noticePeriodInDays", result);
      if (!applied.ok) return applied;
    }
    out.push(clean);
  }
  return ok(out);
};

const cleanFiles = (value, field = "files") => {
  if (value === undefined || value === null) return ok(undefined);
  if (Array.isArray(value)) {
    const legacyRows = cleanFileRefRows(value, field);
    if (!legacyRows.ok) return legacyRows;
    return ok({ miscellaneous: legacyRows.value });
  }
  if (!isObj(value)) return fail(field, `${field} must be an object`);
  const out = {};

  if (isObj(value.logos)) {
    out.logos = {};
    for (const key of ["highRes", "svg", "png", "jpg", "pdf", "ico"]) {
      if (key in value.logos) {
        const result = checkStr(value.logos[key], {
          field: `${field}.logos.${key}`,
          max: 2048,
        });
        const applied = setChecked(out.logos, key, result);
        if (!applied.ok) return applied;
      }
    }
  }

  if (isObj(value.branding)) {
    out.branding = {};
    for (const key of ["brandBook", "brandOverview"]) {
      if (key in value.branding) {
        const result = checkStr(value.branding[key], {
          field: `${field}.branding.${key}`,
          max: 2048,
        });
        const applied = setChecked(out.branding, key, result);
        if (!applied.ok) return applied;
      }
    }
    const packaging = value.branding.packaging ?? value.branding.pachaging;
    if (packaging !== undefined) {
      const rows = cleanFileRefRows(packaging, `${field}.branding.packaging`);
      if (!rows.ok) return rows;
      out.branding.packaging = rows.value;
    }
  }

  if ("contracts" in value) {
    const result = cleanContracts(value.contracts, `${field}.contracts`);
    if (!result.ok) return result;
    out.contracts = result.value;
  }

  if (isObj(value.legal)) {
    out.legal = {};
    for (const key of ["vatCertificate", "tradeLicense", "tradeMark"]) {
      if (key in value.legal) {
        const result = checkStr(value.legal[key], {
          field: `${field}.legal.${key}`,
          max: 2048,
        });
        const applied = setChecked(out.legal, key, result);
        if (!applied.ok) return applied;
      }
    }
  }

  for (const group of ["menus", "recipe"]) {
    if (isObj(value[group])) {
      out[group] = {};
      for (const key of ["pdf", "excel", "word"]) {
        if (key in value[group]) {
          const result = checkStr(value[group][key], {
            field: `${field}.${group}.${key}`,
            max: 2048,
          });
          const applied = setChecked(out[group], key, result);
          if (!applied.ok) return applied;
        }
      }
    }
  }

  if ("miscellaneous" in value) {
    const rows = cleanFileRefRows(value.miscellaneous, `${field}.miscellaneous`);
    if (!rows.ok) return rows;
    out.miscellaneous = rows.value;
  }

  return ok(out);
};

const cleanSocialAccount = (value, field) => {
  if (value === undefined || value === null) return ok(undefined);
  if (isStr(value)) return ok({ link: value.trim(), isActive: true });
  if (!isObj(value)) return fail(field, `${field} must be an object`);
  const out = {};
  if ("isActive" in value) {
    const result = checkBool(value.isActive, { field: `${field}.isActive` });
    const applied = setChecked(out, "isActive", result);
    if (!applied.ok) return applied;
  }
  for (const key of ["link", "consoleLink"]) {
    if (key in value) {
      const result = checkStr(value[key], { field: `${field}.${key}`, max: 2048 });
      const applied = setChecked(out, key, result);
      if (!applied.ok) return applied;
    }
  }
  return ok(out);
};

const cleanWebsite = (value, field = "website") => {
  if (value === undefined || value === null) return ok(undefined);
  if (isStr(value)) return ok({ domain: value.trim(), link: value.trim() });
  if (!isObj(value)) return fail(field, `${field} must be an object`);
  const out = {};

  if ("isActive" in value) {
    const result = checkBool(value.isActive, { field: `${field}.isActive` });
    const applied = setChecked(out, "isActive", result);
    if (!applied.ok) return applied;
  }
  for (const key of [
    "link",
    "consoleLink",
    "domain",
    "registrar",
    "whois",
    "status",
    "dnsStatus",
    "notes",
  ]) {
    if (key in value) {
      const max = ["link", "consoleLink", "whois"].includes(key) ? 2048 : 1000;
      const result = checkStr(value[key], { field: `${field}.${key}`, max });
      const applied = setChecked(out, key, result);
      if (!applied.ok) return applied;
    }
  }
  if ("nameServers" in value) {
    if (!Array.isArray(value.nameServers)) {
      return fail(`${field}.nameServers`, `${field}.nameServers must be an array`);
    }
    out.nameServers = [];
    for (let index = 0; index < value.nameServers.length; index += 1) {
      const result = checkStr(value.nameServers[index], {
        field: `${field}.nameServers[${index}]`,
        max: 255,
      });
      if (!result.ok) return result;
      if (result.value) out.nameServers.push(result.value);
    }
  }
  if ("emails" in value) {
    if (!Array.isArray(value.emails)) {
      return fail(`${field}.emails`, `${field}.emails must be an array`);
    }
    out.emails = [];
    for (let index = 0; index < value.emails.length; index += 1) {
      const row = value.emails[index] ?? {};
      if (!isObj(row)) return fail(`${field}.emails[${index}]`, "Email row must be an object");
      const clean = {};
      if (row._id) clean._id = row._id;
      for (const key of ["name", "position"]) {
        if (key in row) {
          const result = checkStr(row[key], {
            field: `${field}.emails[${index}].${key}`,
            max: 120,
          });
          const applied = setChecked(clean, key, result);
          if (!applied.ok) return applied;
        }
      }
      if ("email" in row) {
        const result = checkEmail(row.email, {
          field: `${field}.emails[${index}].email`,
        });
        const applied = setChecked(clean, "email", result);
        if (!applied.ok) return applied;
      }
      if ("employeeId" in row) {
        const result = checkObjectId(row.employeeId, {
          field: `${field}.emails[${index}].employeeId`,
          allowEmpty: true,
        });
        const applied = setChecked(clean, "employeeId", result);
        if (!applied.ok) return applied;
      }
      out.emails.push(clean);
    }
  }
  if ("dnsRecords" in value) {
    if (!Array.isArray(value.dnsRecords)) {
      return fail(`${field}.dnsRecords`, `${field}.dnsRecords must be an array`);
    }
    out.dnsRecords = [];
    for (let index = 0; index < value.dnsRecords.length; index += 1) {
      const row = value.dnsRecords[index] ?? {};
      if (!isObj(row)) return fail(`${field}.dnsRecords[${index}]`, "DNS row must be an object");
      const clean = {};
      if (row._id) clean._id = row._id;
      for (const key of ["type", "name", "value"]) {
        if (key in row) {
          const result = checkStr(row[key], {
            field: `${field}.dnsRecords[${index}].${key}`,
            max: key === "value" ? 2048 : 255,
          });
          const applied = setChecked(clean, key, result);
          if (!applied.ok) return applied;
        }
      }
      if ("ttl" in row) {
        const result = checkNum(row.ttl, {
          field: `${field}.dnsRecords[${index}].ttl`,
          min: 0,
          integer: true,
        });
        const applied = setChecked(clean, "ttl", result);
        if (!applied.ok) return applied;
      }
      out.dnsRecords.push(clean);
    }
  }
  for (const key of ["expiresOn", "lastRenewedOn"]) {
    if (key in value) {
      const result = checkDate(value[key], { field: `${field}.${key}` });
      const applied = setChecked(out, key, result);
      if (!applied.ok) return applied;
    }
  }
  if ("autoRenew" in value) {
    const result = checkBool(value.autoRenew, { field: `${field}.autoRenew` });
    const applied = setChecked(out, "autoRenew", result);
    if (!applied.ok) return applied;
  }
  if ("renewalHistory" in value) {
    if (!Array.isArray(value.renewalHistory)) {
      return fail(`${field}.renewalHistory`, `${field}.renewalHistory must be an array`);
    }
    out.renewalHistory = [];
    for (let index = 0; index < value.renewalHistory.length; index += 1) {
      const row = value.renewalHistory[index] ?? {};
      if (!isObj(row)) return fail(`${field}.renewalHistory[${index}]`, "Renewal row must be an object");
      const clean = {};
      if (row._id) clean._id = row._id;
      if ("renewedOn" in row) {
        const result = checkDate(row.renewedOn, {
          field: `${field}.renewalHistory[${index}].renewedOn`,
        });
        const applied = setChecked(clean, "renewedOn", result);
        if (!applied.ok) return applied;
      }
      if ("amount" in row) {
        const result = checkNum(row.amount, {
          field: `${field}.renewalHistory[${index}].amount`,
          min: 0,
        });
        const applied = setChecked(clean, "amount", result);
        if (!applied.ok) return applied;
      }
      for (const key of ["currency", "transactionId"]) {
        if (key in row) {
          const result = checkStr(row[key], {
            field: `${field}.renewalHistory[${index}].${key}`,
            max: 120,
          });
          const applied = setChecked(clean, key, result);
          if (!applied.ok) return applied;
        }
      }
      if (isObj(row.card)) {
        clean.card = {};
        for (const key of ["brand", "last4", "cardholder"]) {
          if (key in row.card) {
            const result = checkStr(row.card[key], {
              field: `${field}.renewalHistory[${index}].card.${key}`,
              max: 120,
            });
            const applied = setChecked(clean.card, key, result);
            if (!applied.ok) return applied;
          }
        }
      }
      out.renewalHistory.push(clean);
    }
  }
  return ok(out);
};

const cleanOtherSocials = (value, field = "otherSocials") => {
  if (value === undefined || value === null) return ok(undefined);
  if (!Array.isArray(value)) return fail(field, `${field} must be an array`);
  const out = [];
  for (let index = 0; index < value.length; index += 1) {
    const row = value[index] ?? {};
    if (!isObj(row)) return fail(`${field}[${index}]`, `${field}[${index}] must be an object`);
    const clean = {};
    if (row._id) clean._id = row._id;
    for (const key of ["name", "link", "notes"]) {
      if (key in row) {
        const result = checkStr(row[key], {
          field: `${field}[${index}].${key}`,
          max: key === "link" ? 2048 : 500,
        });
        const applied = setChecked(clean, key, result);
        if (!applied.ok) return applied;
      }
    }
    if ("isActive" in row) {
      const result = checkBool(row.isActive, { field: `${field}[${index}].isActive` });
      const applied = setChecked(clean, "isActive", result);
      if (!applied.ok) return applied;
    }
    out.push(clean);
  }
  return ok(out);
};

const cleanRegisteredPhones = (value, field) => {
  if (value === undefined || value === null) return ok(undefined);
  if (!Array.isArray(value)) return fail(field, `${field} must be an array`);
  const out = [];
  for (let index = 0; index < value.length; index += 1) {
    const row = value[index] ?? {};
    if (!isObj(row)) return fail(`${field}[${index}]`, `${field}[${index}] must be an object`);
    const clean = {};
    if (row._id) clean._id = row._id;
    if ("branch" in row) {
      const result = checkObjectId(row.branch, {
        field: `${field}[${index}].branch`,
        allowEmpty: true,
      });
      const applied = setChecked(clean, "branch", result);
      if (!applied.ok) return applied;
    }
    if ("phone" in row) {
      const result = checkPhone(row.phone, { field: `${field}[${index}].phone` });
      const applied = setChecked(clean, "phone", result);
      if (!applied.ok) return applied;
    }
    for (const key of ["isActive", "isWhatsAppRegistered", "isTelegramRegistered"]) {
      if (key in row) {
        const result = checkBool(row[key], { field: `${field}[${index}].${key}` });
        const applied = setChecked(clean, key, result);
        if (!applied.ok) return applied;
      }
    }
    for (const key of ["purpose", "notes"]) {
      if (key in row) {
        const result = checkStr(row[key], {
          field: `${field}[${index}].${key}`,
          max: 500,
        });
        const applied = setChecked(clean, key, result);
        if (!applied.ok) return applied;
      }
    }
    if ("registeredAt" in row) {
      const result = checkDate(row.registeredAt, {
        field: `${field}[${index}].registeredAt`,
      });
      const applied = setChecked(clean, "registeredAt", result);
      if (!applied.ok) return applied;
    }
    out.push(clean);
  }
  return ok(out);
};

const cleanLoginCredentials = (value, field) => {
  if (value === undefined || value === null) return ok(undefined);
  if (!Array.isArray(value)) return fail(field, `${field} must be an array`);
  const out = [];
  for (let index = 0; index < value.length; index += 1) {
    const row = value[index] ?? {};
    if (!isObj(row)) return fail(`${field}[${index}]`, `${field}[${index}] must be an object`);
    const clean = {};
    if (row._id) clean._id = row._id;
    if (isObj(row.belongTo)) {
      clean.belongTo = {};
      if ("name" in row.belongTo) {
        const result = checkStr(row.belongTo.name, {
          field: `${field}[${index}].belongTo.name`,
          max: 150,
        });
        const applied = setChecked(clean.belongTo, "name", result);
        if (!applied.ok) return applied;
      }
      const employeeId = row.belongTo.employeeId ?? row.belongTo.emloyeeId;
      if (employeeId !== undefined) {
        const result = checkObjectId(employeeId, {
          field: `${field}[${index}].belongTo.employeeId`,
          allowEmpty: true,
        });
        const applied = setChecked(clean.belongTo, "employeeId", result);
        if (!applied.ok) return applied;
      }
    }
    for (const key of ["username", "password", "phoneNumber", "type"]) {
      if (key in row) {
        const result = checkStr(row[key], {
          field: `${field}[${index}].${key}`,
          max: key === "password" ? 2048 : 255,
        });
        const applied = setChecked(clean, key, result);
        if (!applied.ok) return applied;
      }
    }
    if ("email" in row) {
      const result = checkEmail(row.email, { field: `${field}[${index}].email` });
      const applied = setChecked(clean, "email", result);
      if (!applied.ok) return applied;
    }
    const otpValue =
      row.doesOtpRequired !== undefined
        ? row.doesOtpRequired
        : row.DoesOTPrequired;
    if (otpValue !== undefined) {
      const result = checkBool(otpValue, {
        field: `${field}[${index}].doesOtpRequired`,
      });
      const applied = setChecked(clean, "doesOtpRequired", result);
      if (!applied.ok) return applied;
    }
    out.push(clean);
  }
  return ok(out);
};

const cleanIntegration = (value, field) => {
  if (value === undefined || value === null) return ok(undefined);
  if (!isObj(value)) return fail(field, `${field} must be an object`);
  const out = {};
  if (value._id) out._id = value._id;
  for (const key of ["provider", "notes"]) {
    if (key in value) {
      const result = checkStr(value[key], {
        field: `${field}.${key}`,
        max: key === "notes" ? 2000 : 150,
      });
      const applied = setChecked(out, key, result);
      if (!applied.ok) return applied;
    }
  }
  if ("startedAt" in value) {
    const result = checkDate(value.startedAt, { field: `${field}.startedAt` });
    const applied = setChecked(out, "startedAt", result);
    if (!applied.ok) return applied;
  }
  if ("isActive" in value) {
    const result = checkBool(value.isActive, { field: `${field}.isActive` });
    const applied = setChecked(out, "isActive", result);
    if (!applied.ok) return applied;
  }
  const srcPayment = value.payment ?? {};
  if (isObj(srcPayment)) {
    out.payment = {};
    const paymentMap = {
      cycle: srcPayment.cycle ?? srcPayment.Cycle,
      method: srcPayment.method ?? srcPayment.Method,
      amount: srcPayment.amount ?? srcPayment.Amount,
      currency: srcPayment.currency ?? srcPayment.Currency,
    };
    for (const key of ["cycle", "method", "currency"]) {
      if (paymentMap[key] !== undefined) {
        const result = checkStr(paymentMap[key], {
          field: `${field}.payment.${key}`,
          max: 80,
        });
        const applied = setChecked(out.payment, key, result);
        if (!applied.ok) return applied;
      }
    }
    if (paymentMap.amount !== undefined) {
      const result = checkNum(paymentMap.amount, {
        field: `${field}.payment.amount`,
        min: 0,
      });
      const applied = setChecked(out.payment, "amount", result);
      if (!applied.ok) return applied;
    }
  }
  if (isObj(value.credentials)) {
    out.credentials = {};
    for (const key of ["apiKey", "secret", "accountId"]) {
      if (key in value.credentials) {
        const result = checkStr(value.credentials[key], {
          field: `${field}.credentials.${key}`,
          max: 4096,
        });
        const applied = setChecked(out.credentials, key, result);
        if (!applied.ok) return applied;
      }
    }
  }
  if (isObj(value.mainContacts)) {
    out.mainContacts = {};
    for (const key of ["telegram", "whatsApp", "phone", "email"]) {
      if (key === "email" && key in value.mainContacts) {
        const result = checkEmail(value.mainContacts.email, {
          field: `${field}.mainContacts.email`,
        });
        const applied = setChecked(out.mainContacts, "email", result);
        if (!applied.ok) return applied;
      } else if (key in value.mainContacts) {
        const result =
          key === "phone"
            ? checkPhone(value.mainContacts[key], {
                field: `${field}.mainContacts.${key}`,
              })
            : checkStr(value.mainContacts[key], {
                field: `${field}.mainContacts.${key}`,
                max: 255,
              });
        const applied = setChecked(out.mainContacts, key, result);
        if (!applied.ok) return applied;
      }
    }
  }
  const phones = value.registeredPhones ?? value.registredPhones;
  if (phones !== undefined) {
    const result = cleanRegisteredPhones(phones, `${field}.registeredPhones`);
    if (!result.ok) return result;
    out.registeredPhones = result.value;
  }
  if ("loginCredentials" in value) {
    const result = cleanLoginCredentials(value.loginCredentials, `${field}.loginCredentials`);
    if (!result.ok) return result;
    out.loginCredentials = result.value;
  }
  return ok(out);
};

const cleanIntegrationArray = (value, field) => {
  if (value === undefined || value === null) return ok(undefined);
  if (!Array.isArray(value)) return fail(field, `${field} must be an array`);
  const out = [];
  for (let index = 0; index < value.length; index += 1) {
    const result = cleanIntegration(value[index], `${field}[${index}]`);
    if (!result.ok) return result;
    out.push(result.value);
  }
  return ok(out);
};

const cleanLegal = (value, field = "legal") => {
  if (value === undefined || value === null) return ok(undefined);
  if (!isObj(value)) return fail(field, `${field} must be an object`);
  const out = {};
  if (isObj(value.registeredIn)) {
    out.registeredIn = {};
    for (const key of ["country", "city", "emirate"]) {
      if (key in value.registeredIn) {
        const result = checkStr(value.registeredIn[key], {
          field: `${field}.registeredIn.${key}`,
          max: 120,
        });
        const applied = setChecked(out.registeredIn, key, result);
        if (!applied.ok) return applied;
      }
    }
    for (const key of ["hasTradeLicense", "hasVATCertificate", "hasTradeMark"]) {
      if (key in value.registeredIn) {
        const result = checkBool(value.registeredIn[key], {
          field: `${field}.registeredIn.${key}`,
        });
        const applied = setChecked(out.registeredIn, key, result);
        if (!applied.ok) return applied;
      }
    }
    if ("dateOfRegistration" in value.registeredIn) {
      const result = checkDate(value.registeredIn.dateOfRegistration, {
        field: `${field}.registeredIn.dateOfRegistration`,
      });
      const applied = setChecked(out.registeredIn, "dateOfRegistration", result);
      if (!applied.ok) return applied;
    }
  }
  return ok(out);
};

const mergeSocials = (target, partial) => {
  if (!partial || Object.keys(partial).length === 0) return;
  if (!target.socials) target.socials = {};
  Object.assign(target.socials, partial);
};

export const validateBrandFields = (data, { isUpdate = false } = {}) => {
  const out = {};

  if ("name" in data) {
    const result = cleanLocalizedField(data.name, {
      field: "name",
      min: 2,
      max: 120,
      required: !isUpdate,
    });
    if (!result.ok) return result;
    if (result.value !== undefined) out.name = result.value;
  } else if (!isUpdate) {
    return fail("name.value", "name.value is required");
  }

  if ("tagline" in data) {
    const result = cleanLocalizedField(data.tagline, {
      field: "tagline",
      max: 240,
    });
    if (!result.ok) return result;
    if (result.value !== undefined) out.tagline = result.value;
  }

  if ("logo" in data) {
    const result = checkStr(data.logo, { field: "logo", max: 2048 });
    if (!result.ok) return result;
    if (result.value !== undefined) {
      setByPath(out, "files.logos.highRes", result.value);
    }
  }

  if ("files" in data) {
    const result = cleanFiles(data.files, "files");
    if (!result.ok) return result;
    if (result.value !== undefined) out.files = result.value;
  }

  if ("socials" in data && data.socials) {
    if (!isObj(data.socials)) return fail("socials", "socials must be an object");
    const socials = {};
    for (const key of SOCIAL_ACCOUNT_KEYS) {
      if (key in data.socials) {
        const result = cleanSocialAccount(data.socials[key], `socials.${key}`);
        if (!result.ok) return result;
        if (result.value !== undefined) socials[key] = result.value;
      }
    }
    if ("website" in data.socials) {
      const result = cleanWebsite(data.socials.website, "socials.website");
      if (!result.ok) return result;
      if (result.value !== undefined) socials.website = result.value;
    }
    if ("domain" in data.socials) {
      const result = checkStr(data.socials.domain, {
        field: "socials.domain",
        max: 255,
      });
      if (!result.ok) return result;
      socials.website = { ...(socials.website ?? {}), domain: result.value };
    }
    if ("others" in data.socials) {
      const result = cleanOtherSocials(data.socials.others, "socials.others");
      if (!result.ok) return result;
      if (result.value !== undefined) socials.others = result.value;
    }
    mergeSocials(out, socials);
  }

  if ("website" in data) {
    const result = cleanWebsite(data.website, "website");
    if (!result.ok) return result;
    if (result.value !== undefined) mergeSocials(out, { website: result.value });
  }

  if ("otherSocials" in data) {
    const result = cleanOtherSocials(data.otherSocials, "otherSocials");
    if (!result.ok) return result;
    if (result.value !== undefined) mergeSocials(out, { others: result.value });
  }

  if ("emails" in data) {
    const result = cleanWebsite({ emails: data.emails }, "website");
    if (!result.ok) return result;
    mergeSocials(out, { website: result.value });
  }

  if ("inventoryIntegrations" in data) {
    const result = cleanIntegrationArray(
      data.inventoryIntegrations,
      "inventoryIntegrations",
    );
    if (!result.ok) return result;
    if (result.value !== undefined) out.inventoryIntegrations = result.value;
  }

  if ("integrations" in data) {
    const source = Array.isArray(data.integrations)
      ? data.integrations
      : [data.integrations];
    const result = cleanIntegrationArray(source, "inventoryIntegrations");
    if (!result.ok) return result;
    out.inventoryIntegrations = result.value;
  }

  if ("salesIntegration" in data) {
    const result = cleanIntegration(data.salesIntegration, "salesIntegration");
    if (!result.ok) return result;
    if (result.value !== undefined) out.salesIntegration = result.value;
  }

  if ("legal" in data) {
    const result = cleanLegal(data.legal, "legal");
    if (!result.ok) return result;
    if (result.value !== undefined) out.legal = result.value;
  }

  if ("isActive" in data) {
    const result = checkBool(data.isActive, { field: "isActive" });
    if (!result.ok) return result;
    if (result.value !== undefined) out.isActive = result.value;
  }

  for (const key of ["employees", "equipments", "branches", "competitors"]) {
    if (key in data) {
      const result = checkObjectIdArray(data[key], { field: key });
      if (!result.ok) return result;
      if (result.value !== undefined) out[key] = result.value;
    }
  }

  if ("menu" in data) {
    const result = checkObjectId(data.menu, { field: "menu", allowEmpty: true });
    if (!result.ok) return result;
    out.menu = result.value;
  }

  return { ok: true, sanitized: out };
};

export const validateBrandSectionValue = (sectionKey, value) => {
  const config = getBrandSectionConfig(sectionKey);
  if (!config) return fail("sectionKey", "Unknown brand section");

  const input = {};
  if (sectionKey === "website" || sectionKey === "otherSocials") {
    input[sectionKey] = value;
  } else {
    setByPath(input, config.path, value);
  }

  const result = validateBrandFields(input, { isUpdate: true });
  if (!result.ok) return result;

  return ok(getByPath(result.sanitized, config.path));
};

export const validateBrandSectionItemValue = (sectionKey, value) => {
  const config = getBrandSectionConfig(sectionKey);
  if (!config) return fail("sectionKey", "Unknown brand section");
  if (!config.itemRoutes) {
    return fail("sectionKey", `${sectionKey} does not support item routes`);
  }

  const wrapped = [value ?? {}];
  const sectionResult = validateBrandSectionValue(sectionKey, wrapped);
  if (!sectionResult.ok) return sectionResult;
  return ok(sectionResult.value?.[0] ?? {});
};
