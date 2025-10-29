import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../../../02_context/context.index";
// import isDebug from "../AdminDashboard.config.js";
import {
  useAdminDashboard_apiHelpers,
  useAdminDashboard_handlers,
  useAdminDashboard_states,
} from "./_adminDashboard.hooks.index.js";

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();
  const { section, subSection } = useParams();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");
  const { t: tSideBar } = useTranslation("sideBar");
  const { i18n } = useTranslation();

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
    tSideBar: tSideBar,
  };
  const { states, setters } = useAdminDashboard_states();
  const { apiHelpers } = useAdminDashboard_apiHelpers({ translations });
  const { handlers } = useAdminDashboard_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  return {
    props: {},
    translations: translations,
    navigate,
    user,
    logout,
    section,
    subSection,
    states,
    setters,
    apiHelpers,
    handlers,
    i18n,
  };
};
