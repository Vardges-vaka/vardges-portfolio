import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import is_Debug from "../_adminDashboard.config.js";
import {
  useAdminDashboard_handlers,
  useAdminDashboard_states,
} from "./_adminDashboard.hooks.index.js";

import {
  settings_SIdeBar,
  me_SideBar,
  work_planning_SideBar,
  business_docs_SideBar,
  assets_storage_SideBar,
  tools_SideBar,
  brand_product_SideBar,
  cloudKitchens_SideBar,
} from "../../_adminFeatures/adminFeatures.index.js";

const isDebug = is_Debug.hooks;

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { section, subSection } = useParams();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");
  const { t: tSideBar } = useTranslation("sideBar");
  const { i18n } = useTranslation();

  const sideBarMap = {
    me: me_SideBar(tSideBar),
    work_planning: work_planning_SideBar(tSideBar),
    Business_docs: business_docs_SideBar(tSideBar),
    Assets_storage: assets_storage_SideBar(tSideBar),
    tools: tools_SideBar(tSideBar),
    Brand_product: brand_product_SideBar(tSideBar),
    settings: settings_SIdeBar(tSideBar),
    cloudKitchens: cloudKitchens_SideBar(tSideBar),
  };

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
    tSideBar: tSideBar,
    language: i18n.language,
  };

  const { states, setters } = useAdminDashboard_states();
  const { handlers } = useAdminDashboard_handlers({
    states: {
      ...states,
      original_section: section,
      original_subSection: subSection,
      sideBaritems: sideBarMap[section ? section : "settings"],
    },
    setters,
    translations,
    navigate,
    isDebug,
  });

  useEffect(() => {
    handlers.handleInitialMount(section, subSection);
  }, []);

  useEffect(() => {
    handlers.handleSectionChange(section, subSection);
  }, [section, subSection]);

  return {
    translations: translations,
    navigate,
    states: {
      sideBaritems: sideBarMap[section],
      section: section,
      original_Path: states.subSection,
      default_Path: states.defaultSubSection,
    },
    ActiveSubsection_states: {
      section: section,
      original_Path: states.subSection,
      default_Path: states.defaultSubSection,
    },
    handlers: {
      onClickSideBarItem: handlers.onClickSideBarItem,
      isActive: handlers.isActive,
    },
  };
};
