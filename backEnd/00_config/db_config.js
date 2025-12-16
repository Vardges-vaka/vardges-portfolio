import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

export const CLOUD_STORAGES = {
  ENUM: ["AWS S3", "google", "microsoft"],
  CONFIGS: [
    {
      name: "AWS S3",
      url: process.env.AWS_S3_URL,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  ],
};
export const connectDB = async () => {
  await mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("✅ 💾 📡 [MONGO_DB] 🔗 Connected");
    })
    .catch((err) => {
      console.error("❌ ❌ ❌ [MONGO_DB] Connection Error:", err);
    });
};
