import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_siteManagment.config.js";
import {
  useSiteManagment_apiHelpers,
  useSiteManagment_handlers,
  useSiteManagment_states,
} from "./_siteManagment.hooks.index.js";

export const useSiteManagment = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useXXX_states();
  const { apiHelpers } = useXXX_apiHelpers({ translations });
  const { handlers } = useXXX_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
