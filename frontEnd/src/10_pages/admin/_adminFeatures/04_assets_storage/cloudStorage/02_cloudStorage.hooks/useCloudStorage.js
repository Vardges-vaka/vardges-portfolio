import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_cloudStorage.config.js";
import {
  useCloudStorage_apiHelpers,
  useCloudStorage_handlers,
  useCloudStorage_states,
} from "./_cloudStorage.hooks.index.js";

export const useCloudStorage = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useCloudStorage_states();
  const { apiHelpers } = useCloudStorage_apiHelpers({ translations });
  const { handlers } = useCloudStorage_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
