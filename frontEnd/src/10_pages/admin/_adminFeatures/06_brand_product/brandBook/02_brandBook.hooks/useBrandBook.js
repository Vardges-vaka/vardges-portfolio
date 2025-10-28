import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_brandBook.config.js";
import {
  useBrandBook_apiHelpers,
  useBrandBook_handlers,
  useBrandBook_states,
} from "./_brandBook.hooks.index.js";

export const useBrandBook = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useBrandBook_states();
  const { apiHelpers } = useBrandBook_apiHelpers({ translations });
  const { handlers } = useBrandBook_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
