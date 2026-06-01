import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_simulation_states,
  useCK_simulation_apiHelpers,
  useCK_simulation_handlers,
} from "./_cK_simulation_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_simulation = () => {
  const { t } = useTranslation("simulation");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_simulation_states();
  const { apiHelpers } = useCK_simulation_apiHelpers();
  const { handlers } = useCK_simulation_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
