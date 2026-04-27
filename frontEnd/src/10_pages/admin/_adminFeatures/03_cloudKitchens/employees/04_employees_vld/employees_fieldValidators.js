const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-().]{6,20}$/;
const isDate = (value) => !value || !Number.isNaN(new Date(value).getTime());
const isNum = (value) => value === "" || value === null || value === undefined || !Number.isNaN(Number(value));

const str = (value, { required = false, min = 0, max } = {}) => {
  if (value === undefined || value === null) return required ? "required" : null;
  if (typeof value !== "string") return "mustBeString";
  const trimmed = value.trim();
  if (required && !trimmed) return "required";
  if (!required && !trimmed) return null;
  if (min && trimmed.length < min) return "tooShort";
  if (max && trimmed.length > max) return "tooLong";
  return null;
};
const num = (value) => {
  if (!isNum(value)) return "notANumber";
  if (value !== "" && value !== null && value !== undefined && Number(value) < 0) return "numberMin";
  return null;
};
const date = (value) => (isDate(value) ? null : "invalidDate");
const phone = (value) => (!value || PHONE_RE.test(value) ? null : "invalidPhone");
const email = (value) => (!value || EMAIL_RE.test(value) ? null : "invalidEmail");

const validateBasic = (draft) => {
  const errors = {};
  const firstName = str(draft?.firstName, { required: true, min: 2, max: 100 });
  if (firstName) errors.firstName = firstName;
  const lastName = str(draft?.lastName, { required: true, min: 2, max: 100 });
  if (lastName) errors.lastName = lastName;
  const legalFullName = str(draft?.legalFullName, { max: 200 });
  if (legalFullName) errors.legalFullName = legalFullName;
  for (const key of ["dateOfBirth", "joiningDate"]) {
    const value = date(draft?.[key]);
    if (value) errors[key] = value;
  }
  return errors;
};

const validateStatus = (draft) => {
  const errors = {};
  if (draft?.isActive && (draft?.isResigned || draft?.isTerminated)) errors.isActive = "activeConflict";
  const reason = str(draft?.terminationReason, { max: 1000 });
  if (reason) errors.terminationReason = reason;
  return errors;
};

const validateContact = (draft) => {
  const errors = {};
  for (const key of ["phone", "whatsApp", "telegram"]) {
    const value = phone(draft?.[key]);
    if (value) errors[key] = value;
  }
  const emailErr = email(draft?.email);
  if (emailErr) errors.email = emailErr;
  return errors;
};

const validateSalary = (draft) => {
  const errors = {};
  for (const key of ["basic", "allowances"]) {
    const value = num(draft?.[key]);
    if (value) errors[key] = value;
  }
  const currency = str(draft?.currency, { min: 2, max: 6 });
  if (currency) errors.currency = currency;
  return errors;
};

const validateLeaves = (draft) => {
  const errors = {};
  for (const path of ["annualLeaves.remaining", "annualLeaves.used.qnt", "publicHolidaysBalance"]) {
    const value = path.split(".").reduce((acc, key) => acc?.[key], draft);
    const err = num(value);
    if (err) errors[path] = err;
  }
  (draft?.annualLeaves?.used?.dates ?? []).forEach((row, index) => {
    const from = date(row?.from);
    if (from) errors[`annualLeaves.used.dates[${index}].from`] = from;
    const to = date(row?.to);
    if (to) errors[`annualLeaves.used.dates[${index}].to`] = to;
    if (!from && !to && row?.from && row?.to && new Date(row.from) > new Date(row.to)) {
      errors[`annualLeaves.used.dates[${index}].to`] = "durationOrder";
    }
  });
  return errors;
};

const validateLegal = (draft) => {
  const errors = {};
  for (const docKey of ["visa", "emiratesId", "medical", "hygieneCert", "healthCard"]) {
    const doc = draft?.[docKey] ?? {};
    const status = str(doc.status, { max: 40 });
    if (status) errors[`${docKey}.status`] = status;
    const expDate = date(doc.expDate);
    if (expDate) errors[`${docKey}.expDate`] = expDate;
    const notes = str(doc.notes, { max: 1000 });
    if (notes) errors[`${docKey}.notes`] = notes;
    if (docKey === "visa") {
      const company = str(doc.whatCompanyIsUnder, { max: 200 });
      if (company) errors["visa.whatCompanyIsUnder"] = company;
    }
  }
  return errors;
};

const validateCertifications = (draft) => {
  const errors = {};
  (Array.isArray(draft) ? draft : []).forEach((row, index) => {
    for (const key of ["name", "issuer"]) {
      const value = str(row?.[key], { max: 200 });
      if (value) errors[`[${index}].${key}`] = value;
    }
    for (const key of ["issuedDate", "expDate"]) {
      const value = date(row?.[key]);
      if (value) errors[`[${index}].${key}`] = value;
    }
    const notes = str(row?.notes, { max: 1000 });
    if (notes) errors[`[${index}].notes`] = notes;
  });
  return errors;
};

const validateUniform = (draft) => {
  const errors = {};
  for (const key of ["top", "bottom", "shoes"]) {
    const value = str(draft?.sizes?.[key], { max: 50 });
    if (value) errors[`sizes.${key}`] = value;
  }
  (draft?.issued ?? []).forEach((row, index) => {
    const item = str(row?.item, { max: 100 });
    if (item) errors[`issued[${index}].item`] = item;
    const issueDate = date(row?.date);
    if (issueDate) errors[`issued[${index}].date`] = issueDate;
    const notes = str(row?.notes, { max: 500 });
    if (notes) errors[`issued[${index}].notes`] = notes;
  });
  return errors;
};

const validators = {
  basic: validateBasic,
  status: validateStatus,
  contact: validateContact,
  assignment: () => ({}),
  salary: validateSalary,
  leaves: validateLeaves,
  legal: validateLegal,
  certifications: validateCertifications,
  uniform: validateUniform,
};

export const validateSection = (sectionKey, draft) => {
  const errors = validators[sectionKey]?.(draft) ?? {};
  return { ok: Object.keys(errors).length === 0, errors };
};

export const validateBulk = (bulkDrafts) => {
  const flat = {};
  for (const sectionKey of Object.keys(bulkDrafts ?? {})) {
    const sectionErrors = validators[sectionKey]?.(bulkDrafts[sectionKey]) ?? {};
    for (const path of Object.keys(sectionErrors)) flat[`${sectionKey}.${path}`] = sectionErrors[path];
  }
  return { ok: Object.keys(flat).length === 0, errors: flat };
};
