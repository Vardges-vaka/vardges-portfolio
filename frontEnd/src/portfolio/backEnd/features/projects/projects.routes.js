import express from "express";
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  listFeatured,
} from "./projects.controller.js";

/** Projects routes — mounted at /api/public/projects. */
const router = express.Router();

router.get("/", listProjects); // ?all= ?lang=
router.get("/featured", listFeatured);
router.get("/:id", getProject); // ObjectId or key (p-cloudops)

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
