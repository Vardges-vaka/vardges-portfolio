/**
 * localize — collapse localizedString objects to a single language on the way out.
 *
 * The API returns FULL localized objects by default (so the multilingual frontend
 * can hold all three languages and switch instantly, exactly as it does now). But
 * for server-rendered consumers, or a `?lang=ru` query, you can flatten every
 * `{ en, ru, hy }` leaf to a plain string with `localize(payload, "ru")`.
 *
 * Fallback order is always: requested lang → English → "".
 */
export const LANGS = ["en", "ru", "hy"];
export const DEFAULT_LANG = "en";

/** Is this value a localizedString leaf (has an `en` and only locale keys)? */
const isLocalized = (v) =>
  v && typeof v === "object" && !Array.isArray(v) && typeof v.en === "string" && Object.keys(v).every((k) => LANGS.includes(k));

/** Resolve a single localizedString to a string. */
export const pick = (loc, lang = DEFAULT_LANG) => (loc ? loc[lang] || loc.en || "" : "");

/**
 * Deep-localize any value: recurses through arrays/objects and replaces every
 * localizedString leaf with its resolved string. Non-localized data passes through.
 * Pass `lang` falsy (e.g. `null`) to return the data untouched.
 */
export const localize = (value, lang = DEFAULT_LANG) => {
  if (!lang) return value;
  if (isLocalized(value)) return pick(value, lang);
  if (Array.isArray(value)) return value.map((v) => localize(v, lang));
  if (value && typeof value === "object") {
    // skip Mongoose internals / dates / ObjectIds — only walk plain objects
    if (value._bsontype || value instanceof Date) return value;
    const out = {};
    for (const k of Object.keys(value)) out[k] = localize(value[k], lang);
    return out;
  }
  return value;
};
