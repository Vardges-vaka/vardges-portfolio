// Client-side field validators. Mirror the backend rules from
// backEnd/07_controllers/branchCntrl/_utils/branchValidators/branch_fields_vld.js
// so the user gets instant feedback and the backend is the safety net.
//
// Return shape:
//   { ok: boolean, errors: { [dottedPath]: "message" } }

const PHONE_RE = /^\+?[0-9\s\-().]{6,20}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
// Loose "looks like email" check. The backend does the authoritative validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNumString = (v) =>
  typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v));

const asNum = (v) => {
  if (v === "" || v === null || v === undefined) return null;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (isNumString(v)) return Number(v);
  return undefined; // signals "bad input"
};

const isValidDate = (v) => {
  if (v === "" || v === null || v === undefined) return true; // optional
  const d = new Date(v);
  return !Number.isNaN(d.getTime());
};

// -------- individual rule helpers --------

const ruleStr = (value, { min = 0, max, required = false }) => {
  if (value === undefined || value === null) {
    if (required) return "required";
    return null;
  }
  if (typeof value !== "string") return "mustBeString";
  const trimmed = value.trim();
  if (required && trimmed.length === 0) return "required";
  if (!required && trimmed.length === 0) return null;
  if (min > 0 && trimmed.length < min) return "tooShort";
  if (max !== undefined && trimmed.length > max) return "tooLong";
  return null;
};

const ruleNum = (value, { min, max, integer = false, required = false }) => {
  if (value === undefined || value === null || value === "") {
    if (required) return "required";
    return null;
  }
  const n = asNum(value);
  if (n === undefined) return "notANumber";
  if (n === null) return required ? "required" : null;
  if (integer && !Number.isInteger(n)) return "notInteger";
  if (min !== undefined && n < min) return "numberMin";
  if (max !== undefined && n > max) return "numberMax";
  return null;
};

const ruleBool = (value) => {
  if (value === undefined || value === null) return null;
  if (typeof value !== "boolean") return "mustBeBoolean";
  return null;
};

const rulePhone = (value) => {
  if (!value) return null;
  if (typeof value !== "string") return "mustBeString";
  const t = value.trim();
  if (t.length === 0) return null;
  if (!PHONE_RE.test(t)) return "invalidPhone";
  return null;
};

const ruleEmail = (value) => {
  if (!value) return null;
  if (typeof value !== "string") return "mustBeString";
  const t = value.trim();
  if (t.length === 0) return null;
  if (!EMAIL_RE.test(t)) return "invalidEmail";
  return null;
};

const ruleTime = (value) => {
  if (!value) return null;
  if (typeof value !== "string") return "mustBeString";
  const t = value.trim();
  if (t.length === 0) return null;
  if (!TIME_RE.test(t)) return "invalidTime";
  return null;
};

const ruleDate = (value) => {
  if (!isValidDate(value)) return "invalidDate";
  return null;
};

// -------- section-level validators --------

// Each validator receives the section's own draft. Paths in the returned
// errors object are dotted, rooted at the section (e.g. "coordinates.lat").

const validateBasic = (draft) => {
  const errors = {};
  const e = ruleStr(draft?.name, { min: 2, max: 100, required: true });
  if (e) errors.name = e;
  return errors;
};

const validateLocation = (draft) => {
  const errors = {};
  const a = ruleStr(draft?.address, { max: 500 });
  if (a) errors.address = a;
  const lat = ruleNum(draft?.coordinates?.lat, { min: -90, max: 90 });
  if (lat) errors["coordinates.lat"] = lat === "numberMin" || lat === "numberMax" ? "latRange" : lat;
  const lng = ruleNum(draft?.coordinates?.lng, { min: -180, max: 180 });
  if (lng) errors["coordinates.lng"] = lng === "numberMin" || lng === "numberMax" ? "lngRange" : lng;
  return errors;
};

const validateContactParty = (party, draft, errors) => {
  if (!draft) return;
  if (party === "manager") {
    const n = ruleStr(draft?.name, { max: 100 });
    if (n) errors[`${party}.name`] = n;
  }
  for (const key of ["phone", "whatsApp", "telegram"]) {
    const r = rulePhone(draft?.[key]);
    if (r) errors[`${party}.${key}`] = r;
  }
  const e = ruleEmail(draft?.email);
  if (e) errors[`${party}.email`] = e;
};

const validateContact = (draft) => {
  const errors = {};
  validateContactParty("ourSupport", draft?.ourSupport, errors);
  validateContactParty("manager", draft?.manager, errors);
  return errors;
};

const validateOperations = (draft) => {
  const errors = {};
  for (const key of ["isActive", "is24Hours"]) {
    const e = ruleBool(draft?.[key]);
    if (e) errors[key] = e;
  }
  for (const key of ["openingTime", "closingTime"]) {
    const e = ruleTime(draft?.[key]);
    if (e) errors[key] = e;
  }
  for (const key of ["openSince", "closedSince"]) {
    const e = ruleDate(draft?.[key]);
    if (e) errors[key] = e;
  }
  return errors;
};

const validateCosts = (draft) => {
  const errors = {};
  if (draft?.currency !== undefined) {
    const e = ruleStr(draft.currency, { min: 2, max: 6 });
    if (e) errors.currency = e;
  }
  if (draft?.fixed?.rent !== undefined) {
    const e = ruleNum(draft.fixed.rent, { min: 0 });
    if (e) errors["fixed.rent"] = e;
  }
  if (draft?.fixed?.utilities) {
    for (const key of ["electricity", "water", "gas", "AC"]) {
      const v = draft.fixed.utilities[key];
      if (v !== undefined) {
        const e = ruleNum(v, { min: 0 });
        if (e) errors[`fixed.utilities.${key}`] = e;
      }
    }
  }
  if (draft?.monthlyServices) {
    for (const key of [
      "cleaning",
      "sewage",
      "pestControl",
      "serviceFees",
      "extraStorage",
    ]) {
      const v = draft.monthlyServices[key];
      if (v !== undefined) {
        const e = ruleNum(v, { min: 0 });
        if (e) errors[`monthlyServices.${key}`] = e;
      }
    }
  }
  if (Array.isArray(draft?.variable)) {
    draft.variable.forEach((row, i) => {
      const l = ruleStr(row?.label, { max: 100 });
      if (l) errors[`variable[${i}].label`] = l;
      const a = ruleNum(row?.amount, { min: 0 });
      if (a) errors[`variable[${i}].amount`] = a;
      const d = ruleDate(row?.date);
      if (d) errors[`variable[${i}].date`] = d;
      const n = ruleStr(row?.notes, { max: 500 });
      if (n) errors[`variable[${i}].notes`] = n;
    });
  }
  return errors;
};

const validateContract = (draft) => {
  const errors = {};
  const ds = ruleDate(draft?.duration?.start);
  if (ds) errors["duration.start"] = ds;
  const de = ruleDate(draft?.duration?.end);
  if (de) errors["duration.end"] = de;
  // Order invariant
  if (!ds && !de && draft?.duration?.start && draft?.duration?.end) {
    const s = new Date(draft.duration.start);
    const e = new Date(draft.duration.end);
    if (!Number.isNaN(s.getTime()) && !Number.isNaN(e.getTime()) && s > e) {
      errors["duration.end"] = "durationOrder";
    }
  }
  const a = ruleNum(draft?.amount, { min: 0 });
  if (a) errors.amount = a;
  const t = ruleNum(draft?.terminationNoticePeriod, { min: 0, integer: true });
  if (t) errors.terminationNoticePeriod = t;
  return errors;
};

const validateNotes = (draft) => {
  const errors = {};
  const e = ruleStr(draft?.notes, { max: 2000 });
  if (e) errors.notes = e;
  return errors;
};

const SECTION_VALIDATORS = {
  basic: validateBasic,
  location: validateLocation,
  contact: validateContact,
  operations: validateOperations,
  costs: validateCosts,
  contract: validateContract,
  notes: validateNotes,
};

// -------- exports --------

// Validates one section. Path keys in the returned errors object are rooted
// within the section (caller can prefix with `${sectionKey}.` for bulk display).
export const validateSection = (sectionKey, draft) => {
  const fn = SECTION_VALIDATORS[sectionKey];
  if (!fn) return { ok: true, errors: {} };
  const errors = fn(draft);
  return { ok: Object.keys(errors).length === 0, errors };
};

// Validates every section in a bulk draft map. Returns a flat error object
// whose keys are prefixed with the section name (e.g. "contact.ourSupport.phone").
export const validateBulk = (bulkDrafts) => {
  const flat = {};
  for (const sectionKey of Object.keys(bulkDrafts ?? {})) {
    const fn = SECTION_VALIDATORS[sectionKey];
    if (!fn) continue;
    const sectionErrors = fn(bulkDrafts[sectionKey]);
    for (const path of Object.keys(sectionErrors)) {
      flat[`${sectionKey}.${path}`] = sectionErrors[path];
    }
  }
  return { ok: Object.keys(flat).length === 0, errors: flat };
};
