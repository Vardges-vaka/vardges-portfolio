import dotenv from "dotenv";

dotenv.config();

export const BCRYPT_SALT_ROUNDS =
  parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12; // ? 12 salt rounds fallback

export const JWT_SECRET =
  process.env.JWT_SECRET ||
  "Baa4FpNxxomVTzIVcPtnEW2T13LPQG6y6hj3QuIWAdAdNubhXn9P8tNZM3BMxivix1S6K5iyx/P8FnnQeMLGCA==";

export const JWT_EXPIRY = process.env.JWT_EXPIRY || "10d"; // ? 100 days fallback

export const JWT_RESET_EXPIRY = process.env.JWT_RESET_EXPIRY || "30m"; // ? 30 minutes for password reset

// export const FRONTEND_URL =
//   process.env.FRONTEND_URL || "http://localhost:5173";
