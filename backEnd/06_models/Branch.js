import mongoose from "mongoose";

const coordinateSchema = new mongoose.Schema(
  {
    lat: { type: Number },
    lng: { type: Number },
  },
  { _id: false },
);

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    location: {
      address: { type: String },
      coordinates: coordinateSchema,
    },

    contact: {
      ourSupport: {
        phone: { type: String },
        whatsApp: { type: String },
        email: { type: String },
      },
      manager: {
        name: { type: String },
        phone: { type: String },
        whatsApp: { type: String },
        email: { type: String },
      },
    },

    operations: {
      isActive: { type: Boolean, default: true },
      is24Hours: { type: Boolean, default: false },
      openingTime: { type: String }, // "07:00" HH:mm
      closingTime: { type: String }, // "23:00" HH:mm
      openSince: { type: Date },
      closedSince: { type: Date },
    },

    costs: {
      currency: { type: String, default: "AED" },
      fixed: {
        rent: { type: Number },
        utilities: {
          electricity: { type: Number },
          water: { type: Number },
          gas: { type: Number },
          AC: { type: Number },
        },
      },
      variable: [
        {
          label: { type: String }, // "Sewage", "Pest Control", etc.
          amount: { type: Number },
          date: { type: Date },
          notes: { type: String },
        },
      ],
    },

    contract: {
      duration: {
        start: { type: Date },
        end: { type: Date },
      },
      amount: { type: Number },
      terminationNoticePeriod: { type: Number }, // in days
      file: { type: String }, // file URL
    },

    coverageAreas: {
      byDistance: {
        polygon: [coordinateSchema],
        radius: {
          km: { type: Number },
          center: coordinateSchema,
        },
      },
      byDriveTime: {
        polygon: [coordinateSchema],
        radius: {
          minutes: { type: Number },
          center: coordinateSchema,
        },
      },
    },

    images: [{ type: String }], // image URLs

    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    equipments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],

    notes: { type: String },
  },
  { timestamps: true },
);

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
