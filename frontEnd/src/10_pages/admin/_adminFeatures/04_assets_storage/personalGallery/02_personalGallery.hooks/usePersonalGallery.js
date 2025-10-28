import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_personalGallery.config.js";
import {
  usePersonalGallery_apiHelpers,
  usePersonalGallery_handlers,
  usePersonalGallery_states,
} from "./_personalGallery.hooks.index.js";

export const usePersonalGallery = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = usePersonalGallery_states();
  const { apiHelpers } = usePersonalGallery_apiHelpers({ translations });
  const { handlers } = usePersonalGallery_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
