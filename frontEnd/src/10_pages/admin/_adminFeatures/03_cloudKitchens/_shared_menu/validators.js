// Shared client-side validators for the menu system's common sub-schemas.
// Each returns { ok, errors: { [path]: "validationKey" } }.

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export const validateLocalizedText = (value, { field, max = 500 } = {}) => {
  const errors = {};
  if (!value) return { ok: true, errors };
  for (const lang of ["en", "ru", "ar"]) {
    const v = value?.[lang];
    if (v !== undefined && v !== null && v !== "") {
      if (typeof v !== "string") {
        errors[`${field}.${lang}`] = "mustBeString";
      } else if (v.length > max) {
        errors[`${field}.${lang}`] = "tooLong";
      }
    }
  }
  return { ok: Object.keys(errors).length === 0, errors };
};

export const validateDescriptionBundle = (
  value,
  { field, max = 2000 } = {},
) => {
  const errors = {};
  if (!value) return { ok: true, errors };
  for (const channel of ["aggregators", "website", "google"]) {
    const sub = value?.[channel];
    if (!sub) continue;
    const r = validateLocalizedText(sub, {
      field: `${field}.${channel}`,
      max,
    });
    Object.assign(errors, r.errors);
  }
  return { ok: Object.keys(errors).length === 0, errors };
};

export const validateActiveTimings = (value, { field } = {}) => {
  const errors = {};
  if (!value) return { ok: true, errors };
  if (value.isAlwaysActive !== undefined && typeof value.isAlwaysActive !== "boolean") {
    errors[`${field}.isAlwaysActive`] = "mustBeBoolean";
  }
  if (Array.isArray(value.windows)) {
    value.windows.forEach((w, i) => {
      if (w.label && typeof w.label !== "string") {
        errors[`${field}.windows[${i}].label`] = "mustBeString";
      }
      if (w.from && !TIME_RE.test(w.from)) {
        errors[`${field}.windows[${i}].from`] = "invalidTime";
      }
      if (w.to && !TIME_RE.test(w.to)) {
        errors[`${field}.windows[${i}].to`] = "invalidTime";
      }
    });
  }
  return { ok: Object.keys(errors).length === 0, errors };
};
