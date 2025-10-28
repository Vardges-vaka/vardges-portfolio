import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_serverSettings.config.js";
import {
  useServerSettings_apiHelpers,
  useServerSettings_handlers,
  useServerSettings_states,
} from "./_serverSettings.hooks.index.js";

export const useServerSettings = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useServerSettings_states();
  const { apiHelpers } = useServerSettings_apiHelpers({ translations });
  const { handlers } = useServerSettings_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
