import express from "express";
import {
  listNodes,
  getNode,
  createNode,
  updateNode,
  deleteNode,
  getTree,
} from "./mindmap.controller.js";

/** MindMap routes — mounted at /api/public/mindmap. */
const router = express.Router();

router.get("/", listNodes); // flat list (?all= ?lang=)
router.get("/tree", getTree); // flat list + assembled nested tree
router.get("/:id", getNode); // ObjectId or key (eng-fs)

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createNode);
router.patch("/:id", updateNode);
router.delete("/:id", deleteNode);

export default router;
