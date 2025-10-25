import i18nextMiddleware from "i18next-http-middleware";
import i18next from "../i18n/i18n.index.js";

export { vld_sntzr_mddlwre } from "./vld_sntzr_mddlwre.js";
export { auth_mddlwre } from "./auth_mddlwre.js";
export { i18nMiddleware } from "./i18n_mddlwre.js";

// Export i18next HTTP middleware handler
export const i18nHandler = i18nextMiddleware.handle(i18next);
