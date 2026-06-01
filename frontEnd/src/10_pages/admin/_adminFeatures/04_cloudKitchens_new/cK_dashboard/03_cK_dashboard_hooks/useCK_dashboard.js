import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_dashboard_states,
  useCK_dashboard_apiHelpers,
  useCK_dashboard_handlers,
} from "./_cK_dashboard_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_dashboard = () => {
  const { t } = useTranslation("dashboard");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_dashboard_states();
  const { apiHelpers } = useCK_dashboard_apiHelpers();
  const { handlers } = useCK_dashboard_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
