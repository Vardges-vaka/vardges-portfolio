const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ruleStr = (value, { min = 0, max, required = false }) => {
  if (value === undefined || value === null) return required ? "required" : null;
  if (typeof value !== "string") return "mustBeString";

  const trimmed = value.trim();
  if (required && trimmed.length === 0) return "required";
  if (!required && trimmed.length === 0) return null;
  if (min > 0 && trimmed.length < min) return "tooShort";
  if (max !== undefined && trimmed.length > max) return "tooLong";
  return null;
};

const ruleBool = (value) => {
  if (value === undefined || value === null) return null;
  return typeof value === "boolean" ? null : "mustBeBoolean";
};

const ruleEmail = (value) => {
  if (!value) return null;
  if (typeof value !== "string") return "mustBeString";
  return EMAIL_RE.test(value.trim()) ? null : "invalidEmail";
};

const validateBasic = (draft) => {
  const errors = {};
  const name = ruleStr(draft?.name, { min: 2, max: 100, required: true });
  if (name) errors.name = name;

  const tagline = ruleStr(draft?.tagline, { max: 200 });
  if (tagline) errors.tagline = tagline;

  const isActive = ruleBool(draft?.isActive);
  if (isActive) errors.isActive = isActive;

  return errors;
};

const validateSocials = (draft) => {
  const errors = {};
  for (const key of ["instagram", "facebook", "tikTok", "linkedIn", "domain"]) {
    const error = ruleStr(draft?.[key], { max: 500 });
    if (error) errors[key] = error;
  }
  return errors;
};

const validateEmails = (draft) => {
  const errors = {};
  const rows = Array.isArray(draft) ? draft : [];
  rows.forEach((row, index) => {
    const name = ruleStr(row?.name, { max: 100 });
    if (name) errors[`[${index}].name`] = name;

    const position = ruleStr(row?.position, { max: 100 });
    if (position) errors[`[${index}].position`] = position;

    const email = ruleEmail(row?.email);
    if (email) errors[`[${index}].email`] = email;
  });
  return errors;
};

const SECTION_VALIDATORS = {
  basic: validateBasic,
  socials: validateSocials,
  emails: validateEmails,
};

export const validateSection = (sectionKey, draft) => {
  const fn = SECTION_VALIDATORS[sectionKey];
  if (!fn) return { ok: true, errors: {} };

  const errors = fn(draft);
  return { ok: Object.keys(errors).length === 0, errors };
};

export const validateBulk = (bulkDrafts) => {
  const flat = {};
  for (const sectionKey of Object.keys(bulkDrafts ?? {})) {
    const fn = SECTION_VALIDATORS[sectionKey];
    if (!fn) continue;

    const errors = fn(bulkDrafts[sectionKey]);
    for (const path of Object.keys(errors)) {
      flat[`${sectionKey}.${path}`] = errors[path];
    }
  }

  return { ok: Object.keys(flat).length === 0, errors: flat };
};
