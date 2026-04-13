import dotenv from "dotenv";
import { isProduction } from "./session_config.js";

dotenv.config();

export const JWT_COOKIE_EXPIRY =
  parseInt(process.env.JWT_COOKIE_EXPIRY, 10) || 10 * 24 * 60 * 60 * 1000; // ? 10 days fallback

export const JWT_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  maxAge: JWT_COOKIE_EXPIRY,
  sameSite: isProduction ? "none" : "lax",
  ...(isProduction && { domain: ".vardges.me" }),
};
