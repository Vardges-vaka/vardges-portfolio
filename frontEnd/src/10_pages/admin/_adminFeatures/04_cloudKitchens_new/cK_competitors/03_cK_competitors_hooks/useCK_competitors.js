import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_competitors_states,
  useCK_competitors_apiHelpers,
  useCK_competitors_handlers,
} from "./_cK_competitors_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_competitors = () => {
  const { t } = useTranslation("competitors");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_competitors_states();
  const { apiHelpers } = useCK_competitors_apiHelpers();
  const { handlers } = useCK_competitors_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
