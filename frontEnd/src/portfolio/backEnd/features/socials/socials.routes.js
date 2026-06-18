import express from "express";
import {
  listSocials,
  getSocial,
  createSocial,
  updateSocial,
  deleteSocial,
} from "./socials.controller.js";

/** Socials routes — mounted at /api/public/socials. */
const router = express.Router();

router.get("/", listSocials); // ?all= ?lang=
router.get("/:id", getSocial); // ObjectId or key (linkedin)

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createSocial);
router.patch("/:id", updateSocial);
router.delete("/:id", deleteSocial);

export default router;
