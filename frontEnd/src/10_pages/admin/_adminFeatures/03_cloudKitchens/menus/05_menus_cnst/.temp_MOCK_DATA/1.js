const orderSchemaSample = {
  _id: ObjectId,

  // Identifiers
  uniqueOrderId: { type: String, unique: true, index: true }, // "1218210569568849920"
  orderId: String, // channel/POS order number, e.g. "3471"
  sequenceNumber: Number, // 39
  fortId: String, // optional payment ref

  // Relationships (refs to your existing schemas)
  brand: { type: ObjectId, ref: "Brand", required: true, index: true },
  branch: { type: ObjectId, ref: "Branch", required: true, index: true }, // "Location"
  channel: { type: ObjectId, ref: "SalesChannel", required: true, index: true }, // Deliveroo, Careem, Talabat, Dine-in...
  customer: { type: ObjectId, ref: "Customer" }, // optional — aggregator orders often have no real customer

  // Snapshot of customer (aggregators give partial info)
  customerSnapshot: {
    name: String,
    phone: String,
    address: String,
    vatId: String,
    note: String, // "Customer Note"
  },

  // Order metadata
  type: {
    // "Delivery by food aggregator", "Dine-in", "Pickup"...
    type: String,
    enum: ["aggregator_delivery",  ],
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "preparing",
      "ready",
      "out_for_delivery",
      "delivered",
      "cancelled",
      "refunded",
    ],
    default: "pending",
    index: true,
  },
  receivedAt: { type: Date, required: true, index: true }, // "Received At"
  closedAt: Date,

  // Delivery
  delivery: {
    partnerName: String, // "Deliveroo" (the operator, even if channel = your own app)
    plan: String, // "ASAP" | "Scheduled"
    scheduledFor: Date,
    fee: { type: Number, default: 0 }, // "Delivery"
  },

  // Line items (embedded — fast reads for dashboards/receipts)
  items: [
    {
      menuItem: {
        type: ObjectId,
        ref: "MenuItem",
        required: true,
        index: true,
      },
      externalId: String, // "Menu Item External ID" from POS/aggregator
      name: String, // snapshot name at time of sale
      tags: [String], // "Hot Appetizers", "Salads" — category snapshot
      qty: { type: Number, required: true, min: 1 },
      unitPrice: Number, // "Item Price"
      modifiers: [
        {
          menuItem: { type: ObjectId, ref: "MenuItem" },
          externalId: String,
          name: String,
          price: Number,
        },
      ],
      discount: { type: Number, default: 0 }, // "Item Discount"
      lineTotal: Number, // "Item Total Sales Amount" = qty * unitPrice - discount
    },
  ],

  // Money (all in `currency`)
  currency: { type: String, default: "AED" },
  totals: {
    grossPrice: Number, // before discount, incl. VAT
    discount: { type: Number, default: 0 },
    discountCode: String,
    surcharge: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    channelServiceCharge: { type: Number, default: 0 },
    netSales: Number, // pre-VAT
    vat: Number,
    tips: { type: Number, default: 0 },
    receiptTotal: Number, // what the customer paid
  },

  // Payment
  payment: {
    method: {
      type: String,
      enum: ["prepaid", "cash", "card", "wallet"],
      required: true,
    },
    type: String, // raw value from source if you want to keep it
    paidAt: Date,
  },

  // Free-form
  notes: {
    kitchen: String, // "Note"
    customer: String, // "Customer Note"
  },
  employee: String, // "Employee Name" — or ref a User/Employee collection

  createdAt: Date,
  updatedAt: Date,
};
