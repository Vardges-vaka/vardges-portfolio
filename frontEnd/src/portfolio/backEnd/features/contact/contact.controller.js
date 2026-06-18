import Contact from "./contact.model.js";
import ContactMessage from "./contactMessage.model.js";
import { ok, created, fail, wrap } from "../../_shared/response.util.js";
import { localize } from "../../_shared/localize.util.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** GET /contact — the singleton config (channels + intent chips). */
export const getContact = wrap(async (req, res) => {
  const doc = await Contact.findOne({ singleton: "contact" }).lean();
  ok(res, localize(doc, req.query.lang));
});

/** PATCH /contact — upsert the singleton config (protect). */
export const updateContact = wrap(async (req, res) => {
  const doc = await Contact.findOneAndUpdate({ singleton: "contact" }, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  ok(res, doc, "Contact config updated");
});

/**
 * POST /contact/message — public submit. Mirrors the frontend exactly:
 *   - honeypot field `company`: if present/non-empty, silently return 200 and DROP
 *     the message (bots fill hidden fields; humans never see it).
 *   - validate name / email / message; reject a bad email.
 */
export const submitMessage = wrap(async (req, res) => {
  const { name = "", email = "", topic = "other", message = "", lang = "en", source = "/", company = "" } = req.body || {};

  // honeypot — pretend success, store nothing
  if (company) return ok(res, { received: true }, "Message received");

  const errors = {};
  if (!String(name).trim()) errors.name = "Name is required";
  if (!String(email).trim()) errors.email = "Email is required";
  else if (!EMAIL_RE.test(String(email).trim())) errors.email = "That email doesn't look right";
  if (!String(message).trim()) errors.message = "Message is required";
  if (Object.keys(errors).length) return fail(res, "Validation failed", 400);

  const doc = await ContactMessage.create({
    name: String(name).trim(),
    email: String(email).trim(),
    topic,
    message: String(message).trim(),
    lang,
    source,
    sentAt: new Date(),
  });
  created(res, { id: doc._id, received: true }, "Message received");
});

/** GET /contact/messages — admin inbox (protect). */
export const listMessages = wrap(async (req, res) => {
  const filter = {};
  if (req.query.unread === "true") filter.read = false;
  if (req.query.archived !== "true") filter.archived = false;
  const docs = await ContactMessage.find(filter).sort({ createdAt: -1 }).lean();
  ok(res, docs);
});

/** PATCH /contact/messages/:id/read — mark read (protect). */
export const markRead = wrap(async (req, res) => {
  const doc = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!doc) return fail(res, "Message not found", 404);
  ok(res, doc, "Marked read");
});
