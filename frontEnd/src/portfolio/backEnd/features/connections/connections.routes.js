import express from "express";
import {
  listConnections,
  getConnection,
  createConnection,
  updateConnection,
  deleteConnection,
  listByGraph,
  listBridges,
} from "./connections.controller.js";

/** Connections routes — mounted at /api/public/connections. */
const router = express.Router();

router.get("/", listConnections); // ?all= ?lang=
router.get("/bridges", listBridges); // universe bridges only
router.get("/graph/:graph", listByGraph); // tech | bar | universe
router.get("/:id", getConnection);

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createConnection);
router.patch("/:id", updateConnection);
router.delete("/:id", deleteConnection);

export default router;
