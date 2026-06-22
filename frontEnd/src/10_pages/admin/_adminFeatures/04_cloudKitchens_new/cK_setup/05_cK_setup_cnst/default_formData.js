const DFLT_F_D_BRAND_INITIAL = {
  name: "",
  tagline: {
    value: "",
  },
  description: {
    value: "",
  },
  priceRange: "",
  registeredIn: {
    country: "",
    city: "",
    emirate: "",
  },
};
const DFLT_F_D_BRAND_FULL = {
  name: "",
  tagline: {
    value: "",
    translations: {
      ar: "",
      ru: "",
      en: "",
    },
  },
  registeredIn: {
    country: "",
    city: "",
    emirate: "",
    hasTradeLicense: true,
    hasVATCertificate: true,
    hasTradeMark: true,
    dateOfRegistration: "",
  },
  description: {
    value: "",
    short: "",
    long: "",
  },
  priceRange: "",
  socials: [
    {
      isActive: true,
      link: "",
      consoleLink: "",
      name: "",
      notes: "",
    },
  ],
  cuisineTags: [],
  website: null,
  contracts: [],
  integrations: [],
  siblings: [],
  employees: [],
  equipments: [],
  branches: [],
  menus: [],
  competitors: [],
  // Next step
  // files: {},
};
const DFLT_F_D_FILES = {
  cloudStorage: {
    isDefault: true,
    value: "",
  },
  items: [
    {
      url: "",
      format: "",
      sizeIn_KB: "",
      description: {
        value: "",
        short: "",
        long: "",
      },
      notes: "",
      ref: "",
      usedIn: [],
      title: "",
    },
  ],
};

const socialAccountSchema_name_enum = [
  "instagram",
  "facebook",
  "tikTok",
  "linkedIn",
  "youtube",
  "twitter",
  "other",
];

const FILES_USED_IN_ENUM_VALUES = [
  "internal",
  "aggrigator",
  "website",
  "inApp",
  "socials",
  "google",
  "legal",
  "branding",
  "menus",
  "recipe",
  "miscellaneous",
  "packaging",
  "other",
];

const FILES_USED_IN_OPTIONS = FILES_USED_IN_ENUM_VALUES.map((value) => ({
  value,
  label: value,
}));

const BRAND_PRICE_RANGES = ["budget", "mid", "premium"];

// ── CuisineTag ─────────────────────────────────────────────
const DFLT_F_D_CUISINE_TAG_FULL = {
  value: "",
  label: "",
  description: "",
  platforms: [],
  kind: "",
  source: "",
};

// ── SalesPlatform ──────────────────────────────────────────
const DFLT_F_D_SALES_PLATFORM = {
  name: "",
  notes: "",
};
const DFLT_F_D_SALES_PLATFORM_FULL = {
  name: "",
  notes: "",
  links: {
    logoUrl: "",
    websiteUrl: "",
    partnerPortalUrl: "",
    other: [],
  },
  kam: {},
  loginCredentials: [],
  support: [],
};

// ── SalesChannel ───────────────────────────────────────────
const DFLT_F_D_CHANNEL = {
  brand: "",
  branch: "",
  platform: "",
  storeUrl: "",
};
const DFLT_F_D_CHANNEL_FULL = {
  brand: "",
  branch: "",
  platform: "",
  storeUrl: "",
  storeIds: [],
  status: { value: "queued" },
  commissionPct: "",
  ratings: { average: "", count: 0 },
  excludedMenuItems: [],
  notes: "",
};

// ── Integration ────────────────────────────────────────────
const DFLT_F_D_INTEGRATION = {
  provider: "",
  kind: "",
  accountLabel: "",
};
const DFLT_F_D_INTEGRATION_FULL = {
  provider: "",
  kind: "",
  accountLabel: "",
  description: "",
  status: "onboarding",
  lifecycle: {},
  links: { websiteUrl: "", portalUrl: "", other: [] },
  payment: {
    cycle: "",
    amount: "",
    currency: "AED",
    method: "",
    status: "",
    notes: "",
  },
  loginCredentials: [],
  kam: {},
  support: [],
  scheduledMaintenances: [],
  brands: [],
  branches: [],
  contract: null,
  notes: "",
};

// ── Contract ───────────────────────────────────────────────
const DFLT_F_D_CONTRACT = {
  title: "",
  kind: "",
  ownerType: "",
  counterparty: { name: "" },
};
const DFLT_F_D_CONTRACT_FULL = {
  title: "",
  description: "",
  kind: "",
  ownerType: "",
  ownerId: "",
  counterparty: { name: "" },
  effectiveFrom: "",
  effectiveTo: "",
  autoRenew: false,
  terminationNoticeDays: { byUs: "", byThem: "" },
  status: "draft",
  commissionPct: "",
  additionalCharges: [],
  commitments: [],
  payment: { amount: "", cycle: "" },
  history: [],
  notes: "",
};

export {
  DFLT_F_D_CHANNEL,
  DFLT_F_D_CHANNEL_FULL,
  DFLT_F_D_CUISINE_TAG_FULL,
  DFLT_F_D_SALES_PLATFORM,
  DFLT_F_D_SALES_PLATFORM_FULL,
  DFLT_F_D_INTEGRATION,
  DFLT_F_D_INTEGRATION_FULL,
  DFLT_F_D_CONTRACT,
  DFLT_F_D_CONTRACT_FULL,
  DFLT_F_D_BRAND_INITIAL,
  DFLT_F_D_BRAND_FULL,
  DFLT_F_D_FILES,
  FILES_USED_IN_OPTIONS,
};
