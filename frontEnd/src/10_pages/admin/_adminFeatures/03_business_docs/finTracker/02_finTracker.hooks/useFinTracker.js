import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_finTracker.config.js";
import {
  useFinTracker_apiHelpers,
  useFinTracker_handlers,
  useFinTracker_states,
} from "./_finTracker.hooks.index.js";

export const useFinTracker = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useFinTracker_states();
  const { apiHelpers } = useFinTracker_apiHelpers({ translations });
  const { handlers } = useFinTracker_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
