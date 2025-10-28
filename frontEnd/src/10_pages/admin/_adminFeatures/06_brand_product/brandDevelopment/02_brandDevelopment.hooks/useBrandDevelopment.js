import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_brandDevelopment.config.js";
import {
  useBrandDevelopment_apiHelpers,
  useBrandDevelopment_handlers,
  useBrandDevelopment_states,
} from "./_brandDevelopment.hooks.index.js";

export const useBrandDevelopment = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useBrandDevelopment_states();
  const { apiHelpers } = useBrandDevelopment_apiHelpers({ translations });
  const { handlers } = useBrandDevelopment_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
