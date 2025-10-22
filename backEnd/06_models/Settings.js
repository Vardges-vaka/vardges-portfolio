import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
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
    storage: {
      s3: { type: Boolean, default: true },
      local: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
