const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

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

const ruleTime = (value) => {
  if (!value) return null;
  if (typeof value !== "string") return "mustBeString";
  return TIME_RE.test(value.trim()) ? null : "invalidTime";
};

const validateBasic = (draft) => {
  const errors = {};

  const isActive = ruleBool(draft?.isActive);
  if (isActive) errors.isActive = isActive;

  const timings = draft?.activeTimings;
  if (timings) {
    const isAlways = ruleBool(timings.isAlwaysActive);
    if (isAlways) errors["activeTimings.isAlwaysActive"] = isAlways;

    if (Array.isArray(timings.windows)) {
      timings.windows.forEach((win, i) => {
        const label = ruleStr(win?.label, { max: 100 });
        if (label) errors[`activeTimings.windows[${i}].label`] = label;

        const from = ruleTime(win?.from);
        if (from) errors[`activeTimings.windows[${i}].from`] = from;

        const to = ruleTime(win?.to);
        if (to) errors[`activeTimings.windows[${i}].to`] = to;
      });
    }
  }

  return errors;
};

const validateName = (draft) => {
  const errors = {};
  const hasAny = ["en", "ru", "ar"].some(
    (lang) => typeof draft?.[lang] === "string" && draft[lang].trim().length > 0,
  );

  for (const lang of ["en", "ru", "ar"]) {
    const err = ruleStr(draft?.[lang], { max: 200 });
    if (err) errors[lang] = err;
  }

  if (!hasAny && Object.keys(errors).length === 0) {
    errors.en = "required";
  }

  return errors;
};

const validateItems = () => {
  // menuItems is an ObjectId array — no per-field validation needed on the client
  return {};
};

const SECTION_VALIDATORS = {
  basic: validateBasic,
  name: validateName,
  items: validateItems,
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
