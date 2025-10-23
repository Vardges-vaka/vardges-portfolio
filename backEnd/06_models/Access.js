import mongoose from "mongoose";

const accessSchema = new mongoose.Schema(
  {
    newCodes: {
      guest: {
        type: [String],
        validate: {
          validator: function (arr) {
            return arr.length <= 100;
          },
          message: "Guest codes cannot exceed 100 items",
        },
      },
      user: {
        type: [String],
        validate: {
          validator: function (arr) {
            return arr.length <= 50;
          },
          message: "User codes cannot exceed 50 items",
        },
      },
      admin: {
        type: [String],
        validate: {
          validator: function (arr) {
            return arr.length <= 25;
          },
          message: "Admin codes cannot exceed 25 items",
        },
      },
      superAdmin: {
        type: [String],
        validate: {
          validator: function (arr) {
            return arr.length <= 10;
          },
          message: "SuperAdmin codes cannot exceed 10 items",
        },
      },
    },
    usedCodes: [
      {
        code: { type: String },
        role: { type: String },
        usedAt: { type: Date },
        usedIP: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userAgent: { type: String },
        accountEmail: { type: String },
        accountName: { type: String },
      },
    ],
    blacklist: {
      tokens: { pswReset: [String], logOut: [String] },
      ips: [String],
    },
  },
  { timestamps: true }
);

const Access = mongoose.model("Access", accessSchema);

export default Access;
