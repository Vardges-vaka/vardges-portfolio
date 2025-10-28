import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_ai.config.js";
import {
  useAi_apiHelpers,
  useAi_handlers,
  useAi_states,
} from "./_ai.hooks.index.js";

export const useAi = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useAi_states();
  const { apiHelpers } = useAi_apiHelpers({ translations });
  const { handlers } = useAi_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
