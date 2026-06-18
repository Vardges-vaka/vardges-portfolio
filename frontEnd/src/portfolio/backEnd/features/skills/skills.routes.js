import express from "express";
import {
  listSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  listByDomain,
} from "./skills.controller.js";

/**
 * Skills routes — mounted at /api/public/skills (see backEnd/routes.index.js).
 *
 * Reads are public. Writes (create/update/delete) MUST be protected in production:
 * wrap them with your existing auth/role middleware where marked.
 */
const router = express.Router();

// --- public reads ---
router.get("/", listSkills); // ?all=true (admin) · ?lang=ru|hy to flatten
router.get("/domain/:domain", listByDomain); // tech | bar
router.get("/:id", getSkill); // ObjectId or key (sk-frontend)

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createSkill);
router.patch("/:id", updateSkill);
router.delete("/:id", deleteSkill);

export default router;
