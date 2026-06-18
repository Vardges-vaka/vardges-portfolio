import express from "express";
import {
  listCareers,
  getCareer,
  createCareer,
  updateCareer,
  deleteCareer,
  listTimeline,
} from "./careers.controller.js";

/** Careers routes — mounted at /api/public/careers. */
const router = express.Router();

router.get("/", listCareers); // ?all= ?lang=
router.get("/timeline", listTimeline); // chronological (journey)
router.get("/:id", getCareer); // ObjectId or key (xp-bff)

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createCareer);
router.patch("/:id", updateCareer);
router.delete("/:id", deleteCareer);

export default router;
