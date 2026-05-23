import mongoose from "mongoose";
import { AUDIT } from "../modelHelpers/.temp.index.js";

const storeSchema = new mongoose.Schema(
  {
    // the fields
  },
  { timestamps: true },
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
