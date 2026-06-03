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

const BRAND_PRICE_RANGES = ["budget", "mid", "premium"];

const DFLT_F_D_CHANNEL = {};
const DFLT_F_D_CHANNEL_FULL = {};
const DFLT_F_D_CUISINE_TAG = {};
const DFLT_F_D_CUISINE_TAG_FULL = {};
const DFLT_F_D_SALES_PLATFORM = {};
const DFLT_F_D_SALES_PLATFORM_FULL = {};
const DFLT_F_D_INTEGRATION = {};
const DFLT_F_D_INTEGRATION_FULL = {};
const DFLT_F_D_CONTRACT = {};
const DFLT_F_D_CONTRACT_FULL = {};

export {
  DFLT_F_D_CHANNEL,
  DFLT_F_D_CHANNEL_FULL,
  DFLT_F_D_CUISINE_TAG,
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
};
