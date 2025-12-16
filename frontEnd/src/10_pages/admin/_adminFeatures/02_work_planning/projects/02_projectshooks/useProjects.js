import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import isDebug from "../_projects.config.js";
import {
  useProjects_apiHelpers,
  useProjects_handlers,
  useProjects_states,
} from "./_projects.hooks.index.js";
import { generalInfo_vld } from "../03_projects.validators/_projects.validators.index.js";

export const useProjects = () => {
  const navigate = useNavigate();

  const { t: tValidators } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tAdminWelcome } = useTranslation("adminWelcome");

  const translations = {
    tValidators: tValidators,
    tCommon: tCommon,
    tAdminWelcome: tAdminWelcome,
  };
  const { states, setters } = useProjects_states();
  const { apiHelpers } = useProjects_apiHelpers({
    translations,
    setGlobalError: setters.setGlobalError,
  });
  const { handlers } = useProjects_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });

  useEffect(() => {
    handlers.fetchprojects();
  }, []);

  useEffect(() => {
    if (states.currentSession === "adding") {
      handlers.handleNewProjects_stepValidation();
    }
  }, [
    states.addingStep,
    states.currentSession,
    handlers.handleNewProjects_stepValidation,
  ]);

  const allSections = ["view_all", "view_one", "adding", "updating"];
  const addingSteps = ["generalInfo", "specificInfo", "config"];

  const ViewAll_Projects_props = {
    states: { allProjects: states.allProjects },
    handlers: {
      startAddingProject: (e) =>
        handlers.handleSessionChange(handlers.handleAddingProject, e),
    },
  };
  const Adding_Project_footer_props = {
    states: {
      addingStep: states.addingStep,
      validations: states.newProjects_validations,
    },
    handlers: {
      onCancel: (e) =>
        handlers.handleSessionChange(handlers.handleAddingProject, e),
      onNext: (e) =>
        handlers.handleSessionChange(handlers.handleAddingProject, e),
    },
  };
  const Adding_Project_Header_props = {
    states: {
      addingStep: states.addingStep,
    },
    handlers: {
      onCancel: (e) =>
        handlers.handleSessionChange(handlers.handleAddingProject, e),
    },
  };
  const generalInfo_props = {
    states: {
      addingProject_type: states.addingProject_type,
      addingProject_generalInfo: states.addingProject_generalInfo,
    },
    handlers: {
      handle_type_change: handlers.handleGeneralInfo_type_change,
      handle_text_change: handlers.handleGeneralInfo_text_change,
      handle_type_blur: handlers.handleGeneralInfo_type_blur,
      handle_text_blur: handlers.handleGeneralInfo_text_blur,
    },
  };
  const specificInfo_props = {
    states: {
      addingProject_type: states.addingProject_type,
      addingProject_specificInfo: states.addingProject_specificInfo,
    },
    handlers: {
      handleSpecificInfo_text_change: handlers.handleSpecificInfo_text_change,
      handleSpecificInfo_togglers: handlers.handleSpecificInfo_togglers,
      handleSpecificInfo_techStack_change:
        handlers.handleSpecificInfo_techStack_change,
      handleSpecificInfo_techStack_remove:
        handlers.handleSpecificInfo_techStack_remove,
      handleSpecificInfo_packages_change:
        handlers.handleSpecificInfo_packages_change,
      handleSpecificInfo_packages_remove:
        handlers.handleSpecificInfo_packages_remove,
    },
  };

  const config_props = {
    states: {
      addingProject_config: states.addingProject_config,
    },
    handlers: {
      handleConfig_togglers: handlers.handleConfig_togglers,
      handleConfig_Priority_change: handlers.handleConfig_Priority_change,
      handleConfig_Timing_change: handlers.handleConfig_Timing_change,
    },
  };

  const Adding_Project_props = {
    states: { addingStep: states.addingStep },
    handlers: {},
    childProps: {
      generalInfo_props,
      specificInfo_props,
      config_props,
      Adding_Project_footer_props,
      Adding_Project_Header_props,
    },
  };
  const Updating_Project_props = { states: {}, handlers: {} };
  const ViewOne_Project_props = { states: {}, handlers: {} };
  return {
    states: {
      currentSession: states.currentSession,
    },
    ViewOne_Project_props,
    Adding_Project_props,
    Updating_Project_props,
    ViewAll_Projects_props,
    translations: translations,
    status: {},
  };
};
