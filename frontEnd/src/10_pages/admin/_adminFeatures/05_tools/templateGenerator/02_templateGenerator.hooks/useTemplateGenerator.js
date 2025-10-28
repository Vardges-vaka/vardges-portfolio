import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_templateGenerator.config.js";
import {
  useTemplateGenerator_apiHelpers,
  useTemplateGenerator_handlers,
  useTemplateGenerator_states,
} from "./_templateGenerator.hooks.index.js";

export const useTemplateGenerator = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useTemplateGenerator_states();
  const { apiHelpers } = useTemplateGenerator_apiHelpers({ translations });
  const { handlers } = useTemplateGenerator_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
