import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_setup_states,
  useCK_setup_apiHelpers,
  useCK_setup_handlers,
} from "./_cK_setup_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_setup = () => {
  const { t } = useTranslation("setup");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_setup_states();
  const { apiHelpers } = useCK_setup_apiHelpers({ TOAST });
  const { handlers } = useCK_setup_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
