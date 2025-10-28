import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_PDF_image_Formatting.config.js";
import {
  usePDF_image_Formatting_apiHelpers,
  usePDF_image_Formatting_handlers,
  usePDF_image_Formatting_states,
} from "./_PDF_image_Formatting.hooks.index.js";

export const usePDF_image_Formatting = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = usePDF_image_Formatting_states();
  const { apiHelpers } = usePDF_image_Formatting_apiHelpers({ translations });
  const { handlers } = usePDF_image_Formatting_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
