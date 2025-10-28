import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_to_do_list.config.js";
import {
  useTo_do_list_apiHelpers,
  useTo_do_list_handlers,
  useTo_do_list_states,
} from "./_to_do_list.hooks.index.js";

export const useTo_do_list = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useTo_do_list_states();
  const { apiHelpers } = useTo_do_list_apiHelpers({ translations });
  const { handlers } = useTo_do_list_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
