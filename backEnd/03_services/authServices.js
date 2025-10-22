import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  BCRYPT_SALT_ROUNDS,
  JWT_SECRET,
  JWT_EXPIRY,
} from "../00_config/_config.index.js";

dotenv.config();

/**
 * Hashes a password using bcrypt with [BCRYPT_SALT_ROUNDS] salt rounds
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} Bcrypt hashed password
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
};

/**
 * Compares a plain text password with a hashed password
 * @param {string} plainPassword - Plain text password
 * @param {string} hashedPassword - Bcrypt hashed password
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Generates a JWT token with user payload
 * @param {Object} payload - User data to encode {_id, name, email, role}
 * @returns {string} JWT token
 */
export const generateJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

/**
 * Verifies and decodes a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded payload if valid, null if invalid
 */
export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; // Invalid or expired token
  }
};
