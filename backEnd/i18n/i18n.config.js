/**
 * i18n Configuration for Backend
 *
 * Supported Languages:
 * - en: English (default)
 * - ru: Russian (Русский)
 * - hy: Armenian (Հայերեն)
 * - ar: Arabic (العربية)
 */

export const SUPPORTED_LANGUAGES = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
  },
  ru: {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    dir: "ltr",
  },
  hy: {
    code: "hy",
    name: "Armenian",
    nativeName: "Հայերեն",
    dir: "ltr",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
  },
};

export const DEFAULT_LANGUAGE = "en";
export const LANGUAGE_CODES = Object.keys(SUPPORTED_LANGUAGES);

export const i18nConfig = {
  // Fallback language when translation is missing
  fallbackLng: DEFAULT_LANGUAGE,

  // Supported languages
  supportedLngs: LANGUAGE_CODES,

  // Preload all languages at startup
  preload: LANGUAGE_CODES,

  // Namespaces (translation file categories)
  ns: ["common", "validators", "errors"],
  defaultNS: "common",

  // Backend configuration for loading translation files
  backend: {
    loadPath: new URL("./locales/{{lng}}/{{ns}}.json", import.meta.url)
      .pathname,
  },

  // Language detection settings
  detection: {
    order: ["header", "querystring"],
    lookupHeader: "accept-language",
    lookupQuerystring: "lng",
    caches: false,
  },

  // Interpolation settings
  interpolation: {
    escapeValue: false, // Express handles escaping
  },

  // Key separator for nested translations
  keySeparator: ".",

  // Namespace separator
  nsSeparator: ":",

  // Return null for missing keys
  returnNull: false,

  // Save missing translations in development
  saveMissing: process.env.NODE_ENV === "development",

  // Missing key handler
  missingKeyHandler: (lngs, ns, key) => {
    if (process.env.NODE_ENV === "development") {
      console.warn(`🌐 Missing translation: [${lngs}] ${ns}:${key}`);
    }
  },
};
