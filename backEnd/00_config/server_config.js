import dotenv from "dotenv";

dotenv.config();

export const BACKEND_PORT = parseInt(process.env.PORT, 10) || 4220;

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3210";

export const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "x-language", "language"],
};
