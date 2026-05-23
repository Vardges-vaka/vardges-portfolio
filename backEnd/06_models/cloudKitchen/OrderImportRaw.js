import mongoose from "mongoose";
import { AUDIT } from "./modelHelpers/.temp.index.js";

const RAW_SOURCES = ["GrabTech", "UrbanPiper", "Sapaad", "manual"];
const RAW_KINDS = ["order-row", "item-row"];

// Backup-only collection.
// Per Q3 decision: keep the raw source-row JSON for parse debugging + recovery,
// but off the Order document so reads stay lean.
const orderImportRawSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },

    source: { type: String, enum: RAW_SOURCES, required: true }, // "GrabTech" etc.
    kind: { type: String, enum: RAW_KINDS, required: true }, // "order-row" or "item-row"

    importedAt: { type: Date, default: Date.now },
    fileRef: { type: String }, // path/name of the export file this row came from
    sheetName: { type: String }, // "OrderDetails" / "OrderItemsSales" / "Sheet1"
    rowIndex: { type: Number }, // row number in the source sheet

    raw: { type: mongoose.Schema.Types.Mixed, required: true }, // the original row as JSON

    notes: { type: String },
    ...AUDIT,
  },
  { timestamps: true },
);

// Lookup raw rows for a given Order
orderImportRawSchema.index({ order: 1 });
// "Show me everything I imported from this file"
orderImportRawSchema.index({ source: 1, fileRef: 1 });

const OrderImportRaw = mongoose.model("OrderImportRaw", orderImportRawSchema);

export default OrderImportRaw;
