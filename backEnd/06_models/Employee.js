import mongoose from "mongoose";

const legalDocStandardSchema = new mongoose.Schema(
  {
    status: { type: String },
    expDate: { type: Date },
    file: { type: String },
    notes: { type: String },
  },
  { _id: false },
);

const visaSchema = new mongoose.Schema(
  {
    status: { type: String },
    expDate: { type: Date },
    whatCompanyIsUnder: { type: String },
    file: { type: String },
    notes: { type: String },
  },
  { _id: false },
);

const leavePeriodSchema = new mongoose.Schema(
  { from: { type: Date }, to: { type: Date } },
  { _id: false },
);

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String },
    issuer: { type: String },
    issuedDate: { type: Date },
    expDate: { type: Date },
    file: { type: String },
    notes: { type: String },
  },
  { _id: false },
);

const uniformIssueSchema = new mongoose.Schema(
  {
    item: { type: String },
    date: { type: Date },
    notes: { type: String },
  },
  { _id: false },
);

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    legalFullName: { type: String },
    dateOfBirth: { type: Date },
    joiningDate: { type: Date },
    salary: {
      basic: { type: Number },
      allowances: { type: Number },
      currency: { type: String, default: "AED" },
    },
    annualLeaves: {
      remaining: { type: Number, default: 0 },
      used: {
        qnt: { type: Number, default: 0 },
        dates: [leavePeriodSchema],
      },
    },
    publicHolidaysBalance: { type: Number, default: 0 },
    contact: {
      phone: { type: String },
      whatsApp: { type: String },
      telegram: { type: String },
      email: { type: String },
    },
    legal: {
      visa: visaSchema,
      emiratesId: legalDocStandardSchema,
      medical: legalDocStandardSchema,
      hygieneCert: legalDocStandardSchema,
      healthCard: legalDocStandardSchema,
    },
    certifications: [certificationSchema],
    workingBranch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    associatedBrands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    isActive: { type: Boolean, default: true },
    isResigned: { type: Boolean, default: false },
    isTerminated: { type: Boolean, default: false },
    terminationReason: { type: String },
    images: [{ type: String }],
    uniform: {
      sizes: {
        top: { type: String },
        bottom: { type: String },
        shoes: { type: String },
      },
      issued: [uniformIssueSchema],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Employee", employeeSchema);
