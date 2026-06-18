import express from "express";
import {
  getContact,
  updateContact,
  submitMessage,
  listMessages,
  markRead,
} from "./contact.controller.js";

/** Contact routes — mounted at /api/public/contact. */
const router = express.Router();

// --- public ---
router.get("/", getContact); // the config singleton (?lang=)
router.post("/message", submitMessage); // the form submit (honeypot + validation)

// --- admin (TODO: protect with auth middleware) ---
router.patch("/", updateContact);
router.get("/messages", listMessages); // ?unread=true ?archived=true
router.patch("/messages/:id/read", markRead);

export default router;
