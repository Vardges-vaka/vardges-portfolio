import mongoose from "mongoose";
import {
  getCoordinateSchema,
  getStorageSchema,
  AUDIT,
  getDocSchema,
  SOCIAL_MEDIA_LABELS,
  EMPLOYEE_STATUSES,
  LEGAL_DOCS_TYPES,
  EMPLOYMENT_POSITION_HISTORY_CHANGE_TYPES,
  UNIFORM_SIZES,
  CONTACT_LABELS,
  LANGUAGE_LEVELS,
  SALARY_PAYMENT_METHODS,
} from "../modelHelpers/.temp.index.js";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      preferredName: { type: String, required: true }, // what they go by day-to-day
      firstName: { type: String },
      lastName: { type: String },
      legalFullName: { type: String }, // as on passport / ID
    },
    personalDetails: {
      gender: {
        type: String,
        enum: ["male", "female"],
      },
      dateOfBirth: { type: Date },
      nationality: { type: String },
      holdingPassport: { type: String }, // country of the passport issuer
      emergencyContact: {
        name: { type: String },
        relationship: { type: String },
        phone: { type: String },
        whatsApp: { type: String },
        email: { type: String },
        city: { type: String },
        country: { type: String },
      },
      contact: [
        {
          label: {
            type: String,
            enum: CONTACT_LABELS,
          },
          value: { type: String },
        },
      ],
      socialMedia: [
        {
          label: {
            type: String,
            enum: SOCIAL_MEDIA_LABELS,
          },
          link: { type: String },
        },
      ],
      languages: [
        {
          language: { type: String },
          level: {
            type: String,
            enum: LANGUAGE_LEVELS,
          },
        },
      ],
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
      coordinates: getCoordinateSchema(),
      isShared: { type: Boolean },
      roommates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    },
    files: getStorageSchema(),
    uniform: {
      sizes: {
        top: { type: String, enum: UNIFORM_SIZES },
        bottom: { type: String, enum: UNIFORM_SIZES },
        shoes: { type: String, enum: UNIFORM_SIZES },
      },
      issued: [
        {
          item: { type: String }, // "T-shirt", "Cap", "Apron"
          quantity: { type: Number },
          issuedDate: { type: Date },
          returnedDate: { type: Date },
          notes: { type: String },
        },
      ],
    },
    certifications: [
      {
        name: { type: String },
        issuer: { type: String },
        issuedDate: { type: Date },
        expiryDate: { type: Date },
        credentialId: { type: String },
        notes: { type: String },
      },
    ],
    employmentInfo: {
      status: {
        type: String,
        enum: EMPLOYEE_STATUSES,
        default: "employed",
      },
      joiningDate: { type: Date },
      probationEndDate: { type: Date },
      terminationDate: { type: Date },
      resignationDate: { type: Date },
      noticePeriodStartDate: { type: Date },
      noticePeriodEndDate: { type: Date },
      terminationReason: { type: String },
      resignationReason: { type: String },
      position: {
        title: { type: String },
        department: { type: String },
        description: { type: String },
        history: [
          {
            title: { type: String },
            from: { type: Date },
            to: { type: Date },
            changeType: {
              type: String,
              enum: EMPLOYMENT_POSITION_HISTORY_CHANGE_TYPES,
            },
            notes: { type: String },
          },
        ],
      },
    },
    legalDocs: [
      {
        kind: { type: String, enum: LEGAL_DOCS_TYPES },
        info: getDocSchema(),
      },
    ],
    salary: {
      basic: { type: Number },
      allowances: [{ amount: { type: Number }, name: { type: String } }],
      paymentMethod: {
        type: String,
        enum: SALARY_PAYMENT_METHODS,
      },

      deductions: [
        {
          amount: { type: Number },
          description: { type: String },
          date: { type: Date },
          reason: { type: String },
          notes: { type: String },
        },
      ],
    },

    attendanceInfo: {
      usualDayOff: { type: String }, // e.g. "Friday" or "Tuesday,Wednesday"

      sickDays: [
        {
          from: { type: Date },
          to: { type: Date },
          notes: { type: String },
          hasDocument: { type: Boolean, default: false },
        },
      ],

      annualLeaves: {
        totalEntitled: { type: Number }, // UAE Labour Law: 30 days/year
        remaining: { type: Number },
        used: { type: Number },
        dates: [
          {
            from: { type: Date },
            to: { type: Date },
            notes: { type: String },
            isApproved: { type: Boolean, default: false },
          },
        ],
      },

      publicHolidays: {
        workedDays: [
          {
            date: { type: Date },
            notes: { type: String },
            compensationType: {
              type: String,
              enum: ["paid", "dayOff"],
            },
            compensationAmount: { type: Number },
          },
        ],
      },
    },

    relatedTo: [
      {
        employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
        relation: { type: String },
      },
    ],
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    contracts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract",
      },
    ],
    associatedBrands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
