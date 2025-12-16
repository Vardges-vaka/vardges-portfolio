import mongoose from "mongoose";

const multilingualTextSchema = (required = true) => {
  return new mongoose.Schema(
    {
      en: { type: String, required: required }, // English
      ru: { type: String, required: required }, // Russian
      hy: { type: String, required: required }, // Armenian
      ar: { type: String, required: required }, // Arabic
    },
    { _id: false }
  );
};

export default multilingualTextSchema;
