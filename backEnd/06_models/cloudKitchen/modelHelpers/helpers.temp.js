import mongoose from "mongoose";
import { CLOUD_STORAGE_PROVIDERS } from "../../../05_constants/cloudStorageProviders.js";

const getNewAuditFieldsSchema = () => ({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deletedAt: { type: Date },
  isDeleted: { type: Boolean },
  deletedReason: { type: String },
  isActive: { type: Boolean, default: true },
});

const getCoordinateSchema = () => {
  return new mongoose.Schema(
    {
      lat: { type: Number },
      lng: { type: Number },
    },
    { _id: false },
  );
};
const AUDIT = getNewAuditFieldsSchema();

const getCustomerContactSchema = (fields) =>
  fields.reduce((acc, field) => {
    acc[field] = new mongoose.Schema(
      {
        value: { type: String },
        verified: { type: Boolean, default: false },
        verifiedAt: { type: Date },
        verifiedSource: { type: String },
      },
      { _id: false },
    );
    return acc;
  }, {});

const getBranchContactSchema = (fields) =>
  fields.reduce((acc, field) => {
    acc[field] = new mongoose.Schema(
      {
        name: { type: String },
        phone: { type: String },
        whatsApp: { type: String },
        telegram: { type: String },
        email: { type: String },
      },
      { _id: false },
    );
    return acc;
  }, {});

const getDescriptionSchema = () => {
  return new mongoose.Schema(
    {
      value: { type: String },
      short: { type: String },
      long: { type: String },
    },
    { _id: false },
  );
};

const getCloudStorageSchema = () => {
  return new mongoose.Schema(
    {
      isDefault: { type: Boolean, default: true },
      value: { type: String, enum: CLOUD_STORAGE_PROVIDERS },
    },
    { _id: false },
  );
};
const getLoginCredentialSchema = () => {
  return new mongoose.Schema(
    {
      label: { type: String }, // "Vardges main", "Cashier — Arjan"
      username: { type: String, select: false },
      password: { type: String, select: false },
      email: { type: String, select: false },
      phone: { type: String, select: false },
      loginType: { type: String, enum: ["email", "phone"] },
      belongsTo: {
        name: { type: String },
        employee: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
        },
      },
      accessSites: [
        {
          brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
          branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
        },
      ],
      requiresOtp: { type: Boolean, default: false },
      notes: { type: String },
    },
    { _id: false },
  );
};

const getGeneralFilesSchema = () => {
  return new mongoose.Schema(
    {
      url: { type: String },
      format: { type: String },
      sizeIn_KB: { type: Number },
      description: getDescriptionSchema(),
      notes: { type: String },
      ref: { type: mongoose.Schema.Types.ObjectId },
      usedIn: {
        type: String,
        enum: [
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
          // etc... I will Add all the necessary ones later on
        ],
      },
      title: { type: String },
      ...AUDIT,
    },
    { _id: false },
  );
};

const getStorageSchema = () => {
  return new mongoose.Schema(
    {
      cloudStorage: getCloudStorageSchema(),
      items: [getGeneralFilesSchema()],
    },
    { _id: false },
  );
};

const socialAccountSchema = () => {
  return new mongoose.Schema(
    {
      isActive: { type: Boolean, default: true },
      link: { type: String },
      consoleLink: { type: String },
      name: {
        type: String,
        enum: [
          "instagram",
          "facebook",
          "tikTok",
          "linkedIn",
          "youtube",
          "twitter",
          "other",
        ],
      },
      notes: { type: String },
    },
    { _id: false },
  );
};

const registeredInSchema = () => {
  return new mongoose.Schema(
    {
      country: { type: String },
      city: { type: String },
      emirate: { type: String },
      hasTradeLicense: { type: Boolean },
      hasVATCertificate: { type: Boolean },
      hasTradeMark: { type: Boolean },
      dateOfRegistration: { type: Date },
    },
    { _id: false },
  );
};

const getDocSchema = () => {
  return new mongoose.Schema(
    {
      number: { type: String },
      issuedDate: { type: Date },
      expiryDate: { type: Date },
      issuedBy: { type: String },
      notes: { type: String },
    },
    { _id: false },
  );
};

const getWarrantySchema = () => {
  return new mongoose.Schema(
    {
      hasWarranty: { type: Boolean },
      startsAt: { type: Date },
      endsAt: { type: Date },
      provider: { type: String },
      file: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    },
    { _id: false },
  );
};

const getBranchLocationSchema = () => {
  return new mongoose.Schema(
    {
      label: { type: String },
      country: { type: String },
      emirate: { type: String },
      state: { type: String },
      city: { type: String },
      coordinates: getCoordinateSchema(),
      coverageAreas: [
        {
          label: {
            type: String,
            enum: ["normal", "peak", "weekend", "ramadan", "other"],
          },
          kind: { type: String, enum: ["distance", "driveTime"] },
          polygon: [getCoordinateSchema()],
          radius: {
            value: { type: Number }, // km if kind=distance, minutes if kind=driveTime
            center: getCoordinateSchema(),
          },
          notes: { type: String },
        },
      ],
    },
    { _id: false },
  );
};

const getLifecycleSchema = () => {
  return new mongoose.Schema(
    {
      startAt: { type: Date, default: Date.now },
      restartedAt: { type: Date },
      endAt: { type: Date },
    },
    { _id: false },
  );
};

const getPlatformsSchema = () => {
  return new mongoose.Schema(
    {
      platform: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalesPlatform",
      },
      storeUrl: { type: String },
      lifecycle: getLifecycleSchema(),

      operatingHours: {
        is24Hours: { type: Boolean, default: false },
        openingTime: { type: String }, // "07:00"
        closingTime: { type: String }, // "23:00"
        closedDays: [{ type: String }], // ["friday"] etc., if applicable
      },

      marketingNotes: {
        avgRating: { type: Number },
        reviewCount: { type: Number },
        isFreeDelivery: { type: Boolean },
        minOrder: { type: Number },
        advertising: {
          hasBanners: { type: Boolean },
          hasCpc: { type: Boolean },
        },
        campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }],
      },

      lastCheckedAt: { type: Date },
      notes: { type: String },
    },
    { _id: false },
  );
};

const getKAMSchema = () => {
  return new mongoose.Schema(
    {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      whatsApp: { type: String },
      hours: { type: String },
      telegram: { type: String },
      notes: { type: String },
    },
    { _id: false },
  );
};

const getPlatformSupportSchema = () => {
  return new mongoose.Schema(
    {
      label: { type: String }, // "general", "billing", "technical"
      email: { type: String },
      phone: { type: String },
      whatsApp: { type: String },
      hours: { type: String },
    },
    { _id: false },
  );
};

const COMPETITOR_OBSERVATIONS_TAGS = [
  "pricing",
  "menu-change",
  "expansion",
  "marketing",
  "other",
];

const getObservationsSchema = () => {
  return new mongoose.Schema(
    {
      date: { type: Date },
      note: { type: String },
      addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      tags: [{ type: String, enum: COMPETITOR_OBSERVATIONS_TAGS }],
    },
    { timestamps: true, _id: false },
  );
};

const EQUIPMENT_CATEGORIES = [
  "cooking", // oven, fryer, stove, grill
  "refrigeration", // fridge, freezer, walk-in
  "preparation", // mixer, slicer, food processor
  "storage", // shelving, racks
  "cleaning", // dishwasher, sink
  "it", // POS terminal, printer, router
  "furniture",
  "hvac",
  "other",
];

const EQUIPMENT_STATUSES = [
  "operational",
  "under-repair",
  "out-of-service",
  "decommissioned",
  "lost",
  "sold",
];

const SOCIAL_MEDIA_LABELS = [
  "facebook",
  "instagram",
  "linkedIn",
  "twitter",
  "tiktok",
  "youtube",
  "other",
];

const EMPLOYEE_STATUSES = [
  "employed",
  "onProbation",
  "terminated",
  "resigned",
  "onNoticePeriod",
];

const LEGAL_DOCS_TYPES = [
  "passport",
  "emiratesId",
  "laborCard",
  "medicalFitness",
  "foodHandlerCert",
  "healthCard",
];

const EMPLOYMENT_POSITION_HISTORY_CHANGE_TYPES = [
  "promotion",
  "demotion",
  "lateral",
  "initial",
];

const STORE_ID_SOURCES = [
  "aggregator",
  "sales-integrator",
  "inventory-integrator",
  "website",
];

const STORE_STATUSES = [
  "queued", // A: required, not started yet
  "skipped", // B: intentionally not pursuing
  "onboarding", // C: actively setting up
  "live", // D: operational
  "paused", // H: your decision to pause
  "maintenance", // G: platform-side issue
  "terminated-temporary", // F: dead for now, may resume
  "terminated-permanent", // E: dead forever
];

const EXCLUDED_MENU_ITEM_REASONS = [
  "out-of-stock",
  "not-supported",
  "regulatory",
  "other",
];

const CUISINE_TYPES = [
  "cuisine",
  "category",
  "dietary",
  "mealType",
  "dessert",
  "beverage",
  "other",
];

const PLATFORMS = [
  "talabat",
  "deliveroo",
  "noon",
  "careem",
  "keeta",
  "restHero",
];

const AD_BASES = [
  "fixed",
  "percent-of-net-sales",
  "per-click",
  "per-impression",
  "per-order",
  "negotiated",
];

const CAMPAIGN_KINDS = [
  "percentage", // 50% off, optionally capped
  "fixed-amount", // 10 AED off
  "free-delivery",
  "bogo", // buy-one-get-one
  "bundle", // combo deal
  "voucher", // code-based
  "commission-uplift",
  "other",
];

const VALUE_TYPES = [
  "percentage",
  "fixed-amount",
  "free-item",
  "free-delivery",
];

const UNIFORM_SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];
const CONTACT_LABELS = ["phone", "whatsApp", "telegram", "email"];
const LANGUAGE_LEVELS = ["native", "fluent", "intermediate", "basic"];
const SALARY_PAYMENT_METHODS = ["bank-transfer", "cash", "cheque"];
const BRAND_PRICE_RANGES = ["budget", "mid", "premium"];
const CUISINE_TAG_SOURCES = ["scraped", "KAM", "manual", "other"];
const CUSTOMER_CONTACT_FIELDS = ["phone", "whatsApp", "telegram", "email"];
const AD_KINDS = ["cpc", "banner", "other"];
const AD_SOURCES = ["platform-report", "manual", "scraped"];
const CAMPAIGN_STATUSES = ["draft", "active", "paused", "ended"];
const CAMPAIGN_SOURCES = ["platform-defined", "self-opted", "manual"];
const RATING_SOURCES = ["manual", "scraped", "imported", "api"];
const REPLY_VISIBILITY = ["public", "private"];
const ITEM_FEEDBACK_SENTIMENTS = ["liked", "disliked", "mentioned"];
const INTEGRATION_KINDS = ["inventory", "sales-manager", "other"];
const INTEGRATION_STATUSES = ["onboarding", "active", "paused", "terminated"];
const PAYMENT_CYCLES = ["one-time", "monthly", "yearly", "other"];
const PAYMENT_STATUSES = ["paid", "due", "overdue"];
const PAYMENT_METHODS = ["bank-transfer", "card", "cash", "cheque", "other"];
const MAINTENANCE_STATUSES = ["upcoming", "in-progress", "completed"];
export {
  getNewAuditFieldsSchema,
  getCustomerContactSchema,
  getCoordinateSchema,
  getBranchContactSchema,
  getGeneralFilesSchema,
  socialAccountSchema,
  registeredInSchema,
  getDescriptionSchema,
  getCloudStorageSchema,
  getDocSchema,
  getWarrantySchema,
  getBranchLocationSchema,
  getStorageSchema,
  getPlatformsSchema,
  getObservationsSchema,
  getLoginCredentialSchema,
  getLifecycleSchema,
  getKAMSchema,
  getPlatformSupportSchema,
  //--------------------------------------------------------
  INTEGRATION_KINDS,
  INTEGRATION_STATUSES,
  PAYMENT_CYCLES,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  MAINTENANCE_STATUSES,
  RATING_SOURCES,
  REPLY_VISIBILITY,
  ITEM_FEEDBACK_SENTIMENTS,
  AD_KINDS,
  AD_BASES,
  AD_SOURCES,
  CAMPAIGN_KINDS,
  CAMPAIGN_STATUSES,
  CAMPAIGN_SOURCES,
  VALUE_TYPES,
  STORE_ID_SOURCES,
  STORE_STATUSES,
  EXCLUDED_MENU_ITEM_REASONS,
  CUSTOMER_CONTACT_FIELDS,
  CUISINE_TYPES,
  PLATFORMS,
  CUISINE_TAG_SOURCES,
  AUDIT,
  SOCIAL_MEDIA_LABELS,
  EMPLOYEE_STATUSES,
  LEGAL_DOCS_TYPES,
  EMPLOYMENT_POSITION_HISTORY_CHANGE_TYPES,
  UNIFORM_SIZES,
  CONTACT_LABELS,
  LANGUAGE_LEVELS,
  SALARY_PAYMENT_METHODS,
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_STATUSES,
  BRAND_PRICE_RANGES,
  COMPETITOR_OBSERVATIONS_TAGS,
};
