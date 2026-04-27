// Checks if all three language slots are empty/unset.
export const isLocalizedEmpty = (obj) => {
  if (!obj) return true;
  return !obj.en && !obj.ru && !obj.ar;
};

// Returns the best non-empty string from a localized object, preferring `lang`
// then falling back through [en, ru, ar]. Returns "" when nothing is set.
const PRIORITY = ["en", "ru", "ar"];

export const pickLocalizedPreview = (obj, lang = "en") => {
  if (!obj) return "";
  if (obj[lang]) return obj[lang];
  for (const key of PRIORITY) {
    if (obj[key]) return obj[key];
  }
  return "";
};
