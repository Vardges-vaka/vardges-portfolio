import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_cV_Generator.config.js";
import {
  useCV_Generator_apiHelpers,
  useCV_Generator_handlers,
  useCV_Generator_states,
} from "./_cV_Generator.hooks.index.js";

export const useCV_Generator = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useCV_Generator_states();
  const { apiHelpers } = useCV_Generator_apiHelpers({ translations });
  const { handlers } = useCV_Generator_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
