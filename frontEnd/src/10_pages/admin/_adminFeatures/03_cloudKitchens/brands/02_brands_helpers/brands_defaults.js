const TRANSLATIONS = { en: "", ru: "", ar: "" };

export const EMPTY_LOCALIZED_FIELD = {
  value: "",
  translations: { ...TRANSLATIONS },
};

export const EMPTY_SOCIAL_ACCOUNT = {
  isActive: true,
  link: "",
  consoleLink: "",
};

export const EMPTY_EMAIL_ROW = {
  name: "",
  position: "",
  email: "",
  employeeId: "",
};

export const EMPTY_OTHER_SOCIAL_ROW = {
  name: "",
  link: "",
  isActive: true,
  notes: "",
};

export const EMPTY_INVENTORY_INTEGRATION_ROW = {
  provider: "",
  startedAt: "",
  isActive: true,
  notes: "",
  payment: {
    cycle: "",
    method: "",
    amount: "",
    currency: "",
  },
  credentials: {
    apiKey: "",
    secret: "",
    accountId: "",
  },
  mainContacts: {
    telegram: "",
    whatsApp: "",
    phone: "",
    email: "",
  },
  registeredPhones: [],
  loginCredentials: [],
};

export const EMPTY_REGISTERED_PHONE_ROW = {
  branch: "",
  phone: "",
  isActive: true,
  isWhatsAppRegistered: false,
  isTelegramRegistered: false,
  purpose: "",
  notes: "",
  registeredAt: "",
};

export const EMPTY_LOGIN_CREDENTIAL_ROW = {
  belongTo: {
    name: "",
    employeeId: "",
  },
  username: "",
  password: "",
  email: "",
  phoneNumber: "",
  type: "",
  doesOtpRequired: false,
};

export const EMPTY_CONTRACT_ROW = {
  with: "",
  label: "",
  description: "",
  fileUrl: "",
  started: "",
  ending: "",
  fileFormat: "",
  isEnded: false,
  isTerminated: false,
  noticePeriodInDays: "",
};

export const EMPTY_FILE_REF_ROW = {
  ref: "",
  value: "",
};

export const EMPTY_DNS_RECORD_ROW = {
  type: "",
  name: "",
  value: "",
  ttl: "",
};

export const EMPTY_RENEWAL_ROW = {
  renewedOn: "",
  amount: "",
  currency: "",
  card: {
    brand: "",
    last4: "",
    cardholder: "",
  },
  transactionId: "",
};

const localizedField = (value) => {
  if (typeof value === "string") {
    return { value, translations: { ...TRANSLATIONS, en: value } };
  }

  return {
    value: value?.value ?? "",
    translations: {
      en: value?.translations?.en ?? "",
      ru: value?.translations?.ru ?? "",
      ar: value?.translations?.ar ?? "",
    },
  };
};

const socialAccount = (value) => {
  if (typeof value === "string") {
    return { ...EMPTY_SOCIAL_ACCOUNT, link: value };
  }

  return {
    isActive: value?.isActive ?? true,
    link: value?.link ?? "",
    consoleLink: value?.consoleLink ?? "",
  };
};

const idOf = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value._id ?? "";
};

const dateOf = (value) => (value ? String(value).slice(0, 10) : "");

const contactValue = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.value ?? value.link ?? value.name ?? "";
};

export const getBrandDisplayName = (brand) => {
  if (!brand) return "";
  if (typeof brand === "string") return brand;
  if (typeof brand.name === "string") return brand.name;
  return (
    brand.name?.value ||
    brand.name?.translations?.en ||
    brand.name?.translations?.ru ||
    brand.name?.translations?.ar ||
    brand._id ||
    ""
  );
};

export const getBrandTagline = (brand) => {
  if (!brand) return "";
  if (typeof brand.tagline === "string") return brand.tagline;
  return brand.tagline?.value || brand.tagline?.translations?.en || "";
};

export const getEmployeeDisplayName = (employee) => {
  if (!employee) return "";
  if (typeof employee === "string") return employee;
  return (
    [employee.firstName, employee.lastName].filter(Boolean).join(" ") ||
    employee.name ||
    employee.contact?.email ||
    employee._id ||
    ""
  );
};

export const getRefDisplayName = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return getBrandDisplayName(value) || value.name || value._id || "";
};

const fileRefDraft = (row = {}) => ({
  ref: row?.ref ?? "",
  value: row?.value ?? "",
});

const contractDraft = (row = {}) => ({
  ...EMPTY_CONTRACT_ROW,
  ...row,
  started: dateOf(row?.started),
  ending: dateOf(row?.ending),
  noticePeriodInDays: row?.noticePeriodInDays ?? "",
});

const dnsRecordDraft = (row = {}) => ({
  ...EMPTY_DNS_RECORD_ROW,
  ...row,
  ttl: row?.ttl ?? "",
});

const renewalDraft = (row = {}) => ({
  ...EMPTY_RENEWAL_ROW,
  ...row,
  renewedOn: dateOf(row?.renewedOn),
  amount: row?.amount ?? "",
  card: {
    ...EMPTY_RENEWAL_ROW.card,
    ...(row?.card ?? {}),
  },
});

const registeredPhoneDraft = (row = {}) => ({
  ...EMPTY_REGISTERED_PHONE_ROW,
  ...row,
  branch: idOf(row?.branch),
  registeredAt: dateOf(row?.registeredAt),
});

const loginCredentialDraft = (row = {}) => ({
  ...EMPTY_LOGIN_CREDENTIAL_ROW,
  ...row,
  belongTo: {
    ...EMPTY_LOGIN_CREDENTIAL_ROW.belongTo,
    ...(row?.belongTo ?? {}),
    employeeId: idOf(row?.belongTo?.employeeId),
  },
});

const filesDraft = (files = {}) => ({
  logos: {
    highRes: files?.logos?.highRes ?? files?.highRes ?? "",
    svg: files?.logos?.svg ?? "",
    png: files?.logos?.png ?? "",
    jpg: files?.logos?.jpg ?? "",
    pdf: files?.logos?.pdf ?? "",
    ico: files?.logos?.ico ?? "",
  },
  branding: {
    brandBook: files?.branding?.brandBook ?? "",
    brandOverview: files?.branding?.brandOverview ?? "",
    packaging: Array.isArray(files?.branding?.packaging)
      ? files.branding.packaging.map(fileRefDraft)
      : [],
  },
  legal: {
    vatCertificate: files?.legal?.vatCertificate ?? "",
    tradeLicense: files?.legal?.tradeLicense ?? "",
    tradeMark: files?.legal?.tradeMark ?? "",
  },
  menus: {
    pdf: files?.menus?.pdf ?? "",
    excel: files?.menus?.excel ?? "",
    word: files?.menus?.word ?? "",
  },
  recipe: {
    pdf: files?.recipe?.pdf ?? "",
    excel: files?.recipe?.excel ?? "",
    word: files?.recipe?.word ?? "",
  },
  contracts: Array.isArray(files?.contracts)
    ? files.contracts.map(contractDraft)
    : [],
  miscellaneous: Array.isArray(files?.miscellaneous)
    ? files.miscellaneous.map(fileRefDraft)
    : Array.isArray(files)
      ? files.map(fileRefDraft)
      : [],
});

const websiteDraft = (website = {}) => ({
  isActive: website?.isActive ?? true,
  link: website?.link ?? "",
  consoleLink: website?.consoleLink ?? "",
  domain: website?.domain ?? "",
  registrar: website?.registrar ?? "",
  whois: website?.whois ?? "",
  nameServers: Array.isArray(website?.nameServers) ? website.nameServers : [],
  emails: Array.isArray(website?.emails)
    ? website.emails.map((row) => ({
        name: row?.name ?? "",
        position: row?.position ?? "",
        email: row?.email ?? "",
        employeeId: idOf(row?.employeeId),
      }))
    : [],
  dnsRecords: Array.isArray(website?.dnsRecords)
    ? website.dnsRecords.map(dnsRecordDraft)
    : [],
  status: website?.status ?? "",
  expiresOn: dateOf(website?.expiresOn),
  lastRenewedOn: dateOf(website?.lastRenewedOn),
  autoRenew: website?.autoRenew ?? false,
  renewalHistory: Array.isArray(website?.renewalHistory)
    ? website.renewalHistory.map(renewalDraft)
    : [],
  dnsStatus: website?.dnsStatus ?? "",
  notes: website?.notes ?? "",
});

const integrationDraft = (integration = {}) => ({
  ...EMPTY_INVENTORY_INTEGRATION_ROW,
  ...integration,
  payment: {
    ...EMPTY_INVENTORY_INTEGRATION_ROW.payment,
    ...(integration?.payment ?? {}),
  },
  credentials: {
    ...EMPTY_INVENTORY_INTEGRATION_ROW.credentials,
    ...(integration?.credentials ?? {}),
  },
  mainContacts: {
    telegram: contactValue(integration?.mainContacts?.telegram),
    whatsApp: contactValue(integration?.mainContacts?.whatsApp),
    phone: contactValue(integration?.mainContacts?.phone),
    email: contactValue(integration?.mainContacts?.email),
  },
  registeredPhones: Array.isArray(integration?.registeredPhones)
    ? integration.registeredPhones.map(registeredPhoneDraft)
    : [],
  loginCredentials: Array.isArray(integration?.loginCredentials)
    ? integration.loginCredentials.map(loginCredentialDraft)
    : [],
});

const legalDraft = (legal = {}) => ({
  registeredIn: {
    country: legal?.registeredIn?.country ?? "",
    city: legal?.registeredIn?.city ?? "",
    emirate: legal?.registeredIn?.emirate ?? "",
    hasTradeLicense: legal?.registeredIn?.hasTradeLicense ?? false,
    hasVATCertificate: legal?.registeredIn?.hasVATCertificate ?? false,
    hasTradeMark: legal?.registeredIn?.hasTradeMark ?? false,
    dateOfRegistration: legal?.registeredIn?.dateOfRegistration
      ? String(legal.registeredIn.dateOfRegistration).slice(0, 10)
      : "",
  },
});

export const EMPTY_BRAND_FORM = {
  name: { ...EMPTY_LOCALIZED_FIELD, translations: { ...TRANSLATIONS } },
  tagline: { ...EMPTY_LOCALIZED_FIELD, translations: { ...TRANSLATIONS } },
  files: filesDraft(),
  socials: {
    instagram: { ...EMPTY_SOCIAL_ACCOUNT },
    facebook: { ...EMPTY_SOCIAL_ACCOUNT },
    tikTok: { ...EMPTY_SOCIAL_ACCOUNT },
    linkedIn: { ...EMPTY_SOCIAL_ACCOUNT },
    youtube: { ...EMPTY_SOCIAL_ACCOUNT },
    twitter: { ...EMPTY_SOCIAL_ACCOUNT },
  },
  website: websiteDraft(),
  otherSocials: [],
  inventoryIntegrations: [],
  salesIntegration: integrationDraft(),
  legal: legalDraft(),
  isActive: true,
  relations: {
    branches: [],
    employees: [],
    equipments: [],
    menu: "",
    competitors: [],
  },
};

export const EMPTY_BRAND_ADD_FORM = {
  name: { ...EMPTY_LOCALIZED_FIELD, translations: { ...TRANSLATIONS } },
  socials: {
    instagram: { ...EMPTY_SOCIAL_ACCOUNT },
    facebook: { ...EMPTY_SOCIAL_ACCOUNT },
    tikTok: { ...EMPTY_SOCIAL_ACCOUNT },
    linkedIn: { ...EMPTY_SOCIAL_ACCOUNT },
    youtube: { ...EMPTY_SOCIAL_ACCOUNT },
    twitter: { ...EMPTY_SOCIAL_ACCOUNT },
  },
  branches: [],
};

export const hydrateBrandForm = (brand) => {
  const socials = brand?.socials ?? {};

  return {
    ...EMPTY_BRAND_FORM,
    name: localizedField(brand?.name),
    tagline: localizedField(brand?.tagline),
    files: filesDraft(brand?.files),
    socials: {
      instagram: socialAccount(socials?.instagram),
      facebook: socialAccount(socials?.facebook),
      tikTok: socialAccount(socials?.tikTok),
      linkedIn: socialAccount(socials?.linkedIn),
      youtube: socialAccount(socials?.youtube),
      twitter: socialAccount(socials?.twitter),
    },
    website: websiteDraft(socials?.website),
    otherSocials: Array.isArray(socials?.others)
      ? socials.others.map((row) => ({ ...EMPTY_OTHER_SOCIAL_ROW, ...row }))
      : [],
    inventoryIntegrations: Array.isArray(brand?.inventoryIntegrations)
      ? brand.inventoryIntegrations.map(integrationDraft)
      : [],
    salesIntegration: integrationDraft(brand?.salesIntegration),
    legal: legalDraft(brand?.legal),
    isActive: brand?.isActive ?? true,
    relations: {
      branches: Array.isArray(brand?.branches)
        ? brand.branches.map(idOf).filter(Boolean)
        : [],
      employees: Array.isArray(brand?.employees)
        ? brand.employees.map(idOf).filter(Boolean)
        : [],
      equipments: Array.isArray(brand?.equipments)
        ? brand.equipments.map(idOf).filter(Boolean)
        : [],
      menu: idOf(brand?.menu),
      competitors: Array.isArray(brand?.competitors)
        ? brand.competitors.map(idOf).filter(Boolean)
        : [],
    },
  };
};

export const pickSectionDraft = (hydrated, sectionKey) => {
  if (sectionKey === "basic") {
    return {
      name: hydrated.name,
      tagline: hydrated.tagline,
      isActive: hydrated.isActive,
    };
  }
  return hydrated[sectionKey];
};

export const pickAllSectionsDraft = (hydrated) => ({
  basic: pickSectionDraft(hydrated, "basic"),
  files: hydrated.files,
  socials: hydrated.socials,
  website: hydrated.website,
  otherSocials: hydrated.otherSocials,
  inventoryIntegrations: hydrated.inventoryIntegrations,
  salesIntegration: hydrated.salesIntegration,
  legal: hydrated.legal,
  relations: hydrated.relations,
});

const isDeeplyEmpty = (value) => {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object")
    return Object.values(value).every(isDeeplyEmpty);
  return false;
};

export const isSectionEmpty = (brand, sectionKey) => {
  if (!brand) return true;

  const hydrated = hydrateBrandForm(brand);
  if (sectionKey === "basic") {
    return (
      !hydrated.name.value &&
      !hydrated.tagline.value &&
      hydrated.isActive === undefined
    );
  }

  return isDeeplyEmpty(hydrated?.[sectionKey]);
};
