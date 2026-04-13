import mongoose from "mongoose";
import { weekDays, months } from "./finTech_CONST.js";

export const getTimingSchema = () => {
  return new mongoose.Schema(
    {
      weekDay: { type: String, required: true, enum: weekDays },
      date: { type: Number, required: true, min: 1, max: 31 },
      month: { type: String, required: true, enum: months },
      year: { type: Number, required: true, min: 2021, max: 2050 },
    },
    { _id: false },
  );
};
