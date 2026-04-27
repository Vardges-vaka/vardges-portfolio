import mongoose from "mongoose";

const isStr = (value) => typeof value === "string";
const isBool = (value) => typeof value === "boolean";

const checkLocalizedText = (value, { field, max = 500, required = false }) => {
  if (value === undefined || value === null) {
    if (required) return { err: `${field} is required` };
    return { value: undefined };
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    return { err: `${field} must be an object with language keys` };
  }

  const out = {};
  let hasContent = false;

  for (const lang of ["en", "ru", "ar"]) {
    if (lang in value) {
      if (!isStr(value[lang])) return { err: `${field}.${lang} must be a string` };
      const trimmed = value[lang].trim();
      if (trimmed.length > max) return { err: `${field}.${lang} is too long (max ${max})` };
      out[lang] = trimmed;
      if (trimmed.length > 0) hasContent = true;
    }
  }

  if (required && !hasContent) {
    return { err: `${field} requires at least one language to be non-empty` };
  }

  return { value: out };
};

const checkBool = (value, { field }) => {
  if (value === undefined || value === null) return { value: undefined };
  if (!isBool(value)) return { err: `${field} must be true or false` };
  return { value };
};

const checkObjectIdArray = (value, { field }) => {
  if (value === undefined || value === null) return { value: undefined };
  if (!Array.isArray(value)) return { err: `${field} must be an array` };

  for (let i = 0; i < value.length; i += 1) {
    if (!mongoose.Types.ObjectId.isValid(value[i])) {
      return { err: `${field}[${i}] is not a valid ID` };
    }
  }

  return { value };
};

const applyCheck = (result, { out, set, field }) => {
  if (result.err) return { ok: false, field, message: result.err };
  if (result.value !== undefined) set(out, result.value);
  return { ok: true };
};

export const validateMenuFields = (data, { isUpdate = false } = {}) => {
  const out = {};

  if ("name" in data) {
    const result = checkLocalizedText(data.name, {
      field: "Name",
      max: 500,
      required: !isUpdate,
    });
    const res = applyCheck(result, {
      out,
      set: (o, value) => (o.name = value),
      field: "name",
    });
    if (!res.ok) return res;
  } else if (!isUpdate) {
    return { ok: false, field: "name", message: "Name is required" };
  }

  if ("categories" in data) {
    const result = checkObjectIdArray(data.categories, { field: "Categories" });
    const res = applyCheck(result, {
      out,
      set: (o, value) => (o.categories = value),
      field: "categories",
    });
    if (!res.ok) return res;
  }

  if ("branches" in data) {
    const result = checkObjectIdArray(data.branches, { field: "Branches" });
    const res = applyCheck(result, {
      out,
      set: (o, value) => (o.branches = value),
      field: "branches",
    });
    if (!res.ok) return res;
  }

  if ("brands" in data) {
    const result = checkObjectIdArray(data.brands, { field: "Brands" });
    const res = applyCheck(result, {
      out,
      set: (o, value) => (o.brands = value),
      field: "brands",
    });
    if (!res.ok) return res;
  }

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
