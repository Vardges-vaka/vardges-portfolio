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
  const num = Number(value);
  if (Number.isNaN(num)) return "notANumber";
  if (min !== undefined && num < min) return "numberMin";
  return null;
};

const ruleLocalized = (obj, { max = 500 }) => {
  const errors = {};
  if (!obj || typeof obj !== "object") return errors;

  for (const lang of ["en", "ru", "ar", "hy"]) {
    if (obj[lang]) {
      const err = ruleStr(obj[lang], { max });
      if (err) errors[lang] = err;
    }
  }
  return errors;
};

const ruleDescriptions = (obj) => {
  const errors = {};
  if (!obj || typeof obj !== "object") return errors;

  for (const channel of Object.keys(obj)) {
    const locErrors = ruleLocalized(obj[channel], { max: 2000 });
    for (const lang of Object.keys(locErrors)) {
      errors[`${channel}.${lang}`] = locErrors[lang];
    }
  }
  return errors;
};

const validateBasic = (draft) => {
  const errors = {};

  const typeErr = (() => {
    if (!draft?.type) return null;
    return ["optional", "mandatory"].includes(draft.type) ? null : "invalidEnum";
  })();
  if (typeErr) errors.type = typeErr;

  const selErr = (() => {
    if (!draft?.selectionQty) return null;
    return ["onlyOne", "multiple"].includes(draft.selectionQty) ? null : "invalidEnum";
  })();
  if (selErr) errors.selectionQty = selErr;

  const costErr = ruleNum(draft?.cost, { min: 0 });
  if (costErr) errors.cost = costErr;

  const isActive = ruleBool(draft?.isActive);
  if (isActive) errors.isActive = isActive;

  return errors;
};

const validateName = (draft) => {
  const errors = {};
  if (!draft || typeof draft !== "object") return errors;

  for (const lang of ["en", "ru", "ar", "hy"]) {
    const err = ruleStr(draft[lang], { max: 500 });
    if (err) errors[lang] = err;
  }
  return errors;
};

const validateDescriptions = (draft) => ruleDescriptions(draft);

const validateOptions = (draft) => {
  const errors = {};
  const rows = Array.isArray(draft) ? draft : [];

  rows.forEach((row, index) => {
    const nameErrors = ruleLocalized(row?.name, { max: 500 });
    for (const lang of Object.keys(nameErrors)) {
      errors[`[${index}].name.${lang}`] = nameErrors[lang];
    }

    const descErrors = ruleDescriptions(row?.descriptions);
    for (const key of Object.keys(descErrors)) {
      errors[`[${index}].descriptions.${key}`] = descErrors[key];
    }

    const costErr = ruleNum(row?.cost, { min: 0 });
    if (costErr) errors[`[${index}].cost`] = costErr;

    const priceErr = ruleNum(row?.sellingPrice, { min: 0 });
    if (priceErr) errors[`[${index}].sellingPrice`] = priceErr;

    const activeErr = ruleBool(row?.isActive);
    if (activeErr) errors[`[${index}].isActive`] = activeErr;
  });

  return errors;
};

const SECTION_VALIDATORS = {
  basic: validateBasic,
  name: validateName,
  descriptions: validateDescriptions,
  options: validateOptions,
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
