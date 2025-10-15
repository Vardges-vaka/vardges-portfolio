import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String },
    password: { type: String },
    role: { type: String },
    CV: {
      resume: { type: mongoose.Schema.Types.ObjectId, ref: "CV" },
      reference: { type: String },
    },
    projects: [
      {
        reference: { type: String },
        project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
      },
    ],
    brands: [
      {
        reference: { type: String },
        brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
      },
    ],

    contact: {
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      website: { type: String },
      socials: [
        {
          name: { type: String },
          link: { type: String },
          isActive: { type: Boolean, default: true },
        },
      ],
      isActive: { type: Boolean, default: true },
    },

    health: {},
    wardrobe: {},
    passwords: {},
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
