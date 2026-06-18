import express from "express";
import {
  listServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "./services.controller.js";

/** Services routes — mounted at /api/public/services. */
const router = express.Router();

router.get("/", listServices); // ?all= ?lang=
router.get("/:id", getService); // ObjectId or key (svc-menu)

// --- writes (TODO: protect with auth middleware) ---
router.post("/", createService);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
