import mongoose from "mongoose";

/**
 * localizedString — the single most important building block of this backend.
 *
 * WHY:
 *   The whole portfolio is multilingual (English · Русский · Հայերեն). Instead of
 *   keeping three parallel documents per language, every translatable piece of
 *   text is stored as ONE embedded object with a slot per locale:
 *       { en: "Frontend", ru: "Фронтенд", hy: "Frontend" }
 *
 *   - `en` is REQUIRED — it is the source of truth and the universal fallback.
 *     The React frontend's `t(path, fallback)` already falls back to the English
 *     value when a translation is missing, so an empty `ru`/`hy` degrades safely.
 *   - `ru` / `hy` are optional. An empty string means "not translated yet" and the
 *     UI will show the English text.
 *
 * USAGE in a model:
 *     import localizedString from "../../_shared/localizedString.schema.js";
 *     const schema = new mongoose.Schema({ title: { type: localizedString, required: true } });
 *
 * The `_id: false` keeps these embedded objects lean (no per-string ObjectId).
 */
const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true, trim: true },
    ru: { type: String, trim: true, default: "" },
    hy: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

export default localizedStringSchema;

/** Tiny helper for seeds/fixtures: `ls("Frontend", "Фронтенд")`. */
export const ls = (en, ru = "", hy = "") => ({ en, ru, hy });

/** A reusable array-of-localized-strings type (e.g. bullet lists, badges). */
export const localizedStringArray = { type: [localizedStringSchema], default: [] };
