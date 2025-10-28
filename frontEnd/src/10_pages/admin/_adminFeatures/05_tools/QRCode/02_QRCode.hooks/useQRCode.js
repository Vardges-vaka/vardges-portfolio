import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_QRCode.config.js";
import {
  useQRCode_apiHelpers,
  useQRCode_handlers,
  useQRCode_states,
} from "./_QRCode.hooks.index.js";

export const useQRCode = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useQRCode_states();
  const { apiHelpers } = useQRCode_apiHelpers({ translations });
  const { handlers } = useQRCode_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return { props: {}, translations: translations };
};
