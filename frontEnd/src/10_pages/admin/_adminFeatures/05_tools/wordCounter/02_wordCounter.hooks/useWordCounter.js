import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_wordCounter.config.js";
import {
  useWordCounter_apiHelpers,
  useWordCounter_handlers,
  useWordCounter_states,
} from "./_wordCounter.hooks.index.js";

export const useWordCounter = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useWordCounter_states();
  const { apiHelpers } = useWordCounter_apiHelpers({ translations });
  const { handlers } = useWordCounter_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
