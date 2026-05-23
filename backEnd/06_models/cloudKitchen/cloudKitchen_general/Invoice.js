import mongoose from "mongoose";
import { AUDIT } from "../modelHelpers/.temp.index.js";

const invoiceSchema = new mongoose.Schema(
  {
    // the fields
  },
  { timestamps: true },
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
