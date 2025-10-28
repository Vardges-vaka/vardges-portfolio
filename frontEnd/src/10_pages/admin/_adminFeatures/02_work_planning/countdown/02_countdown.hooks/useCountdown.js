import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_countdown.config.js";
import {
  useCountdown_apiHelpers,
  useCountdown_handlers,
  useCountdown_states,
} from "./_countdown.hooks.index.js";

export const useCountdown = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useCountdown_states();
  const { apiHelpers } = useCountdown_apiHelpers({ translations });
  const { handlers } = useCountdown_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
