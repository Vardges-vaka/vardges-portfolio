import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

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
