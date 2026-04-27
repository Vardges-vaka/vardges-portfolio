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
  if (min !== undefined && value < min) {
    return { err: `${field} must be >= ${min}` };
  }
  return { value };
};

const checkLocalized = (obj, { field, max = 500, required = false }) => {
  if (obj === undefined || obj === null) {
    if (required) return { err: `${field} is required` };
    return { value: undefined };
  }
  if (typeof obj !== "object" || Array.isArray(obj)) {
    return { err: `${field} must be an object` };
  }

  const out = {};
  let hasContent = false;

  for (const lang of ["en", "ru", "ar", "hy"]) {
    if (lang in obj) {
      const result = checkStr(obj[lang], { field: `${field}.${lang}`, max });
      if (result.err) return { err: result.err };
      if (result.value !== undefined) {
        out[lang] = result.value;
        if (result.value.length > 0) hasContent = true;
      }
    }
  }

  if (required && !hasContent) {
    return { err: `${field} requires at least one language to be non-empty` };
  }

  return { value: out };
};

const checkDescriptions = (obj, { field }) => {
  if (obj === undefined || obj === null) return { value: undefined };
  if (typeof obj !== "object" || Array.isArray(obj)) {
    return { err: `${field} must be an object` };
  }

  const out = {};

  for (const channel of Object.keys(obj)) {
    const result = checkLocalized(obj[channel], {
      field: `${field}.${channel}`,
      max: 2000,
    });
    if (result.err) return { err: result.err };
    if (result.value !== undefined) out[channel] = result.value;
  }

  return { value: out };
};

const applyCheck = (result, { out, set, field }) => {
  if (result.err) return { ok: false, field, message: result.err };
  if (result.value !== undefined) set(out, result.value);
  return { ok: true };
};

export const validateModifierFields = (data, { isUpdate = false } = {}) => {
  const out = {};

  // name — localized
  if ("name" in data) {
    const result = checkLocalized(data.name, {
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

  // descriptions
  if ("descriptions" in data) {
    const result = checkDescriptions(data.descriptions, { field: "Descriptions" });
    const res = applyCheck(result, {
      out,
      set: (o, value) => (o.descriptions = value),
      field: "descriptions",
    });
    if (!res.ok) return res;
  }

  // type
  if ("type" in data) {
    const valid = ["optional", "mandatory"];
    if (!valid.includes(data.type)) {
      return { ok: false, field: "type", message: "Type must be optional or mandatory" };
    }
    out.type = data.type;
  }

  // selectionQty
  if ("selectionQty" in data) {
    const valid = ["onlyOne", "multiple"];
    if (!valid.includes(data.selectionQty)) {
      return { ok: false, field: "selectionQty", message: "selectionQty must be onlyOne or multiple" };
    }
    out.selectionQty = data.selectionQty;
  }

  // cost
  if ("cost" in data) {
    const result = checkNum(data.cost, { field: "Cost", min: 0 });
    const res = applyCheck(result, {
      out,
      set: (o, value) => (o.cost = value),
      field: "cost",
    });
    if (!res.ok) return res;
  }

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

  // options[]
  if ("options" in data) {
    if (!Array.isArray(data.options)) {
      return { ok: false, field: "options", message: "Options must be an array" };
    }

    const options = [];
    for (let index = 0; index < data.options.length; index += 1) {
      const row = data.options[index] ?? {};
      const option = {};

      // option name
      if ("name" in row) {
        const result = checkLocalized(row.name, {
          field: `options[${index}].name`,
          max: 500,
          required: false,
        });
        const res = applyCheck(result, {
          out: option,
          set: (o, value) => (o.name = value),
          field: `options[${index}].name`,
        });
        if (!res.ok) return res;
      }

      // option descriptions
      if ("descriptions" in row) {
        const result = checkDescriptions(row.descriptions, {
          field: `options[${index}].descriptions`,
        });
        const res = applyCheck(result, {
          out: option,
          set: (o, value) => (o.descriptions = value),
          field: `options[${index}].descriptions`,
        });
        if (!res.ok) return res;
      }

      // option cost
      if ("cost" in row) {
        const result = checkNum(row.cost, { field: `options[${index}].cost`, min: 0 });
        const res = applyCheck(result, {
          out: option,
          set: (o, value) => (o.cost = value),
          field: `options[${index}].cost`,
        });
        if (!res.ok) return res;
      }

      // option sellingPrice
      if ("sellingPrice" in row) {
        const result = checkNum(row.sellingPrice, {
          field: `options[${index}].sellingPrice`,
          min: 0,
        });
        const res = applyCheck(result, {
          out: option,
          set: (o, value) => (o.sellingPrice = value),
          field: `options[${index}].sellingPrice`,
        });
        if (!res.ok) return res;
      }

      // option isActive
      if ("isActive" in row) {
        const result = checkBool(row.isActive, {
          field: `options[${index}].isActive`,
        });
        const res = applyCheck(result, {
          out: option,
          set: (o, value) => (o.isActive = value),
          field: `options[${index}].isActive`,
        });
        if (!res.ok) return res;
      }

      // preserve _id on existing option subdocs
      if (row._id) option._id = row._id;

      options.push(option);
    }

    out.options = options;
  }

  return { ok: true, sanitized: out };
};
