import mongoose from "mongoose";
import {
  getCustomerContactSchema,
  CUSTOMER_CONTACT_FIELDS,
  AUDIT,
} from "../modelHelpers/.temp.index.js";

const contactSchema = getCustomerContactSchema(CUSTOMER_CONTACT_FIELDS);

const customerSchema = new mongoose.Schema(
  {
    name: { type: String },
    aliases: [{ type: String }],

    contact: {
      ...contactSchema,
    },

    addresses: [
      {
        raw: { type: String },
        area: { type: String },
        coordinates: { lat: Number, lng: Number },
        lastUsedAt: { type: Date },
      },
    ],

    encounteredOn: [
      {
        platform: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SalesPlatform",
        },
        firstSeenAt: { type: Date },
        lastSeenAt: { type: Date },
      },
    ],

    orderStats: {
      count: { type: Number, default: 0 },
      totalSpent: { type: Number, default: 0 },
      firstOrderAt: { type: Date },
      lastOrderAt: { type: Date },
    },

    complaints: [
      {
        order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        description: { type: String },
        menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
        resolved: { type: Boolean, default: false },
        orderedAt: { type: Date },
        receivedAt: { type: Date },
        notes: { type: String },
      },
    ],

    source: {
      type: String,
      enum: ["scraped-from-order", "manual", "imported"],
      default: "scraped-from-order",
    },

    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
