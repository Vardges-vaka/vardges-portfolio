import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    languages: {
      english: { type: Boolean, default: true },
      arabic: { type: Boolean, default: false },
      russian: { type: Boolean, default: false },
      armenian: { type: Boolean, default: false },
    },
    emailEngines: {
      sendGrid: { type: Boolean, default: true },
      amazonSES: { type: Boolean, default: false },
      nodeMailer: { type: Boolean, default: false },
    },
    accessControl: {
      accessCodes: [
        {
          code: { type: String },
          usedAt: { type: String },
          usedIP: { type: String },
        },
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
