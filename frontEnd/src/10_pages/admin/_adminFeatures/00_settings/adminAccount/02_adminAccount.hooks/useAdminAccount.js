import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_adminAccount.config.js";
import {
  useAdminAccount_apiHelpers,
  useAdminAccount_handlers,
  useAdminAccount_states,
} from "./_adminAccount.hooks.index.js";

export const useAdminAccount = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useAdminAccount_states();
  const { apiHelpers } = useAdminAccount_apiHelpers({ translations });
  const { handlers } = useAdminAccount_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
