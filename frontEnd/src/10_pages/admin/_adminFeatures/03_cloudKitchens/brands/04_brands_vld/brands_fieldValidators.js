const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ruleStr = (value, { min = 0, max, required = false } = {}) => {
  if (value === undefined || value === null)
    return required ? "required" : null;
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

const ruleNum = (value, { required = false } = {}) => {
  if (value === undefined || value === null || value === "") {
    return required ? "required" : null;
  }
  return Number.isFinite(Number(value)) ? null : "mustBeNumber";
};

const ruleEmail = (value) => {
  if (!value) return null;
  if (typeof value !== "string") return "mustBeString";
  return EMAIL_RE.test(value.trim()) ? null : "invalidEmail";
};

const addStringErrors = (errors, draft, fields, prefix = "") => {
  fields.forEach(([field, options]) => {
    const error = ruleStr(draft?.[field], options);
    if (error) errors[`${prefix}${field}`] = error;
  });
};

const validateLocalized = (errors, key, draft, required = false) => {
  const value = ruleStr(draft?.[key]?.value, {
    min: required ? 2 : 0,
    max: 120,
    required,
  });
  if (value) errors[`${key}.value`] = value;

  for (const lang of ["en", "ru", "ar"]) {
    const error = ruleStr(draft?.[key]?.translations?.[lang], { max: 120 });
    if (error) errors[`${key}.translations.${lang}`] = error;
  }
};

const validateBasic = (draft) => {
  const errors = {};
  validateLocalized(errors, "name", draft, true);
  validateLocalized(errors, "tagline", draft, false);

  const isActive = ruleBool(draft?.isActive);
  if (isActive) errors.isActive = isActive;

  return errors;
};

const validateSocialAccount = (errors, key, value) => {
  const isActive = ruleBool(value?.isActive);
  if (isActive) errors[`${key}.isActive`] = isActive;
  addStringErrors(
    errors,
    value,
    [
      ["link", { max: 500 }],
      ["consoleLink", { max: 500 }],
    ],
    `${key}.`,
  );
};

const validateSocials = (draft) => {
  const errors = {};
  for (const key of [
    "instagram",
    "facebook",
    "tikTok",
    "linkedIn",
    "youtube",
    "twitter",
  ]) {
    validateSocialAccount(errors, key, draft?.[key]);
  }
  return errors;
};

const validateFiles = (draft) => {
  const errors = {};
  const stringPaths = [
    ["logos.highRes", draft?.logos?.highRes],
    ["logos.svg", draft?.logos?.svg],
    ["logos.png", draft?.logos?.png],
    ["logos.jpg", draft?.logos?.jpg],
    ["logos.pdf", draft?.logos?.pdf],
    ["logos.ico", draft?.logos?.ico],
    ["branding.brandBook", draft?.branding?.brandBook],
    ["branding.brandOverview", draft?.branding?.brandOverview],
    ["legal.vatCertificate", draft?.legal?.vatCertificate],
    ["legal.tradeLicense", draft?.legal?.tradeLicense],
    ["legal.tradeMark", draft?.legal?.tradeMark],
    ["menus.pdf", draft?.menus?.pdf],
    ["menus.excel", draft?.menus?.excel],
    ["menus.word", draft?.menus?.word],
    ["recipe.pdf", draft?.recipe?.pdf],
    ["recipe.excel", draft?.recipe?.excel],
    ["recipe.word", draft?.recipe?.word],
  ];

  stringPaths.forEach(([path, value]) => {
    const error = ruleStr(value, { max: 1000 });
    if (error) errors[path] = error;
  });

  // Packaging validation
  (Array.isArray(draft?.branding?.packaging)
    ? draft.branding.packaging
    : []
  ).forEach((item, index) => {
    addStringErrors(
      errors,
      item,
      [
        ["ref", { max: 250 }],
        ["value", { max: 1000 }],
      ],
      `branding.packaging[${index}].`,
    );
  });

  // Contracts validation
  (Array.isArray(draft?.contracts) ? draft.contracts : []).forEach(
    (contract, index) => {
      addStringErrors(
        errors,
        contract,
        [
          ["with", { required: true, max: 250 }],
          ["label", { required: true, max: 250 }],
          ["description", { max: 1000 }],
          ["fileUrl", { required: true, max: 1000 }],
          ["started", { required: true, max: 40 }],
          ["ending", { max: 40 }],
          ["fileFormat", { max: 50 }],
        ],
        `contracts[${index}].`,
      );

      const notice = ruleNum(contract?.noticePeriodInDays);
      if (notice) errors[`contracts[${index}].noticePeriodInDays`] = notice;

      const isEnded = ruleBool(contract?.isEnded);
      if (isEnded) errors[`contracts[${index}].isEnded`] = isEnded;
      const isTerminated = ruleBool(contract?.isTerminated);
      if (isTerminated)
        errors[`contracts[${index}].isTerminated`] = isTerminated;
    },
  );

  // Miscellaneous validation
  (Array.isArray(draft?.miscellaneous) ? draft.miscellaneous : []).forEach(
    (item, index) => {
      addStringErrors(
        errors,
        item,
        [
          ["ref", { max: 250 }],
          ["value", { max: 1000 }],
        ],
        `miscellaneous[${index}].`,
      );
    },
  );

  return errors;
};

const validateWebsite = (draft) => {
  const errors = {};
  const isActive = ruleBool(draft?.isActive);
  if (isActive) errors.isActive = isActive;
  const autoRenew = ruleBool(draft?.autoRenew);
  if (autoRenew) errors.autoRenew = autoRenew;

  addStringErrors(errors, draft, [
    ["link", { max: 500 }],
    ["consoleLink", { max: 500 }],
    ["domain", { max: 250 }],
    ["registrar", { max: 250 }],
    ["whois", { max: 1000 }],
    ["status", { max: 120 }],
    ["dnsStatus", { max: 120 }],
    ["notes", { max: 1000 }],
    ["expiresOn", { max: 40 }],
    ["lastRenewedOn", { max: 40 }],
  ]);

  (Array.isArray(draft?.emails) ? draft.emails : []).forEach((row, index) => {
    const email = ruleEmail(row?.email);
    if (email) errors[`emails[${index}].email`] = email;
  });

  // Name servers validation
  (Array.isArray(draft?.nameServers) ? draft.nameServers : []).forEach(
    (ns, index) => {
      const error = ruleStr(ns, { max: 500 });
      if (error) errors[`nameServers[${index}]`] = error;
    },
  );

  // DNS records validation
  (Array.isArray(draft?.dnsRecords) ? draft.dnsRecords : []).forEach(
    (record, index) => {
      addStringErrors(
        errors,
        record,
        [
          ["type", { required: true, max: 50 }],
          ["name", { required: true, max: 250 }],
          ["value", { required: true, max: 1000 }],
        ],
        `dnsRecords[${index}].`,
      );

      const ttl = ruleNum(record?.ttl);
      if (ttl) errors[`dnsRecords[${index}].ttl`] = ttl;
    },
  );

  // Renewal history validation
  (Array.isArray(draft?.renewalHistory) ? draft.renewalHistory : []).forEach(
    (renewal, index) => {
      addStringErrors(
        errors,
        renewal,
        [
          ["renewedOn", { required: true, max: 40 }],
          ["currency", { required: true, max: 10 }],
          ["transactionId", { max: 250 }],
        ],
        `renewalHistory[${index}].`,
      );

      const amount = ruleNum(renewal?.amount, { required: true });
      if (amount) errors[`renewalHistory[${index}].amount`] = amount;

      addStringErrors(
        errors,
        renewal?.card,
        [
          ["brand", { max: 120 }],
          ["last4", { max: 4 }],
          ["cardholder", { max: 250 }],
        ],
        `renewalHistory[${index}].card.`,
      );
    },
  );

  return errors;
};

const validateOtherSocials = (draft) => {
  const errors = {};
  const rows = Array.isArray(draft) ? draft : [];
  rows.forEach((row, index) => {
    addStringErrors(
      errors,
      row,
      [
        ["name", { max: 120 }],
        ["link", { max: 500 }],
        ["notes", { max: 500 }],
      ],
      `[${index}].`,
    );
    const isActive = ruleBool(row?.isActive);
    if (isActive) errors[`[${index}].isActive`] = isActive;
  });
  return errors;
};

const validateIntegration = (draft) => {
  const errors = {};
  addStringErrors(errors, draft, [
    ["provider", { max: 120 }],
    ["startedAt", { max: 40 }],
    ["notes", { max: 1000 }],
    ["link", { max: 500 }],
    ["consoleLink", { max: 500 }],
  ]);

  const isActive = ruleBool(draft?.isActive);
  if (isActive) errors.isActive = isActive;

  // Payment validation
  addStringErrors(
    errors,
    draft?.payment,
    [
      ["cycle", { max: 120 }],
      ["method", { max: 120 }],
      ["currency", { max: 10 }],
    ],
    "payment.",
  );

  const paymentAmount = ruleNum(draft?.payment?.amount);
  if (paymentAmount) errors["payment.amount"] = paymentAmount;

  // Credentials validation
  addStringErrors(
    errors,
    draft?.credentials,
    [
      ["apiKey", { max: 500 }],
      ["secret", { max: 500 }],
      ["accountId", { max: 250 }],
    ],
    "credentials.",
  );

  // Main contacts validation
  const contactEmail = ruleEmail(draft?.mainContacts?.email);
  if (contactEmail) errors["mainContacts.email"] = contactEmail;
  addStringErrors(
    errors,
    draft?.mainContacts,
    [
      ["telegram", { max: 250 }],
      ["whatsApp", { max: 250 }],
      ["phone", { max: 250 }],
    ],
    "mainContacts.",
  );

  // Registered phones validation
  (Array.isArray(draft?.registeredPhones)
    ? draft.registeredPhones
    : []
  ).forEach((phone, index) => {
    addStringErrors(
      errors,
      phone,
      [
        ["branch", { max: 250 }],
        ["phone", { required: true, max: 50 }],
        ["purpose", { max: 250 }],
        ["notes", { max: 500 }],
        ["registeredAt", { max: 40 }],
      ],
      `registeredPhones[${index}].`,
    );

    const isActive = ruleBool(phone?.isActive);
    if (isActive) errors[`registeredPhones[${index}].isActive`] = isActive;
    const isWhatsApp = ruleBool(phone?.isWhatsAppRegistered);
    if (isWhatsApp)
      errors[`registeredPhones[${index}].isWhatsAppRegistered`] = isWhatsApp;
    const isTelegram = ruleBool(phone?.isTelegramRegistered);
    if (isTelegram)
      errors[`registeredPhones[${index}].isTelegramRegistered`] = isTelegram;
  });

  // Login credentials validation
  (Array.isArray(draft?.loginCredentials)
    ? draft.loginCredentials
    : []
  ).forEach((login, index) => {
    addStringErrors(
      errors,
      login,
      [
        ["username", { required: true, max: 250 }],
        ["password", { required: true, max: 500 }],
        ["phoneNumber", { max: 50 }],
        ["type", { required: true, max: 120 }],
      ],
      `loginCredentials[${index}].`,
    );

    const email = ruleEmail(login?.email);
    if (email) errors[`loginCredentials[${index}].email`] = email;

    const doesOtp = ruleBool(login?.doesOtpRequired);
    if (doesOtp) errors[`loginCredentials[${index}].doesOtpRequired`] = doesOtp;

    addStringErrors(
      errors,
      login?.belongTo,
      [
        ["name", { max: 250 }],
        ["employeeId", { max: 250 }],
      ],
      `loginCredentials[${index}].belongTo.`,
    );
  });

  return errors;
};

const validateInventoryIntegrations = (draft) => {
  const errors = {};
  const rows = Array.isArray(draft) ? draft : [];
  rows.forEach((row, index) => {
    const rowErrors = validateIntegration(row);
    Object.entries(rowErrors).forEach(([path, code]) => {
      errors[`[${index}].${path}`] = code;
    });
  });
  return errors;
};

const validateLegal = (draft) => {
  const errors = {};
  addStringErrors(
    errors,
    draft?.registeredIn,
    [
      ["country", { max: 120 }],
      ["city", { max: 120 }],
      ["emirate", { max: 120 }],
      ["dateOfRegistration", { max: 40 }],
    ],
    "registeredIn.",
  );

  for (const field of [
    "hasTradeLicense",
    "hasVATCertificate",
    "hasTradeMark",
  ]) {
    const error = ruleBool(draft?.registeredIn?.[field]);
    if (error) errors[`registeredIn.${field}`] = error;
  }

  return errors;
};

const SECTION_VALIDATORS = {
  basic: validateBasic,
  files: validateFiles,
  socials: validateSocials,
  website: validateWebsite,
  otherSocials: validateOtherSocials,
  inventoryIntegrations: validateInventoryIntegrations,
  salesIntegration: validateIntegration,
  legal: validateLegal,
  relations: () => ({}),
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
