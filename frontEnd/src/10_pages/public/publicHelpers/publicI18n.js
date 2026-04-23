export const getTranslatedData = (t, key, fallbackData) => {
  const translatedData = t(key, { returnObjects: true });

  if (
    translatedData &&
    typeof translatedData === "object" &&
    !Array.isArray(translatedData)
  ) {
    return translatedData;
  }

  return fallbackData;
};

export const getResolvedLanguage = (i18n) =>
  i18n.resolvedLanguage || i18n.language;
