import express from "express";
import {
  listCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
  listByCategory,
  listPlanned,
} from "./certifications.controller.js";

/** Certifications routes — mounted at /api/public/certifications. */
const router = express.Router();

router.get("/", listCertifications); // ?all= ?lang=
router.get("/planned", listPlanned);
router.get("/category/:cat", listByCategory); // dev|auto|ai|cyber|foundations
router.get("/:id", getCertification); // ObjectId or key (c-it-automation)

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createCertification);
router.patch("/:id", updateCertification);
router.delete("/:id", deleteCertification);

export default router;
