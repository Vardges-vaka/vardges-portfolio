import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_menuDevelopment.config.js";
import {
  useMenuDevelopment_apiHelpers,
  useMenuDevelopment_handlers,
  useMenuDevelopment_states,
} from "./_menuDevelopment.hooks.index.js";

export const useMenuDevelopment = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useMenuDevelopment_states();
  const { apiHelpers } = useMenuDevelopment_apiHelpers({ translations });
  const { handlers } = useMenuDevelopment_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
