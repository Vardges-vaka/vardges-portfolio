import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_cocktailDevelopment.config.js";
import {
  useCocktailDevelopment_apiHelpers,
  useCocktailDevelopment_handlers,
  useCocktailDevelopment_states,
} from "./_cocktailDevelopment.hooks.index.js";

export const useCocktailDevelopment = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useCocktailDevelopment_states();
  const { apiHelpers } = useCocktailDevelopment_apiHelpers({ translations });
  const { handlers } = useCocktailDevelopment_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
