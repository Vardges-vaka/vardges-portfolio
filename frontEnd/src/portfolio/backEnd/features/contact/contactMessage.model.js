import mongoose from "mongoose";

/**
 * ContactMessage — an inbound submission from the contact form.
 *
 * The payload mirrors the frontend's `submitContact(payload)` exactly:
 *   { name, email, topic, message, lang, source, sentAt }
 * `source` is the page path the message came from (/, /tech, /bar) so you can see
 * which audience-mode/context produced it.
 *
 * Messages are NOT translated (they are user input). `read` / `archived` are for
 * the admin inbox.
 */
const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    topic: { type: String, enum: ["tech", "bar", "other"], default: "other" },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    lang: { type: String, enum: ["en", "ru", "hy"], default: "en" },
    source: { type: String, trim: true, default: "/" }, // page path
    sentAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactMessageSchema.index({ read: 1, createdAt: -1 });

export default mongoose.model("ContactMessage", contactMessageSchema);
