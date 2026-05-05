/**
 * i18n Language Detection Middleware
 *
 * Detects user's preferred language from HTTP headers and query parameters
 * Validates language code and sets language context for the request
 */

import { LANGUAGE_CODES, DEFAULT_LANGUAGE } from "../i18n/i18n.config.js";

/**
 * Parse Accept-Language header to extract preferred language
 * @param {string} acceptLanguageHeader - Accept-Language header value
 * @returns {string|null} - Extracted language code or null
 */
const parseAcceptLanguage = (acceptLanguageHeader) => {
  if (!acceptLanguageHeader) return null;

  // Parse Accept-Language header (e.g., "ru-RU,ru;q=0.9,en;q=0.8")
  const languages = acceptLanguageHeader
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";");
      const quality = qValue ? parseFloat(qValue.split("=")[1]) : 1.0;
      // Extract just the language code (e.g., "ru" from "ru-RU")
      const langCode = code.split("-")[0].toLowerCase();
      return { code: langCode, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Return the first supported language
  for (const lang of languages) {
    if (LANGUAGE_CODES.includes(lang.code)) {
      return lang.code;
    }
  }

  return null;
};

/**
 * Language Detection Middleware
 * Detects and validates user's preferred language
 */
export const i18nMiddleware = (req, res, next) => {
  let detectedLanguage = DEFAULT_LANGUAGE;
  let source = "default";

  try {
    // Priority 1: Custom header (X-Language or Language)
    const customLanguage = req.headers["x-language"] || req.headers["language"];
    if (customLanguage) {
      const langCode = customLanguage.toLowerCase().trim();
      if (LANGUAGE_CODES.includes(langCode)) {
        detectedLanguage = langCode;
        source = "custom-header";
      } else {
        console.warn(
          `[i18n] Invalid custom language header: ${customLanguage}`
        );
      }
    }

    // Priority 2: Query parameter (?lng=en)
    if (source === "default" && req.query.lng) {
      const langCode = req.query.lng.toLowerCase().trim();
      if (LANGUAGE_CODES.includes(langCode)) {
        detectedLanguage = langCode;
        source = "query-parameter";
      } else {
        console.warn(
          `[i18n] Invalid query language parameter: ${req.query.lng}`
        );
      }
    }

    // Priority 3: Accept-Language header
    if (source === "default" && req.headers["accept-language"]) {
      const parsedLanguage = parseAcceptLanguage(
        req.headers["accept-language"]
      );
      if (parsedLanguage) {
        detectedLanguage = parsedLanguage;
        source = "accept-language-header";
      }
    }

    // Log detected language
    // console.log(`[i18n] Request received`);
    // console.log(`[i18n] Detected language: ${detectedLanguage}`);
    // console.log(`[i18n] Language source: ${source}`);
    // console.log(
    //   `[i18n] Supported: ${LANGUAGE_CODES.includes(detectedLanguage)}`
    // );

    // Attach language information to request
    req.language = detectedLanguage;
    req.languageSource = source;

    // Change language for this request (i18next middleware already attached req.t)
    if (req.i18n) {
      req.i18n.changeLanguage(detectedLanguage);
    }
  } catch (error) {
    console.error("[i18n] Error in language detection:", error);
    // Continue with default language on error
    req.language = DEFAULT_LANGUAGE;
    req.languageSource = "error-fallback";
  }

  next();
};
