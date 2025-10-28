import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_emailTools.config.js";
import {
  useEmailTools_apiHelpers,
  useEmailTools_handlers,
  useEmailTools_states,
} from "./_emailTools.hooks.index.js";

export const useEmailTools = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useEmailTools_states();
  const { apiHelpers } = useEmailTools_apiHelpers({ translations });
  const { handlers } = useEmailTools_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
