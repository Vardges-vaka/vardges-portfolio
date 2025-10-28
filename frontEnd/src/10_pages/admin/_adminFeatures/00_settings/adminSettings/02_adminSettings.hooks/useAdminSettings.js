import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_adminSettings.config.js";
import {
  useAdminSettings_apiHelpers,
  useAdminSettings_handlers,
  useAdminSettings_states,
} from "./_adminSettings.hooks.index.js";

export const useAdminSettings = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useAdminSettings_states();
  const { apiHelpers } = useAdminSettings_apiHelpers({ translations });
  const { handlers } = useAdminSettings_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
