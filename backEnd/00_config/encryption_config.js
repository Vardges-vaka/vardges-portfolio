import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const BCRYPT_SALT_ROUNDS =
  parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;

export const JWT_SECRET = (() => {
  if (!process.env.JWT_SECRET) {
    if (isProduction) {
      throw new Error("JWT_SECRET required in production");
    }
    console.warn("⚠️  Using default JWT_SECRET (dev only)");
    return "Baa4FpNxxomVTzIVcPtnEW2T13LPQG6y6hj3QuIWAdAdNubhXn9P8tNZM3BMxivix1S6K5iyx/P8FnnQeMLGCA==";
  }
  return process.env.JWT_SECRET;
})();

export const JWT_EXPIRY = process.env.JWT_EXPIRY || "10d";

export const JWT_RESET_EXPIRY = process.env.JWT_RESET_EXPIRY || "30m";
