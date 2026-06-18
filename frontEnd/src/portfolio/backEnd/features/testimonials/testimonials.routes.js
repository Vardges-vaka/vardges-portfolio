import express from "express";
import {
  listTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  listByTrack,
} from "./testimonials.controller.js";

/** Testimonials routes — mounted at /api/public/testimonials. */
const router = express.Router();

router.get("/", listTestimonials); // ?all= ?lang=
router.get("/track/:track", listByTrack); // bar | tech
router.get("/:id", getTestimonial); // ObjectId or key (t-maria)

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createTestimonial);
router.patch("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
