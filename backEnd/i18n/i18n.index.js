/**
 * i18n Initialization
 *
 * Initializes i18next with filesystem backend and HTTP middleware support
 */

import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import { i18nConfig } from "./i18n.config.js";

// Initialize i18next
await i18next.use(Backend).use(middleware.LanguageDetector).init(i18nConfig);

console.log("✅ i18n initialized with languages:", i18nConfig.supportedLngs);

export default i18next;
