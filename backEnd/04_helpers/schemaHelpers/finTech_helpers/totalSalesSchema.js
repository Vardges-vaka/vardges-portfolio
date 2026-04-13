import mongoose from "mongoose";
import { getSalesSchema } from "./rootSalesSchema.js";

export const getTotalSalesSchema = () => {
  return new mongoose.Schema(
    {
      branches: getSalesSchema(),
      brands: getSalesSchema(),
      partners: getSalesSchema(),
    },
    { _id: false },
  );
};
