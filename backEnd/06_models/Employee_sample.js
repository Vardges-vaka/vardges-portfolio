import mongoose from "mongoose";

// ─── Reusable sub-schemas ─────────────────────────────────────────────────────

/**
 * Standard legal-document shape.
 * Used for: passport, emiratesId, laborCard, medicalFitness, foodHandlerCert, healthCard.
 * `withNumber` controls whether a document number field is included.
 */
const docSchema = (withNumber = true) =>
  new mongoose.Schema(
    {
      ...(withNumber ? { number: { type: String } } : {}),
      issuedDate: { type: Date },
      expiryDate: { type: Date },
      issuedBy: { type: String },
      file: {
        ref: { type: String }, // cloud storage provider id
        value: { type: String }, // objectKey or signed URL
      },
      notes: { type: String },
    },
    { _id: false },
  );

/**
 * Salary component (basic, housing, transport, other).
 * Tracks the current amount + a lightweight change log so you never lose history.
 * `withName` adds a required name field (used for "other allowances" entries).
 */
const salaryComponentSchema = (withName = false) =>
  new mongoose.Schema(
    {
      ...(withName ? { name: { type: String, required: true } } : {}),
      amount: { type: Number, default: 0 },
      effectiveDate: { type: Date },
      history: [
        {
          amount: { type: Number },
          changedOn: { type: Date },
          reason: { type: String }, // "increment", "promotion", "correction"
          notes: { type: String },
        },
      ],
    },
    { _id: false },
  );

// ─── Main schema ──────────────────────────────────────────────────────────────

const employeeSchema = new mongoose.Schema(
  {
    // ── Identity ──────────────────────────────────────────────────────────────
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      legalFullName: { type: String }, // as on passport / ID
      preferredName: { type: String }, // what they go by day-to-day
    },
    gender: {
      type: String,
      enum: ["male", "female", "preferNotToSay"],
    },
    dateOfBirth: { type: Date },
    nationality: { type: String }, // e.g. "Indian", "Filipino", "Egyptian"

    // ── Contact ───────────────────────────────────────────────────────────────
    contact: {
      phone: { type: String },
      whatsApp: { type: String },
      telegram: { type: String },
      email: { type: String },
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    emergencyContact: {
      name: { type: String },
      relationship: { type: String },
      phone: { type: String },
      whatsApp: { type: String },
      email: { type: String },
      city: { type: String },
      country: { type: String },
    },
    socialMedia: {
      facebook: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      tiktok: { type: String },
    },
    languages: [
      {
        language: { type: String },
        level: {
          type: String,
          enum: ["native", "fluent", "intermediate", "basic"],
        },
      },
    ],

    // ── Employment ────────────────────────────────────────────────────────────
    joiningDate: { type: Date },
    contractType: {
      type: String,
      enum: ["full-time", "part-time", "freelance", "contract", "trainee"],
    },
    status: {
      isEmployed: { type: Boolean, default: true },
      isOnProbation: { type: Boolean, default: false },
      probationEndDate: { type: Date },

      isTerminated: { type: Boolean, default: false },
      terminationDate: { type: Date },
      terminationReason: { type: String },

      isResigned: { type: Boolean, default: false },
      resignationDate: { type: Date },
      resignationReason: { type: String },

      isOnNoticePeriod: { type: Boolean, default: false },
      noticePeriodStartDate: { type: Date },
      noticePeriodEndDate: { type: Date },
    },

    // Position / role — stores current title + a history log of role changes
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
            enum: ["promotion", "demotion", "lateral", "initial"],
          },
          notes: { type: String },
        },
      ],
    },

    // ── Salary ────────────────────────────────────────────────────────────────
    salary: {
      currency: { type: String, default: "AED" },
      basic: salaryComponentSchema(),
      housingAllowance: salaryComponentSchema(),
      transportAllowance: salaryComponentSchema(),
      otherAllowances: [salaryComponentSchema(true)], // array — each has a name

      // Computed / cached totals (update these when any component changes)
      totalFixed: { type: Number }, // basic + housing + transport
      totalAllowances: { type: Number }, // sum of otherAllowances
      totalSalary: { type: Number }, // everything before deductions

      // UAE WPS (Wage Protection System) banking details
      paymentMethod: {
        type: String,
        enum: ["bank-transfer", "cash", "cheque"],
        default: "bank-transfer",
      },
      bank: {
        bankName: { type: String },
        accountName: { type: String },
        iban: { type: String },
        accountNumber: { type: String },
      },

      deductions: [
        {
          amount: { type: Number },
          description: { type: String },
          date: { type: Date },
          notes: { type: String },
        },
      ],
    },

    // ── Legal Documents (UAE / Dubai F&B compliance) ───────────────────────────
    legal: {
      passport: docSchema(true),
      emiratesId: docSchema(true),

      // Visa has all standard doc fields + extra UAE-specific ones
      visa: new mongoose.Schema(
        {
          number: { type: String },
          issuedDate: { type: Date },
          expiryDate: { type: Date },
          issuedBy: { type: String },
          file: { ref: { type: String }, value: { type: String } },
          notes: { type: String },
          // Visa-specific:
          visaType: {
            type: String,
            enum: ["employment", "resident", "visit", "freelance"],
          },
          sponsor: { type: String }, // sponsoring company or individual
          entryType: { type: String, enum: ["single", "multiple"] },
        },
        { _id: false },
      ),

      laborCard: docSchema(true), // MOHRE labor card

      // Dubai Municipality / food-safety compliance docs:
      medicalFitness: docSchema(false), // MOH annual medical fitness certificate
      foodHandlerCert: docSchema(false), // Dubai Municipality food handler cert
      healthCard: docSchema(false), // required in certain emirates
    },

    // ── Attendance & Leave ────────────────────────────────────────────────────
    attendance: {
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
        totalEntitled: { type: Number, default: 30 }, // UAE Labour Law: 30 days/year
        remaining: { type: Number, default: 30 },
        used: { type: Number, default: 0 },
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
            // How was the extra day compensated?
            compensationType: {
              type: String,
              enum: ["paid", "dayOff", "none"],
            },
            compensationAmount: { type: Number },
          },
        ],
      },
    },

    // ── Certifications & Training ─────────────────────────────────────────────
    certifications: [
      {
        name: { type: String },
        issuer: { type: String },
        issuedDate: { type: Date },
        expiryDate: { type: Date },
        credentialId: { type: String },
        file: {
          ref: { type: String },
          value: { type: String },
        },
        notes: { type: String },
      },
    ],

    // ── Uniform ───────────────────────────────────────────────────────────────
    uniform: {
      sizes: {
        top: { type: String },
        bottom: { type: String },
        shoes: { type: String },
      },
      issued: [
        {
          item: { type: String }, // "T-shirt", "Cap", "Apron"
          quantity: { type: Number, default: 1 },
          issuedDate: { type: Date },
          returnedDate: { type: Date },
          notes: { type: String },
        },
      ],
    },

    // ── Files & Media ─────────────────────────────────────────────────────────
    profilePhoto: {
      ref: { type: String },
      value: { type: String },
    },
    resume: {
      format: { type: String }, // "pdf", "docx"
      ref: { type: String },
      value: { type: String },
    },
    images: [{ type: String }], // general images (workplace, ID copy scans etc.)

    // ── Employee relations (same company) ─────────────────────────────────────
    // Tracks when two employees are related — useful for conflict-of-interest policies.
    relatedTo: [
      {
        employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
        relation: { type: String }, // "sibling", "spouse", "cousin", "friend"
      },
    ],

    // ── Org / assignment refs ─────────────────────────────────────────────────
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    associatedBrands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],

    notes: { type: String },
  },
  { timestamps: true },
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
