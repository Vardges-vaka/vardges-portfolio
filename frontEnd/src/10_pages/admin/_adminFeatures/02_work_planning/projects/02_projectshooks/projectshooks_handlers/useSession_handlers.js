import { X } from "lucide-react";
import { useMemo, useState, useCallback } from "react";
const allSections = ["view_all", "view_one", "adding", "updating"];

import {
  NEW_PROJECT_INFO,
  NEW_PROJECT,
  NEW_PROJECT_GENERAL_INFO,
  NEW_PROJECT_CONFIG,
  NEW_PROJECT_VALIDATIONS,
} from "../../05_projects.constances/_projects.constances.index.js";

export const useSession_handlers = ({
  states,
  setters,
  apiHelpers,
  translations,
}) => {
  const handleSessionChange_initiation = useCallback(() => {
    setters.setAddingProject_type(null);
    setters.setAddingProject_generalInfo(NEW_PROJECT_GENERAL_INFO);
    setters.setAddingProject_specificInfo(NEW_PROJECT_INFO);
    setters.setAddingProject_config(NEW_PROJECT_CONFIG);
    setters.setNewProjects_validations(NEW_PROJECT_VALIDATIONS);
    setters.setCurrentSession("view_all");
    setters.setAddingStep(null);
  }, [
    setters.setAddingProject_type,
    setters.setAddingProject_generalInfo,
    setters.setAddingProject_specificInfo,
    setters.setAddingProject_config,
    setters.setNewProjects_validations,
    setters.setCurrentSession,
    states.addingStep,
  ]);

  const handleSessionChange_view_one = useCallback(
    (e) => {
      const { role, changeTo, session } = e.target.dataset;
    },
    [setters.setCurrentSession]
  );
  const handleSessionChange_updating = useCallback(
    (e) => {
      const { role, changeTo, session } = e.target.dataset;
    },
    [setters.setCurrentSession]
  );

  const handleSessionChange_adding = useCallback(() => {
    switch (states.addingStep) {
      case null:
        setters.setAddingStep("generalInfo");
        break;
      case "generalInfo":
        setters.setAddingStep("specificInfo");
        break;
      case "specificInfo":
        setters.setAddingStep("config");
        break;
      case "config":
        setters.setAddingStep(null);
        break;
      default:
        break;
    }
    setters.setCurrentSession("adding");
  }, [states.addingStep, setters.setAddingStep]);

  const handleSessionChange = useCallback(
    (e) => {
      const { operation, session } = e.target.dataset;
      if (session !== "adding") return;
      if (operation === "cancel") {
        handleSessionChange_initiation();
      }
      if (operation === "start" && session === "adding") {
        handleSessionChange_adding();
      }
      if (operation === "nextStep") {
        handleSessionChange_adding();
      }
    },
    [handleSessionChange_initiation, handleSessionChange_adding]
  );
  return {
    currentSession_handlers: {
      handleSessionChange,
      handleSessionChange_initiation,
    },
  };
};
