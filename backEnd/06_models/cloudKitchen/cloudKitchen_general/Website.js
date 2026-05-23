import mongoose from "mongoose";
import {
  getSoftDeleteSchema,
  getAuditFieldsSchema,
} from "../../../04_helpers/helpers.index.js";

const websiteSchema = new mongoose.Schema(
  {
    // the fields
  },
  { timestamps: true },
);

const Website = mongoose.model("Website", websiteSchema);

export default Website;
