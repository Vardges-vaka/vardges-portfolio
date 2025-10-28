import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_pswManager.config.js";
import {
  usePswManager_apiHelpers,
  usePswManager_handlers,
  usePswManager_states,
} from "./_pswManager.hooks.index.js";

export const usePswManager = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = usePswManager_states();
  const { apiHelpers } = usePswManager_apiHelpers({ translations });
  const { handlers } = usePswManager_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
