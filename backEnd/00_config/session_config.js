import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

export const isProduction = process.env.NODE_ENV === "production";

dotenv.config();

export const GLOBAL_SESSION_EXPIRY =
  parseInt(process.env.GLOBAL_SESSION_EXPIRY, 10) || 3600000;

export const SESSION_CONFIG = session({
  secret: (() => {
    if (!process.env.SESSION_SECRET) {
      if (isProduction) {
        throw new Error("SESSION_SECRET required in production");
      }
      console.warn("⚠️  Using default SESSION_SECRET (dev only)");
      return "dev-fallback-secret-change-in-production";
    }
    return process.env.SESSION_SECRET;
  })(),
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    collectionName: "sessions",
    ttl: GLOBAL_SESSION_EXPIRY / 1000,
  }),
  cookie: {
    secure: isProduction,
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    maxAge: GLOBAL_SESSION_EXPIRY,
    ...(isProduction && { domain: ".vardges.me" }),
  },
});
