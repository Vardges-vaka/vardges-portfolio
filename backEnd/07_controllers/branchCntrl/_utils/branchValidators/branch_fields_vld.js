// Walks a Branch payload (partial on update, full on add) and:
//   1. Rejects invalid values with a field-pinned message.
//   2. Returns a sanitized copy that Mongoose can safely $set.
//
// Design notes:
// - Only validates paths that ARE present. Missing paths pass silently, which
//   matches our section-by-section update flow.
// - Re-uses the shared validators from 09_validators (phone, email, time, date).
// - Returns { ok: true, sanitized } OR { ok: false, field, message }.

import {
  email_vld,
  phone_vld,
  time_vld,
  date_vld,
} from "../../../../09_validators/_validators.index.js";
import mongoose from "mongoose";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../05_constants/cloudStorageProviders.js";

// -------- tiny per-field helpers --------

const isStr = (v) => typeof v === "string";
const isBool = (v) => typeof v === "boolean";
const isFiniteNum = (v) =>
  typeof v === "number" && Number.isFinite(v) && !Number.isNaN(v);

// Coerces numeric strings ("10", "10.5") to numbers. Leaves empty/null alone.
// Returns `undefined` when the input cannot be coerced.
const toNumber = (v) => {
  if (v === null || v === undefined || v === "") return null;
  if (isFiniteNum(v)) return v;
  if (isStr(v)) {
    const n = Number(v.trim());
    if (Number.isFinite(n)) return n;
  }
  return undefined;
};

// String length guard. Empty string is accepted (optional fields). Returns
// the trimmed value or an error.
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

// Numeric range guard. Accepts numeric strings. `null` / empty → null (unset).
const checkNum = (
  value,
  { field, min, max, integer = false, required = false },
) => {
  if (value === undefined || value === null || value === "") {
    if (required) return { err: `${field} is required` };
    return { value: null };
  }
  const n = toNumber(value);
  if (n === undefined) return { err: `${field} must be a number` };
  if (n === null) {
    if (required) return { err: `${field} is required` };
    return { value: null };
  }
  if (integer && !Number.isInteger(n)) {
    return { err: `${field} must be a whole number` };
  }
  if (min !== undefined && n < min) {
    return { err: `${field} must be >= ${min}` };
  }
  if (max !== undefined && n > max) {
    return { err: `${field} must be <= ${max}` };
  }
  return { value: n };
};

const checkBool = (value, { field }) => {
  if (value === undefined || value === null) return { value: undefined };
  if (!isBool(value)) return { err: `${field} must be true or false` };
  return { value };
};

const checkEmail = (value, { field }) => {
  if (value === undefined || value === null || value === "") {
    return { value: "" };
  }
  const r = email_vld(value);
  if (!r.isValid) return { err: `${field}: ${r.message}` };
  return { value: String(value).trim().toLowerCase() };
};

const checkPhone = (value, { field }) => {
  const r = phone_vld(value, { field });
  if (!r.isValid) return { err: r.message };
  return { value: r.sanitized ?? "" };
};

const checkTime = (value, { field }) => {
  const r = time_vld(value, { field });
  if (!r.isValid) return { err: r.message };
  return { value: r.sanitized ?? "" };
};

const checkDate = (value, { field }) => {
  const r = date_vld(value, { field });
  if (!r.isValid) return { err: r.message };
  return { value: r.sanitized };
};

const checkObjectIdArray = (value, { field }) => {
  if (value === undefined || value === null) return { value: undefined };
  if (!Array.isArray(value)) return { err: `${field} must be an array` };
  const ids = [];
  for (let index = 0; index < value.length; index += 1) {
    if (!mongoose.Types.ObjectId.isValid(value[index])) {
      return { err: `${field}[${index}] is not a valid ID` };
    }
    if (!ids.includes(value[index])) ids.push(value[index]);
  }
  return { value: ids };
};

// Fails fast on the first bad field. Accumulates into `out` using a setter
// callback so we don't corrupt the caller's object when validation fails.
const applyCheck = (result, { out, set, field }) => {
  if (result.err) return { ok: false, field, message: result.err };
  if (result.value !== undefined) set(out, result.value);
  return { ok: true };
};

// -------- main --------

export const validateBranchFields = (data, { isUpdate = false } = {}) => {
  const out = {};

  // -------- name --------
  if ("name" in data) {
    const r = checkStr(data.name, {
      field: "Name",
      min: 2,
      max: 100,
      required: !isUpdate,
    });
    const res = applyCheck(r, {
      out,
      set: (o, v) => (o.name = v),
      field: "name",
    });
    if (!res.ok) return res;
  }

  // -------- location --------
  if ("location" in data && data.location) {
    const loc = {};
    const src = data.location;

    if ("address" in src) {
      const r = checkStr(src.address, { field: "Address", max: 500 });
      const res = applyCheck(r, {
        out: loc,
        set: (o, v) => (o.address = v),
        field: "location.address",
      });
      if (!res.ok) return res;
    }
    if ("coordinates" in src && src.coordinates) {
      const coords = {};
      if ("lat" in src.coordinates) {
        const r = checkNum(src.coordinates.lat, {
          field: "Latitude",
          min: -90,
          max: 90,
        });
        const res = applyCheck(r, {
          out: coords,
          set: (o, v) => (o.lat = v),
          field: "location.coordinates.lat",
        });
        if (!res.ok) return res;
      }
      if ("lng" in src.coordinates) {
        const r = checkNum(src.coordinates.lng, {
          field: "Longitude",
          min: -180,
          max: 180,
        });
        const res = applyCheck(r, {
          out: coords,
          set: (o, v) => (o.lng = v),
          field: "location.coordinates.lng",
        });
        if (!res.ok) return res;
      }
      loc.coordinates = coords;
    }
    out.location = loc;
  }

  // -------- contact --------
  if ("contact" in data && data.contact) {
    const contact = {};

    for (const party of ["ourSupport", "manager"]) {
      if (party in data.contact && data.contact[party]) {
        const src = data.contact[party];
        const dst = {};

        if (party === "manager" && "name" in src) {
          const r = checkStr(src.name, { field: "Manager name", max: 100 });
          const res = applyCheck(r, {
            out: dst,
            set: (o, v) => (o.name = v),
            field: `contact.${party}.name`,
          });
          if (!res.ok) return res;
        }
        for (const key of ["phone", "whatsApp", "telegram"]) {
          if (key in src) {
            const r = checkPhone(src[key], {
              field: `${party}.${key}`,
            });
            const res = applyCheck(r, {
              out: dst,
              set: (o, v) => (o[key] = v),
              field: `contact.${party}.${key}`,
            });
            if (!res.ok) return res;
          }
        }
        if ("email" in src) {
          const r = checkEmail(src.email, { field: `${party}.email` });
          const res = applyCheck(r, {
            out: dst,
            set: (o, v) => (o.email = v),
            field: `contact.${party}.email`,
          });
          if (!res.ok) return res;
        }

        contact[party] = dst;
      }
    }

    out.contact = contact;
  }

  // -------- operations --------
  if ("operations" in data && data.operations) {
    const ops = {};
    const src = data.operations;

    for (const key of ["isActive", "is24Hours"]) {
      if (key in src) {
        const r = checkBool(src[key], { field: `operations.${key}` });
        const res = applyCheck(r, {
          out: ops,
          set: (o, v) => (o[key] = v),
          field: `operations.${key}`,
        });
        if (!res.ok) return res;
      }
    }
    for (const key of ["openingTime", "closingTime"]) {
      if (key in src) {
        const r = checkTime(src[key], { field: `operations.${key}` });
        const res = applyCheck(r, {
          out: ops,
          set: (o, v) => (o[key] = v),
          field: `operations.${key}`,
        });
        if (!res.ok) return res;
      }
    }
    for (const key of ["openSince", "closedSince"]) {
      if (key in src) {
        const r = checkDate(src[key], { field: `operations.${key}` });
        const res = applyCheck(r, {
          out: ops,
          set: (o, v) => (o[key] = v),
          field: `operations.${key}`,
        });
        if (!res.ok) return res;
      }
    }

    out.operations = ops;
  }

  // -------- costs --------
  if ("costs" in data && data.costs) {
    const costs = {};
    const src = data.costs;

    if ("currency" in src) {
      const r = checkStr(src.currency, {
        field: "Currency",
        min: 2,
        max: 6,
      });
      const res = applyCheck(r, {
        out: costs,
        set: (o, v) => (o.currency = v),
        field: "costs.currency",
      });
      if (!res.ok) return res;
    }

    if ("fixed" in src && src.fixed) {
      const fixed = {};
      if ("rent" in src.fixed) {
        const r = checkNum(src.fixed.rent, { field: "Rent", min: 0 });
        const res = applyCheck(r, {
          out: fixed,
          set: (o, v) => (o.rent = v),
          field: "costs.fixed.rent",
        });
        if (!res.ok) return res;
      }
      if ("utilities" in src.fixed && src.fixed.utilities) {
        const utilities = {};
        for (const key of ["electricity", "water", "gas", "AC"]) {
          if (key in src.fixed.utilities) {
            const r = checkNum(src.fixed.utilities[key], {
              field: `Utility ${key}`,
              min: 0,
            });
            const res = applyCheck(r, {
              out: utilities,
              set: (o, v) => (o[key] = v),
              field: `costs.fixed.utilities.${key}`,
            });
            if (!res.ok) return res;
          }
        }
        fixed.utilities = utilities;
      }
      costs.fixed = fixed;
    }

    if ("monthlyServices" in src && src.monthlyServices) {
      const ms = {};
      for (const key of [
        "cleaning",
        "sewage",
        "pestControl",
        "serviceFees",
        "extraStorage",
      ]) {
        if (key in src.monthlyServices) {
          const r = checkNum(src.monthlyServices[key], {
            field: `Service ${key}`,
            min: 0,
          });
          const res = applyCheck(r, {
            out: ms,
            set: (o, v) => (o[key] = v),
            field: `costs.monthlyServices.${key}`,
          });
          if (!res.ok) return res;
        }
      }
      costs.monthlyServices = ms;
    }

    if ("variable" in src) {
      if (!Array.isArray(src.variable)) {
        return {
          ok: false,
          field: "costs.variable",
          message: "Variable costs must be an array",
        };
      }
      const rows = [];
      for (let i = 0; i < src.variable.length; i += 1) {
        const row = src.variable[i] ?? {};
        const out_row = {};
        if ("label" in row) {
          const r = checkStr(row.label, {
            field: `variable[${i}].label`,
            max: 100,
          });
          const res = applyCheck(r, {
            out: out_row,
            set: (o, v) => (o.label = v),
            field: `costs.variable[${i}].label`,
          });
          if (!res.ok) return res;
        }
        if ("amount" in row) {
          const r = checkNum(row.amount, {
            field: `variable[${i}].amount`,
            min: 0,
          });
          const res = applyCheck(r, {
            out: out_row,
            set: (o, v) => (o.amount = v),
            field: `costs.variable[${i}].amount`,
          });
          if (!res.ok) return res;
        }
        if ("date" in row) {
          const r = checkDate(row.date, { field: `variable[${i}].date` });
          const res = applyCheck(r, {
            out: out_row,
            set: (o, v) => (o.date = v),
            field: `costs.variable[${i}].date`,
          });
          if (!res.ok) return res;
        }
        if ("notes" in row) {
          const r = checkStr(row.notes, {
            field: `variable[${i}].notes`,
            max: 500,
          });
          const res = applyCheck(r, {
            out: out_row,
            set: (o, v) => (o.notes = v),
            field: `costs.variable[${i}].notes`,
          });
          if (!res.ok) return res;
        }
        rows.push(out_row);
      }
      costs.variable = rows;
    }

    out.costs = costs;
  }

  // -------- contract --------
  if ("contract" in data && data.contract) {
    const contract = {};
    const src = data.contract;

    if ("duration" in src && src.duration) {
      const duration = {};
      for (const key of ["start", "end"]) {
        if (key in src.duration) {
          const r = checkDate(src.duration[key], {
            field: `Contract duration ${key}`,
          });
          const res = applyCheck(r, {
            out: duration,
            set: (o, v) => (o[key] = v),
            field: `contract.duration.${key}`,
          });
          if (!res.ok) return res;
        }
      }
      // Order invariant — only when both are present and non-null.
      if (
        duration.start instanceof Date &&
        duration.end instanceof Date &&
        duration.start > duration.end
      ) {
        return {
          ok: false,
          field: "contract.duration.end",
          message: "Contract end must be on or after the start date",
        };
      }
      contract.duration = duration;
    }

    if ("amount" in src) {
      const r = checkNum(src.amount, { field: "Contract amount", min: 0 });
      const res = applyCheck(r, {
        out: contract,
        set: (o, v) => (o.amount = v),
        field: "contract.amount",
      });
      if (!res.ok) return res;
    }

    if ("terminationNoticePeriod" in src) {
      const r = checkNum(src.terminationNoticePeriod, {
        field: "Termination notice (days)",
        min: 0,
        integer: true,
      });
      const res = applyCheck(r, {
        out: contract,
        set: (o, v) => (o.terminationNoticePeriod = v),
        field: "contract.terminationNoticePeriod",
      });
      if (!res.ok) return res;
    }

    // `file` is preserved (written by the separate upload flow). Pass-through.
    if ("file" in src) {
      const r = checkStr(src.file, { field: "Contract file", max: 1024 });
      const res = applyCheck(r, {
        out: contract,
        set: (o, v) => (o.file = v),
        field: "contract.file",
      });
      if (!res.ok) return res;
    }

    out.contract = contract;
  }

  // -------- images --------
  if ("images" in data && data.images !== undefined && data.images !== null) {
    if (!Array.isArray(data.images)) {
      return {
        ok: false,
        field: "images",
        message: "images must be an array",
      };
    }
    if (data.images.length > 32) {
      return {
        ok: false,
        field: "images",
        message: "At most 32 image URLs allowed",
      };
    }
    const urls = [];
    for (let i = 0; i < data.images.length; i += 1) {
      const r = checkStr(data.images[i], {
        field: `images[${i}]`,
        max: 2048,
      });
      if (r.err) return { ok: false, field: `images[${i}]`, message: r.err };
      if (r.value !== undefined && r.value !== "") urls.push(r.value);
    }
    out.images = urls;
  }

  // -------- cloudStorage (which provider uploads for this branch) --------
  if ("cloudStorage" in data && data.cloudStorage !== undefined) {
    const v = data.cloudStorage;
    if (v === null) {
      out.cloudStorage = null;
    } else {
      const r = checkStr(v, { field: "cloudStorage", max: 32 });
      if (r.err) return { ok: false, field: "cloudStorage", message: r.err };
      const key = r.value;
      if (
        typeof key !== "string" ||
        !CLOUD_STORAGE_PROVIDERS.includes(/** @type {any} */ (key))
      ) {
        return {
          ok: false,
          field: "cloudStorage",
          message: `cloudStorage must be one of: ${CLOUD_STORAGE_PROVIDERS.join(", ")}`,
        };
      }
      out.cloudStorage = key;
    }
  }

  // -------- brands --------
  if ("brands" in data) {
    const r = checkObjectIdArray(data.brands, { field: "brands" });
    const res = applyCheck(r, {
      out,
      set: (o, v) => (o.brands = v),
      field: "brands",
    });
    if (!res.ok) return res;
  }

  // -------- notes --------
  if ("notes" in data) {
    const r = checkStr(data.notes, { field: "Notes", max: 2000 });
    const res = applyCheck(r, {
      out,
      set: (o, v) => (o.notes = v),
      field: "notes",
    });
    if (!res.ok) return res;
  }

  return { ok: true, sanitized: out };
};
