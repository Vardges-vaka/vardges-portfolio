import { useMemo, useState, useCallback } from "react";
import {
  useAddingProject_handlers,
  useSession_handlers,
} from "./projectshooks_handlers/_projectshooks_handlers.index.js";

export const useProjects_handlers = ({
  states,
  setters,
  apiHelpers,
  translations,
}) => {
  const { addProjects_handlers } = useAddingProject_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });
  const { currentSession_handlers } = useSession_handlers({
    states,
    setters,
    apiHelpers,
    translations,
  });
  const fetchprojects = async () => {
    console.log("fetchprojects STarted");
    const projects = await apiHelpers.getAllProject();
    console.log("projects", projects);
    if (projects && projects.data) {
      projects.data.projects.length > 0
        ? setters.setAllProjects(projects.data.projects)
        : setters.setAllProjects([]);
    }
    setters.setAllProjects([]);
  };

  const handlecurrentStateChange = useCallback(
    (e) => {
      const { state } = e.target.dataset;
      setters.setCurrentState(state);
    },
    [setters.setCurrentState]
  );

  const handleProjectStepChange = useCallback(
    (e) => {
      const { state } = e.target.dataset;
      setters.setAddProjectStep(state);
    },
    [setters.setAddProjectStep]
  );

  const handleNewProjects_stepValidation = useCallback(() => {
    if (states.addingStep === "generalInfo") {
      console.log("handleNewProjects_stepValidation generalInfo");
      addProjects_handlers.handleGeneralInfo_stepValidation();
    }
    if (states.addingStep === "specificInfo") {
      console.log("handleNewProjects_stepValidation specificInfo");
      addProjects_handlers.handleSpecificInfo_stepValidation();
    }
    if (states.addingStep === "config") {
      console.log("handleNewProjects_stepValidation config");
      addProjects_handlers.handleConfig_stepValidation();
    }
  }, [
    states.addingStep,
    addProjects_handlers.handleGeneralInfo_stepValidation,
    addProjects_handlers.handleSpecificInfo_stepValidation,
    addProjects_handlers.handleConfig_stepValidation,
  ]);

  const handleAddingProject = () =>
    addProjects_handlers.handleNewAddingProject(
      currentSession_handlers.handleSessionChange_initiation
    );

  return {
    handlers: {
      fetchprojects,
      handlecurrentStateChange,
      handleProjectStepChange,
      handleNewProjects_stepValidation,
      handleAddingProject,
      ...addProjects_handlers,
      ...currentSession_handlers,
    },
  };
};
