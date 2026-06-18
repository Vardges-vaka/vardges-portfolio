import express from "express";
import {
  listResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  getByTrack,
} from "./resumes.controller.js";

/** Resumes routes — mounted at /api/public/resumes. */
const router = express.Router();

router.get("/", listResumes); // ?all= ?lang=
router.get("/track/:track", getByTrack); // tech | bar | both → current CV
router.get("/:id", getResume);

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createResume);
router.patch("/:id", updateResume);
router.delete("/:id", deleteResume);

export default router;
