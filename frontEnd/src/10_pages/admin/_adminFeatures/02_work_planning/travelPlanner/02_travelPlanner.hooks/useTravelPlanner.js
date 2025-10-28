import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_travelPlanner.config.js";
import {
  useTravelPlanner_apiHelpers,
  useTravelPlanner_handlers,
  useTravelPlanner_states,
} from "./_travelPlanner.hooks.index.js";

export const useTravelPlanner = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useTravelPlanner_states();
  const { apiHelpers } = useTravelPlanner_apiHelpers({ translations });
  const { handlers } = useTravelPlanner_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
