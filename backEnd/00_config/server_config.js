import dotenv from "dotenv";

dotenv.config();

// export const GLOBAL_SESSION_EXPIRY =
//   parseInt(process.env.GLOBAL_SESSION_EXPIRY, 10) || 3600000;

export const BACKEND_PORT = parseInt(process.env.PORT, 10) || 4220;

export const isProduction = process.env.NODE_ENV === "production";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3210";

export const setCSPHeader = (req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;"
  );
  next();
};
export const corsOptions = {
  origin: FRONTEND_URL, // !important: Frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
