import mongoose from "mongoose";
import { CLOUD_STORAGE_PROVIDERS } from "../../../05_constants/cloudStorageProviders.js";

// General-group + cross-cutting schema helpers — Branch, Customer, Employee,
// Equipment, Integration, SalesPlatform, SalesChannel, plus shared infra
// (audit, storage, description, lifecycle) used by every group.
//
// NOTE: getDescriptionSchema & getCloudStorageSchema also exist (with a
// different shape) in cloudKitchen_menu_helpers.js. In the barrel, menu's
// explicit named exports shadow these — resolve before wiring general schemas
// to the shared barrel.

const getNewAuditFieldsSchema = () => ({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deletedAt: { type: Date },
  isDeleted: { type: Boolean },
  deletedReason: { type: String },
  isActive: { type: Boolean, default: true },
});

const AUDIT = getNewAuditFieldsSchema();

const getCoordinateSchema = () => {
  return new mongoose.Schema(
    {
      lat: { type: Number },
      lng: { type: Number },
    },
    { _id: false },
  );
};

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

export {
  getNewAuditFieldsSchema,
  AUDIT,
  getCoordinateSchema,
  getDescriptionSchema,
  getCloudStorageSchema,
  getCustomerContactSchema,
  getBranchContactSchema,
  getLoginCredentialSchema,
  getGeneralFilesSchema,
  getStorageSchema,
  getDocSchema,
  getWarrantySchema,
  getBranchLocationSchema,
  getLifecycleSchema,
  getPlatformsSchema,
  getKAMSchema,
  getPlatformSupportSchema,
};
