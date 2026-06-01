import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useCK_mapStudio_states,
  useCK_mapStudio_apiHelpers,
  useCK_mapStudio_handlers,
} from "./_cK_mapStudio_hooks.index.js";
import { useNotificationContext } from "../../../../../../02_context/context.index.js";

export const useCK_mapStudio = () => {
  const { t } = useTranslation("mapStudio");
  const { TOAST } = useNotificationContext();
  const { states, setters, refs } = useCK_mapStudio_states();
  const { apiHelpers } = useCK_mapStudio_apiHelpers();
  const { handlers } = useCK_mapStudio_handlers({
    states,
    setters,
    refs,
    apiHelpers,
    t,
    TOAST,
  });
  return { states: {}, handlers: {}, childProps: {}, t, TOAST };
};
