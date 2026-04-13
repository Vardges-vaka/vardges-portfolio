import mongoose from "mongoose";

import {
  getTimingSchema,
  getBranchesSchema,
  getTotalSalesSchema,
} from "../../04_helpers/schemaHelpers/_schemaHelpers.index";

const dailySalesSchema = new mongoose.Schema(
  {
    timing: getTimingSchema(),
    branches: getBranchesSchema(),
    totals: getTotalSalesSchema(),
  },
  { timestamps: true },
);

const DailySales = mongoose.model("DailySales", dailySalesSchema);

export default DailySales;
