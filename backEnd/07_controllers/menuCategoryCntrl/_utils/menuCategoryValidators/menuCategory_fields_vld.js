import mongoose from "mongoose";
import { time_vld } from "../../../../09_validators/_validators.index.js";

const isStr = (value) => typeof value === "string";
const isBool = (value) => typeof value === "boolean";

const checkStr = (value, { field, max, min = 0, required = false }) => {
  if (value === undefined || value === null) {
    if (required) return { err: `${field} is required` };
    return { value: undefined };
  }
  if (!isStr(value)) return { err: `${field} must be a string` };

  const trimmed = value.trim();
  if (required && trimmed.length === 0) return { err: `${field} is required` };
  if (!required && trimmed.length === 0) return { value: "" };
  if (min > 0 && trimmed.length < min) {
    return { err: `${field} is too short (min ${min})` };
  }
  if (max !== undefined && trimmed.length > max) {
    return { err: `${field} is too long (max ${max})` };
  }

  return { value: trimmed };
};

const checkBool = (value, { field }) => {
  if (value === undefined || value === null) return { value: undefined };
  if (!isBool(value)) return { err: `${field} must be true or false` };
  return { value };
};

const applyCheck = (result, { out, set, field }) => {
  if (result.err) return { ok: false, field, message: result.err };
  if (result.value !== undefined) set(out, result.value);
  return { ok: true };
};

const validateLocalizedName = (data, { isUpdate }) => {
  const name = data.name;
  if (name === undefined || name === null) {
    if (!isUpdate) return { ok: false, field: "name", message: "Name is required" };
    return { ok: true, sanitized: undefined };
  }

  if (typeof name !== "object" || Array.isArray(name)) {
    return { ok: false, field: "name", message: "Name must be an object" };
  }

  const out = {};
  let hasContent = false;

  for (const lang of ["en", "ru", "ar"]) {
    if (lang in name) {
      const result = checkStr(name[lang], { field: `name.${lang}`, max: 200 });
      if (result.err) return { ok: false, field: `name.${lang}`, message: result.err };
      if (result.value !== undefined) {
        out[lang] = result.value;
        if (result.value.length > 0) hasContent = true;
      }
    }
  }

  if (!isUpdate && !hasContent) {
    return { ok: false, field: "name", message: "At least one language for name is required" };
  }

  return { ok: true, sanitized: out };
};

const validateActiveTimings = (data) => {
  const timings = data.activeTimings;
  if (timings === undefined || timings === null) return { ok: true, sanitized: undefined };

  if (typeof timings !== "object" || Array.isArray(timings)) {
    return { ok: false, field: "activeTimings", message: "activeTimings must be an object" };
  }

  const out = {};

  if ("isAlwaysActive" in timings) {
    const result = checkBool(timings.isAlwaysActive, { field: "activeTimings.isAlwaysActive" });
    if (result.err) return { ok: false, field: "activeTimings.isAlwaysActive", message: result.err };
    if (result.value !== undefined) out.isAlwaysActive = result.value;
  }

  if ("windows" in timings) {
    if (!Array.isArray(timings.windows)) {
      return { ok: false, field: "activeTimings.windows", message: "windows must be an array" };
    }

    const windows = [];
    for (let i = 0; i < timings.windows.length; i += 1) {
      const win = timings.windows[i] ?? {};
      const entry = {};

      if ("label" in win) {
        const result = checkStr(win.label, { field: `windows[${i}].label`, max: 100 });
        if (result.err) return { ok: false, field: `windows[${i}].label`, message: result.err };
        if (result.value !== undefined) entry.label = result.value;
      }

      for (const key of ["from", "to"]) {
        if (key in win) {
          const result = time_vld(win[key], { field: `windows[${i}].${key}` });
          if (!result.isValid) {
            return { ok: false, field: `windows[${i}].${key}`, message: result.message };
          }
          entry[key] = result.sanitized;
        }
      }

      windows.push(entry);
    }

    out.windows = windows;
  }

  return { ok: true, sanitized: out };
};

export const validateMenuCategoryFields = (data, { isUpdate = false } = {}) => {
  const out = {};

  // name — localized text
  const nameResult = validateLocalizedName(data, { isUpdate });
  if (!nameResult.ok) return nameResult;
  if (nameResult.sanitized !== undefined) out.name = nameResult.sanitized;

  // menuItems — array of ObjectIds
  if ("menuItems" in data) {
    if (!Array.isArray(data.menuItems)) {
      return { ok: false, field: "menuItems", message: "menuItems must be an array" };
    }

    const ids = [];
    for (let i = 0; i < data.menuItems.length; i += 1) {
      const val = data.menuItems[i];
      if (!val || !mongoose.Types.ObjectId.isValid(val)) {
        return { ok: false, field: `menuItems[${i}]`, message: `Invalid ObjectId at index ${i}` };
      }
      ids.push(val);
    }
    out.menuItems = ids;
  }

  // activeTimings
  const timingsResult = validateActiveTimings(data);
  if (!timingsResult.ok) return timingsResult;
  if (timingsResult.sanitized !== undefined) out.activeTimings = timingsResult.sanitized;

  // isActive
  if ("isActive" in data) {
    const result = checkBool(data.isActive, { field: "isActive" });
    const res = applyCheck(result, {
      out,
      set: (o, value) => (o.isActive = value),
      field: "isActive",
    });
    if (!res.ok) return res;
  }

  return { ok: true, sanitized: out };
};
