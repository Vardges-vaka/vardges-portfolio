import mongoose from "mongoose";
import { time_vld } from "../../../../09_validators/_validators.index.js";

const isStr = (value) => typeof value === "string";
const isBool = (value) => typeof value === "boolean";
const isNum = (value) => typeof value === "number" && !Number.isNaN(value);

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

const checkNum = (value, { field, min }) => {
  if (value === undefined || value === null) return { value: undefined };
  if (!isNum(value)) return { err: `${field} must be a number` };
  if (min !== undefined && value < min) return { err: `${field} must be >= ${min}` };
  return { value };
};

const applyCheck = (result, { out, set, field }) => {
  if (result.err) return { ok: false, field, message: result.err };
  if (result.value !== undefined) set(out, result.value);
  return { ok: true };
};

const validateLocalizedText = (data, { field, required = false }) => {
  if (data === undefined || data === null) {
    if (required) return { err: `${field} is required` };
    return { value: undefined };
  }
  if (typeof data !== "object" || Array.isArray(data)) {
    return { err: `${field} must be an object` };
  }

  const out = {};
  for (const lang of ["en", "ru", "ar"]) {
    const result = checkStr(data[lang], { field: `${field}.${lang}`, max: 200 });
    if (result.err) return result;
    if (result.value !== undefined) out[lang] = result.value;
  }

  if (required && !out.en && !out.ru && !out.ar) {
    return { err: `${field} requires at least one language` };
  }

  return { value: out };
};

const validateDescriptionBundle = (data, { field }) => {
  if (data === undefined || data === null) return { value: undefined };
  if (typeof data !== "object" || Array.isArray(data)) {
    return { err: `${field} must be an object` };
  }

  const out = {};
  for (const channel of ["aggregators", "website", "google"]) {
    if (data[channel] === undefined || data[channel] === null) continue;
    if (typeof data[channel] !== "object" || Array.isArray(data[channel])) {
      return { err: `${field}.${channel} must be an object` };
    }
    const channelOut = {};
    for (const lang of ["en", "ru", "ar"]) {
      const result = checkStr(data[channel][lang], {
        field: `${field}.${channel}.${lang}`,
        max: 2000,
      });
      if (result.err) return result;
      if (result.value !== undefined) channelOut[lang] = result.value;
    }
    out[channel] = channelOut;
  }

  return { value: out };
};

const validateImages = (data, { field }) => {
  if (data === undefined || data === null) return { value: undefined };
  if (typeof data !== "object" || Array.isArray(data)) {
    return { err: `${field} must be an object` };
  }

  const out = {};
  for (const key of ["aggregators", "website", "google", "original", "icon"]) {
    if (data[key] === undefined || data[key] === null) continue;
    const result = checkStr(data[key], { field: `${field}.${key}`, max: 1024 });
    if (result.err) return result;
    if (result.value !== undefined) out[key] = result.value;
  }

  return { value: out };
};

const validateObjectIdArray = (data, { field }) => {
  if (data === undefined || data === null) return { value: undefined };
  if (!Array.isArray(data)) return { err: `${field} must be an array` };

  for (let i = 0; i < data.length; i += 1) {
    if (!mongoose.Types.ObjectId.isValid(data[i])) {
      return { err: `${field}[${i}] is not a valid ObjectId` };
    }
  }

  return { value: data };
};

const validateActiveTimings = (data, { field }) => {
  if (data === undefined || data === null) return { value: undefined };
  if (typeof data !== "object" || Array.isArray(data)) {
    return { err: `${field} must be an object` };
  }

  const out = {};

  if ("isAlwaysActive" in data) {
    const result = checkBool(data.isAlwaysActive, { field: `${field}.isAlwaysActive` });
    if (result.err) return result;
    if (result.value !== undefined) out.isAlwaysActive = result.value;
  }

  if ("windows" in data) {
    if (!Array.isArray(data.windows)) {
      return { err: `${field}.windows must be an array` };
    }

    const windows = [];
    for (let i = 0; i < data.windows.length; i += 1) {
      const win = data.windows[i] ?? {};
      const row = {};

      if ("label" in win) {
        const labelResult = checkStr(win.label, { field: `${field}.windows[${i}].label`, max: 100 });
        if (labelResult.err) return labelResult;
        if (labelResult.value !== undefined) row.label = labelResult.value;
      }

      if ("from" in win) {
        const fromResult = time_vld(win.from, { field: `${field}.windows[${i}].from` });
        if (!fromResult.isValid) return { err: fromResult.message };
        row.from = fromResult.sanitized;
      }

      if ("to" in win) {
        const toResult = time_vld(win.to, { field: `${field}.windows[${i}].to` });
        if (!toResult.isValid) return { err: toResult.message };
        row.to = toResult.sanitized;
      }

      windows.push(row);
    }
    out.windows = windows;
  }

  return { value: out };
};

export const validateMenuItemFields = (data, { isUpdate = false } = {}) => {
  const out = {};

  // name — localized text, required on add
  if ("name" in data) {
    const result = validateLocalizedText(data.name, {
      field: "Name",
      required: !isUpdate,
    });
    if (result.err) return { ok: false, field: "name", message: result.err };
    if (result.value !== undefined) out.name = result.value;
  } else if (!isUpdate) {
    return { ok: false, field: "name", message: "Name is required" };
  }

  // descriptions — description bundle
  if ("descriptions" in data) {
    const result = validateDescriptionBundle(data.descriptions, { field: "Descriptions" });
    if (result.err) return { ok: false, field: "descriptions", message: result.err };
    if (result.value !== undefined) out.descriptions = result.value;
  }

  // cost
  if ("cost" in data) {
    const result = checkNum(data.cost, { field: "Cost", min: 0 });
    const res = applyCheck(result, { out, set: (o, v) => (o.cost = v), field: "cost" });
    if (!res.ok) return res;
  }

  // sellingPrice
  if ("sellingPrice" in data) {
    const result = checkNum(data.sellingPrice, { field: "Selling price", min: 0 });
    const res = applyCheck(result, { out, set: (o, v) => (o.sellingPrice = v), field: "sellingPrice" });
    if (!res.ok) return res;
  }

  // images
  if ("images" in data) {
    const result = validateImages(data.images, { field: "Images" });
    if (result.err) return { ok: false, field: "images", message: result.err };
    if (result.value !== undefined) out.images = result.value;
  }

  // recipeFile
  if ("recipeFile" in data) {
    const result = checkStr(data.recipeFile, { field: "Recipe file", max: 1024 });
    const res = applyCheck(result, { out, set: (o, v) => (o.recipeFile = v), field: "recipeFile" });
    if (!res.ok) return res;
  }

  // ingredients
  if ("ingredients" in data) {
    const result = validateObjectIdArray(data.ingredients, { field: "Ingredients" });
    if (result.err) return { ok: false, field: "ingredients", message: result.err };
    if (result.value !== undefined) out.ingredients = result.value;
  }

  // modifiers
  if ("modifiers" in data) {
    const result = validateObjectIdArray(data.modifiers, { field: "Modifiers" });
    if (result.err) return { ok: false, field: "modifiers", message: result.err };
    if (result.value !== undefined) out.modifiers = result.value;
  }

  // activeTimings
  if ("activeTimings" in data) {
    const result = validateActiveTimings(data.activeTimings, { field: "Active timings" });
    if (result.err) return { ok: false, field: "activeTimings", message: result.err };
    if (result.value !== undefined) out.activeTimings = result.value;
  }

  // isActive
  if ("isActive" in data) {
    const result = checkBool(data.isActive, { field: "isActive" });
    const res = applyCheck(result, { out, set: (o, v) => (o.isActive = v), field: "isActive" });
    if (!res.ok) return res;
  }

  return { ok: true, sanitized: out };
};
