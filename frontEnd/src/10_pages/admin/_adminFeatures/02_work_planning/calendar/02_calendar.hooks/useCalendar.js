import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_calendar.config.js";
import {
  useCalendar_apiHelpers,
  useCalendar_handlers,
  useCalendar_states,
} from "./_calendar.hooks.index.js";

export const useCalendar = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useCalendar_states();
  const { apiHelpers } = useCalendar_apiHelpers({ translations });
  const { handlers } = useCalendar_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
