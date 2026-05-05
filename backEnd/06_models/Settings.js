import mongoose from "mongoose";

const getStorageSchema = () => {
  return new mongoose.Schema(
    {
      isEnabled: { type: Boolean, default: false },
      // Logo + vendor console URLs — filled when you wire provisioning UI.
      logo: { type: String, default: "" },
      consoleUrl: { type: String, default: "" },
      isDefault: { type: Boolean, default: false },
      customExpTime: { type: Boolean, default: false },
    },
    { _id: false, timestamps: false },
  );
};
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
      s3: getStorageSchema(),
      gcs: getStorageSchema(),
      r2: getStorageSchema(),
      blob: getStorageSchema(),
    },
  },
  { timestamps: true },
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
/*

*/
