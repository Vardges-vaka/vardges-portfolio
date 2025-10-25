/**
 * Test Routes for i18n Verification
 *
 * Provides endpoints to test internationalization functionality
 */

import express from "express";

const router = express.Router();

/**
 * GET /api/test/i18n
 * Test endpoint to verify i18n functionality
 */
router.get("/i18n", (req, res) => {
  const { t, language, languageSource } = req;

  console.log("\n=== i18n Test Endpoint ===");
  console.log("Detected Language:", language);
  console.log("Language Source:", languageSource);
  console.log("---");

  // Test translations from different namespaces
  const translations = {
    // Common namespace
    welcome: t("common:welcome"),
    success: t("common:success"),
    save: t("common:save"),
    cancel: t("common:cancel"),

    // Validators namespace with interpolation
    required: t("validators:required", { field: "Email" }),
    minLength: t("validators:min_length", { field: "Password", min: 8 }),
    invalidEmail: t("validators:invalid_email"),

    // Errors namespace
    notFound: t("errors:not_found"),
    unauthorized: t("errors:unauthorized"),
    serverError: t("errors:server_error"),

    // Test missing key (fallback behavior)
    missingKey: t("common:this_key_does_not_exist"),
  };

  // Log translations to console
  console.log("Translations:");
  Object.entries(translations).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  console.log("========================\n");

  // Return response
  res.json({
    success: true,
    language,
    languageSource,
    translations,
    message: t("common:success"),
  });
});

/**
 * GET /api/test/i18n/all-languages
 * Test endpoint to show translations in all supported languages
 */
router.get("/i18n/all-languages", async (req, res) => {
  const { t, i18n } = req;
  const currentLanguage = req.language;

  console.log("\n=== Testing All Languages ===");

  const allTranslations = {};
  const languages = ["en", "ru", "hy", "ar"];

  for (const lang of languages) {
    await i18n.changeLanguage(lang);
    allTranslations[lang] = {
      welcome: t("common:welcome"),
      success: t("common:success"),
      required: t("validators:required", { field: "Email" }),
      notFound: t("errors:not_found"),
    };
    console.log(`${lang}:`, allTranslations[lang]);
  }

  // Restore original language
  await i18n.changeLanguage(currentLanguage);

  console.log("========================\n");

  res.json({
    success: true,
    currentLanguage,
    allTranslations,
  });
});

/**
 * GET /api/test/i18n/namespaces
 * Test endpoint to verify all namespaces are loaded
 */
router.get("/i18n/namespaces", (req, res) => {
  const { t, language } = req;

  console.log("\n=== Testing Namespaces ===");
  console.log("Language:", language);

  const namespaceTests = {
    common: {
      welcome: t("common:welcome"),
      success: t("common:success"),
      error: t("common:error"),
    },
    validators: {
      required: t("validators:required", { field: "Test" }),
      invalidEmail: t("validators:invalid_email"),
      weakPassword: t("validators:weak_password"),
    },
    errors: {
      notFound: t("errors:not_found"),
      unauthorized: t("errors:unauthorized"),
      serverError: t("errors:server_error"),
    },
  };

  console.log("Namespace Tests:", JSON.stringify(namespaceTests, null, 2));
  console.log("========================\n");

  res.json({
    success: true,
    language,
    namespaceTests,
  });
});

export default router;
