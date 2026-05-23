import mongoose from "mongoose";
import {
  getSoftDeleteSchema,
  getAuditFieldsSchema,
} from "../../04_helpers/helpers.index.js";

const refundSchema = new mongoose.Schema(
  {
    // the fields
  },
  { timestamps: true },
);

const Refund = mongoose.model("Refund", refundSchema);

export default Refund;
