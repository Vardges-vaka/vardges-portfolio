import express from "express";
import { getBundle } from "./bundle.controller.js";

/** Bundle route — mounted at /api/public/bundle. Read-only, one-shot hydration. */
const router = express.Router();

router.get("/", getBundle); // ?lang=

export default router;
