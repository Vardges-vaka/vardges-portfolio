const ruleStr = (value, { max, required = false }) => {
  if (value === undefined || value === null) return required ? "required" : null;
  if (typeof value !== "string") return "mustBeString";

  const trimmed = value.trim();
  if (required && trimmed.length === 0) return "required";
  if (!required && trimmed.length === 0) return null;
  if (max !== undefined && trimmed.length > max) return "tooLong";
  return null;
};

const ruleBool = (value) => {
  if (value === undefined || value === null) return null;
  return typeof value === "boolean" ? null : "mustBeBoolean";
};

const validateBasic = (draft) => {
  const errors = {};
  const isActive = ruleBool(draft?.isActive);
  if (isActive) errors.isActive = isActive;
  return errors;
};

const validateName = (draft) => {
  const errors = {};
  const hasAny =
    (draft?.en ?? "").trim().length > 0 ||
    (draft?.ru ?? "").trim().length > 0 ||
    (draft?.ar ?? "").trim().length > 0;

  if (!hasAny) {
    errors.en = "required";
  }

  for (const lang of ["en", "ru", "ar"]) {
    const err = ruleStr(draft?.[lang], { max: 500 });
    if (err && err !== "required") errors[lang] = err;
  }

  return errors;
};

const validateIdArray = () => {
  return {};
};

const SECTION_VALIDATORS = {
  basic: validateBasic,
  name: validateName,
  categories: validateIdArray,
  branches: validateIdArray,
  brands: validateIdArray,
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
