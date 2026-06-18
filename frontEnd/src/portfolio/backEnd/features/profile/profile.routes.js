import express from "express";
import { getProfile, updateProfile } from "./profile.controller.js";

/** Profile routes — mounted at /api/public/profile (a singleton). */
const router = express.Router();

router.get("/", getProfile); // ?lang=

// --- admin (TODO: protect with auth middleware) ---
router.patch("/", updateProfile);

export default router;
