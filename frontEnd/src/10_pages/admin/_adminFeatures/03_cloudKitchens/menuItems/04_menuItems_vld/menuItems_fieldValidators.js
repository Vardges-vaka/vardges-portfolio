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

const ruleNum = (value, { min } = {}) => {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "number" || Number.isNaN(value)) return "mustBeNumber";
  if (min !== undefined && value < min) return "mustBePositive";
  return null;
};

const ruleTime = (value) => {
  if (!value) return null;
  if (typeof value !== "string") return "mustBeString";
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value.trim()) ? null : "invalidTime";
};

const validateBasic = (draft) => {
  const errors = {};
  const cost = ruleNum(draft?.cost, { min: 0 });
  if (cost) errors.cost = cost;

  const sellingPrice = ruleNum(draft?.sellingPrice, { min: 0 });
  if (sellingPrice) errors.sellingPrice = sellingPrice;

  const isActive = ruleBool(draft?.isActive);
  if (isActive) errors.isActive = isActive;

  if (draft?.activeTimings?.windows) {
    draft.activeTimings.windows.forEach((win, i) => {
      const from = ruleTime(win?.from);
      if (from) errors[`activeTimings.windows[${i}].from`] = from;
      const to = ruleTime(win?.to);
      if (to) errors[`activeTimings.windows[${i}].to`] = to;
    });
  }

  return errors;
};

const validateName = (draft) => {
  const errors = {};
  const hasAny = draft?.en?.trim() || draft?.ru?.trim() || draft?.ar?.trim();
  if (!hasAny) errors.en = "required";

  for (const lang of ["en", "ru", "ar"]) {
    const error = ruleStr(draft?.[lang], { max: 200 });
    if (error) errors[lang] = error;
  }
  return errors;
};

const validateModifiers = () => ({});

const validateDescriptions = (draft) => {
  const errors = {};
  for (const channel of ["aggregators", "website", "google"]) {
    for (const lang of ["en", "ru", "ar"]) {
      const error = ruleStr(draft?.[channel]?.[lang], { max: 2000 });
      if (error) errors[`${channel}.${lang}`] = error;
    }
  }
  return errors;
};

const SECTION_VALIDATORS = {
  basic: validateBasic,
  name: validateName,
  modifiers: validateModifiers,
  descriptions: validateDescriptions,
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
