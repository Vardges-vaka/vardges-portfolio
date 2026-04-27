import mongoose from "mongoose";
import {
  email_vld,
  phone_vld,
  date_vld,
} from "../../../../09_validators/_validators.index.js";

const isStr = (value) => typeof value === "string";
const isBool = (value) => typeof value === "boolean";
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

const checkStr = (value, { field, max, min = 0, required = false }) => {
  if (value === undefined || value === null) {
    if (required) return { err: `${field} is required` };
    return { value: undefined };
  }
  if (!isStr(value)) return { err: `${field} must be a string` };
  const trimmed = value.trim();
  if (required && trimmed.length === 0) return { err: `${field} is required` };
  if (!required && trimmed.length === 0) return { value: "" };
  if (min > 0 && trimmed.length < min) return { err: `${field} is too short (min ${min})` };
  if (max !== undefined && trimmed.length > max) return { err: `${field} is too long (max ${max})` };
  return { value: trimmed };
};

const checkNum = (value, { field, min, integer = false, required = false }) => {
  if (value === undefined || value === null || value === "") {
    if (required) return { err: `${field} is required` };
    return { value: null };
  }
  const number = toNumber(value);
  if (number === undefined) return { err: `${field} must be a number` };
  if (number === null) return { value: null };
  if (integer && !Number.isInteger(number)) return { err: `${field} must be a whole number` };
  if (min !== undefined && number < min) return { err: `${field} must be >= ${min}` };
  return { value: number };
};

const checkBool = (value, { field }) => {
  if (value === undefined || value === null) return { value: undefined };
  if (!isBool(value)) return { err: `${field} must be true or false` };
  return { value };
};

const checkDate = (value, { field }) => {
  const result = date_vld(value, { field });
  if (!result.isValid) return { err: result.message };
  return { value: result.sanitized };
};

const checkEmail = (value, { field }) => {
  if (value === undefined || value === null || value === "") return { value: "" };
  const result = email_vld(value);
  if (!result.isValid) return { err: `${field}: ${result.message}` };
  return { value: String(value).trim().toLowerCase() };
};

const checkPhone = (value, { field }) => {
  const result = phone_vld(value, { field });
  if (!result.isValid) return { err: result.message };
  return { value: result.sanitized ?? "" };
};

const checkObjectId = (value, { field, allowEmpty = false }) => {
  if (value === undefined) return { value: undefined };
  if (value === null || value === "") return allowEmpty ? { value: null } : { err: `${field} is required` };
  if (!mongoose.Types.ObjectId.isValid(value)) return { err: `${field} is invalid` };
  return { value };
};

const applyCheck = (result, { out, set, field }) => {
  if (result.err) return { ok: false, field, message: result.err };
  if (result.value !== undefined) set(out, result.value);
  return { ok: true };
};

const apply = (result, out, field, set) => applyCheck(result, { out, field, set });

const validateLeaveDates = (dates) => {
  if (!Array.isArray(dates)) {
    return { ok: false, field: "annualLeaves.used.dates", message: "Leave dates must be an array" };
  }
  const rows = [];
  for (let index = 0; index < dates.length; index += 1) {
    const row = dates[index] ?? {};
    const out = {};
    for (const key of ["from", "to"]) {
      if (key in row) {
        const res = apply(checkDate(row[key], { field: `leave ${key}` }), out, `annualLeaves.used.dates[${index}].${key}`, (o, v) => (o[key] = v));
        if (!res.ok) return res;
      }
    }
    if (out.from instanceof Date && out.to instanceof Date && out.from > out.to) {
      return { ok: false, field: `annualLeaves.used.dates[${index}].to`, message: "Leave end must be on or after start" };
    }
    rows.push(out);
  }
  return { ok: true, rows };
};

const validateLegalDoc = (src, prefix, { isVisa = false } = {}) => {
  const out = {};
  if (!src) return { ok: true, out };
  if ("status" in src) {
    const res = apply(checkStr(src.status, { field: `${prefix}.status`, max: 40 }), out, `${prefix}.status`, (o, v) => (o.status = v));
    if (!res.ok) return res;
  }
  if ("expDate" in src) {
    const res = apply(checkDate(src.expDate, { field: `${prefix}.expDate` }), out, `${prefix}.expDate`, (o, v) => (o.expDate = v));
    if (!res.ok) return res;
  }
  if (isVisa && "whatCompanyIsUnder" in src) {
    const res = apply(checkStr(src.whatCompanyIsUnder, { field: `${prefix}.whatCompanyIsUnder`, max: 200 }), out, `${prefix}.whatCompanyIsUnder`, (o, v) => (o.whatCompanyIsUnder = v));
    if (!res.ok) return res;
  }
  for (const key of ["file", "notes"]) {
    if (key in src) {
      const max = key === "file" ? 1024 : 1000;
      const res = apply(checkStr(src[key], { field: `${prefix}.${key}`, max }), out, `${prefix}.${key}`, (o, v) => (o[key] = v));
      if (!res.ok) return res;
    }
  }
  return { ok: true, out };
};

const legalDocKeys = ["visa", "emiratesId", "medical", "hygieneCert", "healthCard"];

export const validateEmployeeFields = (data, { isUpdate = false } = {}) => {
  const out = {};

  for (const key of ["firstName", "lastName"]) {
    if (key in data) {
      const res = apply(checkStr(data[key], { field: key, min: 2, max: 100, required: !isUpdate }), out, key, (o, v) => (o[key] = v));
      if (!res.ok) return res;
    } else if (!isUpdate) {
      return { ok: false, field: key, message: `${key} is required` };
    }
  }

  if ("legalFullName" in data) {
    const res = apply(checkStr(data.legalFullName, { field: "legalFullName", max: 200 }), out, "legalFullName", (o, v) => (o.legalFullName = v));
    if (!res.ok) return res;
  }
  for (const key of ["dateOfBirth", "joiningDate"]) {
    if (key in data) {
      const res = apply(checkDate(data[key], { field: key }), out, key, (o, v) => (o[key] = v));
      if (!res.ok) return res;
    }
  }

  if ("salary" in data && data.salary) {
    const salary = {};
    for (const key of ["basic", "allowances"]) {
      if (key in data.salary) {
        const res = apply(checkNum(data.salary[key], { field: `salary.${key}`, min: 0 }), salary, `salary.${key}`, (o, v) => (o[key] = v));
        if (!res.ok) return res;
      }
    }
    if ("currency" in data.salary) {
      const res = apply(checkStr(data.salary.currency, { field: "salary.currency", min: 2, max: 6 }), salary, "salary.currency", (o, v) => (o.currency = v));
      if (!res.ok) return res;
    }
    out.salary = salary;
  }

  if ("annualLeaves" in data && data.annualLeaves) {
    const annualLeaves = {};
    if ("remaining" in data.annualLeaves) {
      const res = apply(checkNum(data.annualLeaves.remaining, { field: "annualLeaves.remaining", min: 0 }), annualLeaves, "annualLeaves.remaining", (o, v) => (o.remaining = v));
      if (!res.ok) return res;
    }
    if ("used" in data.annualLeaves && data.annualLeaves.used) {
      const used = {};
      if ("qnt" in data.annualLeaves.used) {
        const res = apply(checkNum(data.annualLeaves.used.qnt, { field: "annualLeaves.used.qnt", min: 0, integer: true }), used, "annualLeaves.used.qnt", (o, v) => (o.qnt = v));
        if (!res.ok) return res;
      }
      if ("dates" in data.annualLeaves.used) {
        const result = validateLeaveDates(data.annualLeaves.used.dates);
        if (!result.ok) return result;
        used.dates = result.rows;
      }
      annualLeaves.used = used;
    }
    out.annualLeaves = annualLeaves;
  }

  if ("publicHolidaysBalance" in data) {
    const res = apply(checkNum(data.publicHolidaysBalance, { field: "publicHolidaysBalance", min: 0 }), out, "publicHolidaysBalance", (o, v) => (o.publicHolidaysBalance = v));
    if (!res.ok) return res;
  }

  if ("contact" in data && data.contact) {
    const contact = {};
    for (const key of ["phone", "whatsApp", "telegram"]) {
      if (key in data.contact) {
        const res = apply(checkPhone(data.contact[key], { field: `contact.${key}` }), contact, `contact.${key}`, (o, v) => (o[key] = v));
        if (!res.ok) return res;
      }
    }
    if ("email" in data.contact) {
      const res = apply(checkEmail(data.contact.email, { field: "contact.email" }), contact, "contact.email", (o, v) => (o.email = v));
      if (!res.ok) return res;
    }
    out.contact = contact;
  }

  if ("legal" in data && data.legal) {
    const legal = {};
    for (const key of legalDocKeys) {
      if (key in data.legal) {
        const result = validateLegalDoc(data.legal[key], `legal.${key}`, { isVisa: key === "visa" });
        if (!result.ok) return result;
        legal[key] = result.out;
      }
    }
    out.legal = legal;
  }

  if ("certifications" in data) {
    if (!Array.isArray(data.certifications)) {
      return { ok: false, field: "certifications", message: "Certifications must be an array" };
    }
    const rows = [];
    for (let index = 0; index < data.certifications.length; index += 1) {
      const src = data.certifications[index] ?? {};
      const row = {};
      for (const key of ["name", "issuer"]) {
        if (key in src) {
          const res = apply(checkStr(src[key], { field: `certifications[${index}].${key}`, max: 200 }), row, `certifications[${index}].${key}`, (o, v) => (o[key] = v));
          if (!res.ok) return res;
        }
      }
      for (const key of ["issuedDate", "expDate"]) {
        if (key in src) {
          const res = apply(checkDate(src[key], { field: `certifications[${index}].${key}` }), row, `certifications[${index}].${key}`, (o, v) => (o[key] = v));
          if (!res.ok) return res;
        }
      }
      for (const key of ["file", "notes"]) {
        if (key in src) {
          const max = key === "file" ? 1024 : 1000;
          const res = apply(checkStr(src[key], { field: `certifications[${index}].${key}`, max }), row, `certifications[${index}].${key}`, (o, v) => (o[key] = v));
          if (!res.ok) return res;
        }
      }
      rows.push(row);
    }
    out.certifications = rows;
  }

  if ("workingBranch" in data) {
    const res = apply(checkObjectId(data.workingBranch, { field: "workingBranch", allowEmpty: true }), out, "workingBranch", (o, v) => (o.workingBranch = v));
    if (!res.ok) return res;
  }
  if ("associatedBrands" in data) {
    if (!Array.isArray(data.associatedBrands)) {
      return { ok: false, field: "associatedBrands", message: "Associated brands must be an array" };
    }
    const deduped = [];
    for (const id of data.associatedBrands) {
      const res = checkObjectId(id, { field: "associatedBrands" });
      if (res.err) return { ok: false, field: "associatedBrands", message: res.err };
      if (!deduped.includes(res.value)) deduped.push(res.value);
    }
    out.associatedBrands = deduped;
  }

  for (const key of ["isActive", "isResigned", "isTerminated"]) {
    if (key in data) {
      const res = apply(checkBool(data[key], { field: key }), out, key, (o, v) => (o[key] = v));
      if (!res.ok) return res;
    }
  }
  const finalActive = out.isActive ?? data.isActive;
  const finalResigned = out.isResigned ?? data.isResigned;
  const finalTerminated = out.isTerminated ?? data.isTerminated;
  if (finalActive === true && (finalResigned === true || finalTerminated === true)) {
    return {
      ok: false,
      field: "isActive",
      message: "Employee cannot be Active while resigned/terminated",
    };
  }

  if ("terminationReason" in data) {
    const res = apply(checkStr(data.terminationReason, { field: "terminationReason", max: 1000 }), out, "terminationReason", (o, v) => (o.terminationReason = v));
    if (!res.ok) return res;
  }

  if ("images" in data) {
    if (!Array.isArray(data.images)) return { ok: false, field: "images", message: "Images must be an array" };
    out.images = data.images.map((value, index) => {
      const result = checkStr(value, { field: `images[${index}]`, max: 1024 });
      if (result.err) throw new Error(result.err);
      return result.value ?? "";
    });
  }

  if ("uniform" in data && data.uniform) {
    const uniform = {};
    if ("sizes" in data.uniform && data.uniform.sizes) {
      const sizes = {};
      for (const key of ["top", "bottom", "shoes"]) {
        if (key in data.uniform.sizes) {
          const res = apply(checkStr(data.uniform.sizes[key], { field: `uniform.sizes.${key}`, max: 50 }), sizes, `uniform.sizes.${key}`, (o, v) => (o[key] = v));
          if (!res.ok) return res;
        }
      }
      uniform.sizes = sizes;
    }
    if ("issued" in data.uniform) {
      if (!Array.isArray(data.uniform.issued)) {
        return { ok: false, field: "uniform.issued", message: "Uniform issued must be an array" };
      }
      const rows = [];
      for (let index = 0; index < data.uniform.issued.length; index += 1) {
        const src = data.uniform.issued[index] ?? {};
        const row = {};
        if ("item" in src) {
          const res = apply(checkStr(src.item, { field: `uniform.issued[${index}].item`, max: 100 }), row, `uniform.issued[${index}].item`, (o, v) => (o.item = v));
          if (!res.ok) return res;
        }
        if ("date" in src) {
          const res = apply(checkDate(src.date, { field: `uniform.issued[${index}].date` }), row, `uniform.issued[${index}].date`, (o, v) => (o.date = v));
          if (!res.ok) return res;
        }
        if ("notes" in src) {
          const res = apply(checkStr(src.notes, { field: `uniform.issued[${index}].notes`, max: 500 }), row, `uniform.issued[${index}].notes`, (o, v) => (o.notes = v));
          if (!res.ok) return res;
        }
        rows.push(row);
      }
      uniform.issued = rows;
    }
    out.uniform = uniform;
  }

  return { ok: true, sanitized: out };
};
