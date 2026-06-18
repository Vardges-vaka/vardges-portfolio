import express from "express";
import {
  listStack,
  getStackGroup,
  createStackGroup,
  updateStackGroup,
  deleteStackGroup,
} from "./stack.controller.js";

/** Stack routes — mounted at /api/public/stack. Writes need auth in production. */
const router = express.Router();

router.get("/", listStack); // ?all=true ?lang=
router.get("/:id", getStackGroup); // ObjectId or key

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createStackGroup);
router.patch("/:id", updateStackGroup);
router.delete("/:id", deleteStackGroup);

export default router;
