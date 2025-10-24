import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../../02_context/context.index.js";

import {
  useAdminWelcome_states,
  useAdminWelcome_apiHelpers,
  useAdminSignIn,
  useAdminSignup,
} from "./_adminWelcomeHooks.index.js";

export const useAdminWelcome = () => {
  const userContext = useUserContext();

  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };

  const { api_helpers } = useAdminWelcome_apiHelpers({ translations });
  const { states, setters } = useAdminWelcome_states();

  const signIn_props = useAdminSignIn({
    states: states.signIn,
    setters: setters.signIn,
    api_helpers,
    translations,
    userContext,
    navigate,
  });

  const signUp_props = useAdminSignup({
    states: states.signUp,
    setters: setters.signUp,
    translations,
    api_helpers,
    userContext,
    navigate,
  });

  const handleActiveForm = (e) => {
    e.currentTarget.dataset.value &&
      setters.setActiveForm(e.currentTarget.dataset.value);
  };

  return {
    state: states.activeForm,
    signIn_props: signIn_props,
    handler: handleActiveForm,
    signIn_props: signIn_props,
    signUp_props: signUp_props,
  };
};
