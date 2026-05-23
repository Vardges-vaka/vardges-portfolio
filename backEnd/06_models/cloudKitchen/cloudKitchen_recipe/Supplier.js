import mongoose from "mongoose";
import { AUDIT } from "../modelHelpers/.temp.index.js";
const supplierSchema = new mongoose.Schema(
  {
    name: {
      label: { type: String },
      legalname: { type: String },
    },
    contact: {
      email: { type: String },
      whatsApp: { type: String },
      telegram: { type: String },
      phone: { type: String },
    },
    KAM: {
      name: { type: String },
      email: { type: String },
      whatsApp: { type: String },
      telegram: { type: String },
      phone: { type: String },
    },
    socials: {
      instagram: { type: String },
      facebook: { type: String },
      tikTok: { type: String },
      linkedIn: { type: String },
      youtube: { type: String },
      twitter: { type: String },
    },
    address: {
      country: { type: String },
      emirate: { type: String },
      city: { type: String },
      area: { type: String },
      street: { type: String },
      buildingName: { type: String },
      unitNumber: { type: String },
      landmark: { type: String },
      googlePlaceId: { type: String },
      mapLink: { type: String },
      location: {
        type: { type: String },
        coordinates: [
          {
            lat: { type: Number },
            lng: { type: Number },
          },
        ],
      },
    },
    files: {
      logo: { type: String },
      other: [{ ref: { type: String }, value: { type: String } }],
      invoices: [
        {
          ref: { type: String },
          value: { type: String },
          date: { type: Date },
          status: { type: String },
          amount: { type: Number },
          paymentStatus: { type: String },
          paymentDate: { type: Date },
        },
      ],
    },
    paymentMethod: { type: String },
    paymentDate: { type: String },
    credit: {
      isAvailable: { type: Boolean },
      amount: { type: Number },
    },
    operations: {
      workingdays: [{}],
      workingHours: {
        from: { type: String },
        to: { type: String },
      },
      offDays: [{ type: String }],
      deliveyTiming: {
        from: { type: Number },
        to: { type: Number },
      },
      lastDeliveryTime: { type: String },
    },
    notes: { type: String },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
