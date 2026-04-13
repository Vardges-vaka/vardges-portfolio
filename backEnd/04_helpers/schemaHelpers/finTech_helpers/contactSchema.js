import mongoose from "mongoose";

export const getContactSchema = () => {
  return new mongoose.Schema(
    {
      name: { type: String },
      position: { type: String },
      phone: { type: String },
      email: { type: String },
      whatsapp: { type: String },
    },
    { _id: false },
  );
};
