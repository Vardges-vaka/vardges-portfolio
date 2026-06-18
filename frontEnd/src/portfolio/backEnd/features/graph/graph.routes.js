import express from "express";
import { getGraph } from "./graph.controller.js";

/**
 * Graph routes — mounted at /api/public/graph.
 * Read-only assembler; there is no model here, it joins other collections.
 */
const router = express.Router();

router.get("/:variant", getGraph); // tech | bar | universe  (?lang=)

export default router;
