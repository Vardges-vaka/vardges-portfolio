import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import _NEW_MENU_CFG from "../newMenu.config.js";
import {
  useNewMenu_states,
  useNewMenu_apiHelpers,
  useNewMenu_handlers,
} from "./_newMenu_hooks.index.js";
import { getCompProps } from "../02_newMenu_helpers/_newMenu_helpers.index.js";

/* ============================================================================
   useNewMenu — orchestrator hook.

   Composes states + handlers + apiHelpers, owns side-effects (initial fetch
   per session, toast auto-dismiss), extracts `t` once and threads it through
   compProps so leaf components never call useTranslation directly.

   The arch doc compProps convention is honoured: each component receives a
   flat-props bundle named `<Component>_props` that the parent spreads.
============================================================================ */
export const useNewMenu = () => {
  const { t } = useTranslation("newMenu");
  const { states, setters } = useNewMenu_states();
  const { apiHelpers } = useNewMenu_apiHelpers();
  const { handlers } = useNewMenu_handlers({ states, setters, apiHelpers });

  // Fetch the data slice the current session needs (cheap no-op if cached).
  useEffect(() => {
    handlers.fetchForSession();
  }, [handlers.fetchForSession]);

  // Auto-dismiss the toast after a configured delay.
  useEffect(() => {
    if (!states.toast) return undefined;
    const id = setTimeout(() => handlers.dismissToast(), _NEW_MENU_CFG.toastDurationMs);
    return () => clearTimeout(id);
  }, [states.toast, handlers.dismissToast]);

  // Memoise compProps so unrelated state changes don't recompute all bundles.
  const compProps = useMemo(
    () => getCompProps({ states, handlers, t }),
    [states, handlers, t],
  );

  return {
    states,
    handlers,
    compProps,
    t,
  };
};
