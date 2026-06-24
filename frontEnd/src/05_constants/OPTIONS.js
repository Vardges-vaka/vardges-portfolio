import {
  GrabTech_Logo,
  Sapaad_Logo,
  Supy_Logo,
  UrbanPiper_Logo,
  Careem_logo,
  Deliveroo_logo,
  Keeta_logo,
  Noon_logo,
  Talabat_logo,
  RestHero_Logo,
  AWS_logo,
  CFLR_logo,
  GCS_logo,
  MSFT_logo,
} from "../00_assets/_assets.index.js";

const CLOUD_STORAGE_PROVIDERS = [
  { value: "s3", label: "Amazon S3", logo: AWS_logo },
  { value: "gcs", label: "Google Cloud Storage", logo: GCS_logo },
  { value: "r2", label: "Cloudflare R2", logo: CFLR_logo },
  { value: "blob", label: "Azure Blob Storage", logo: MSFT_logo },
];

const INTEGRATION_OPTIONS = [
  { value: "grabTech", label: "GrabTech", logo: GrabTech_Logo },
  { value: "sapaad", label: "Sapaad", logo: Sapaad_Logo },
  { value: "supy", label: "Supy", logo: Supy_Logo },
  { value: "urbanPiper", label: "UrbanPiper", logo: UrbanPiper_Logo },
];

const AGGREGATOR_OPTIONS = [
  { value: "talabat", label: "Talabat", logo: Talabat_logo },
  { value: "deliveroo", label: "Deliveroo", logo: Deliveroo_logo },
  { value: "noon", label: "Noon", logo: Noon_logo },
  { value: "careem", label: "Careem", logo: Careem_logo },
  { value: "keeta", label: "Keeta", logo: Keeta_logo },
  { value: "restHero", label: "RestHero", logo: RestHero_Logo },
];

const INTEGRATION_KINDS = ["inventory", "sales-manager", "other"];
const INTEGRATION_STATUSES = ["onboarding", "active", "paused", "terminated"];
const MAINTENANCE_STATUSES = ["upcoming", "in-progress", "completed"];

const PAYMENT_CYCLES = ["one-time", "monthly", "yearly", "other"];
const PAYMENT_STATUSES = ["paid", "due", "overdue"];
const PAYMENT_METHODS = ["bank-transfer", "card", "cash", "cheque", "other"];
const LOGIN_TYPES = ["email", "phone"];

const FILES_USED_IN = [
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

export { CLOUD_STORAGE_PROVIDERS, INTEGRATION_OPTIONS, AGGREGATOR_OPTIONS };
