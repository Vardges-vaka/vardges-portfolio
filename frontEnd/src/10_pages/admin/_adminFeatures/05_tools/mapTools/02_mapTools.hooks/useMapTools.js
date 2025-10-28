import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_mapTools.config.js";
import {
  useMapTools_apiHelpers,
  useMapTools_handlers,
  useMapTools_states,
} from "./_mapTools.hooks.index.js";

export const useMapTools = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useMapTools_states();
  const { apiHelpers } = useMapTools_apiHelpers({ translations });
  const { handlers } = useMapTools_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
