export const i18nConfig = {
  fallbackLng: "en",
  debug: false,

  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json", // Changed path
  },

  ns: [
    "common",
    "bio",
    "journey",
    "projects",
    "skills",
    "education",
    "achievements",
    "vision",
    "values",
  ],
  defaultNS: "common",

  interpolation: {
    escapeValue: false,
  },

  detection: {
    order: ["localStorage", "cookie", "navigator"],
    caches: ["localStorage", "cookie"],
  },
};
