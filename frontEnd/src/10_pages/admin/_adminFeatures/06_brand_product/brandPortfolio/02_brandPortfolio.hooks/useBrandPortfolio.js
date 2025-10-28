import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_brandPortfolio.config.js";
import {
  useBrandPortfolio_apiHelpers,
  useBrandPortfolio_handlers,
  useBrandPortfolio_states,
} from "./_brandPortfolio.hooks.index.js";

export const useBrandPortfolio = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useBrandPortfolio_states();
  const { apiHelpers } = useBrandPortfolio_apiHelpers({ translations });
  const { handlers } = useBrandPortfolio_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
