import { email_vld } from "../../../../09_validators/_validators.index.js";

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

const checkEmail = (value, { field }) => {
  if (value === undefined || value === null || value === "") {
    return { value: "" };
  }

  const result = email_vld(value);
  if (!result.isValid) return { err: `${field}: ${result.message}` };

  return { value: String(value).trim().toLowerCase() };
};

const applyCheck = (result, { out, set, field }) => {
  if (result.err) return { ok: false, field, message: result.err };
  if (result.value !== undefined) set(out, result.value);
  return { ok: true };
};

export const validateBrandFields = (data, { isUpdate = false } = {}) => {
  const out = {};

  if ("name" in data) {
    const result = checkStr(data.name, {
      field: "Name",
      min: 2,
      max: 100,
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

  if ("tagline" in data) {
    const result = checkStr(data.tagline, { field: "Tagline", max: 200 });
    const res = applyCheck(result, {
      out,
      set: (o, value) => (o.tagline = value),
      field: "tagline",
    });
    if (!res.ok) return res;
  }

  if ("logo" in data) {
    const result = checkStr(data.logo, { field: "Logo", max: 1024 });
    const res = applyCheck(result, {
      out,
      set: (o, value) => (o.logo = value),
      field: "logo",
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

  if ("files" in data) {
    if (!Array.isArray(data.files)) {
      return { ok: false, field: "files", message: "Files must be an array" };
    }

    const files = [];
    for (let index = 0; index < data.files.length; index += 1) {
      const row = data.files[index] ?? {};
      const file = {};

      if ("ref" in row) {
        const result = checkStr(row.ref, {
          field: `files[${index}].ref`,
          max: 100,
        });
        const res = applyCheck(result, {
          out: file,
          set: (o, value) => (o.ref = value),
          field: `files[${index}].ref`,
        });
        if (!res.ok) return res;
      }

      if ("value" in row) {
        const result = checkStr(row.value, {
          field: `files[${index}].value`,
          max: 1024,
        });
        const res = applyCheck(result, {
          out: file,
          set: (o, value) => (o.value = value),
          field: `files[${index}].value`,
        });
        if (!res.ok) return res;
      }

      files.push(file);
    }

    out.files = files;
  }

  if ("socials" in data && data.socials) {
    const socials = {};
    for (const key of ["instagram", "facebook", "tikTok", "linkedIn", "domain"]) {
      if (key in data.socials) {
        const result = checkStr(data.socials[key], {
          field: `socials.${key}`,
          max: 500,
        });
        const res = applyCheck(result, {
          out: socials,
          set: (o, value) => (o[key] = value),
          field: `socials.${key}`,
        });
        if (!res.ok) return res;
      }
    }
    out.socials = socials;
  }

  if ("emails" in data) {
    if (!Array.isArray(data.emails)) {
      return { ok: false, field: "emails", message: "Emails must be an array" };
    }

    const emails = [];
    for (let index = 0; index < data.emails.length; index += 1) {
      const row = data.emails[index] ?? {};
      const email = {};

      for (const key of ["name", "position"]) {
        if (key in row) {
          const result = checkStr(row[key], {
            field: `emails[${index}].${key}`,
            max: 100,
          });
          const res = applyCheck(result, {
            out: email,
            set: (o, value) => (o[key] = value),
            field: `emails[${index}].${key}`,
          });
          if (!res.ok) return res;
        }
      }

      if ("email" in row) {
        const result = checkEmail(row.email, {
          field: `emails[${index}].email`,
        });
        const res = applyCheck(result, {
          out: email,
          set: (o, value) => (o.email = value),
          field: `emails[${index}].email`,
        });
        if (!res.ok) return res;
      }

      emails.push(email);
    }

    out.emails = emails;
  }

  return { ok: true, sanitized: out };
};
