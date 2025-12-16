import { useMemo, useState, useCallback } from "react";
import {
  NEW_PROJECT_INFO,
  NEW_PROJECT,
  NEW_PROJECT_GENERAL_INFO,
  NEW_PROJECT_CONFIG,
  NEW_PROJECT_VALIDATIONS,
} from "../05_projects.constances/_projects.constances.index.js";

const allSections = ["view_all", "view_one", "adding", "updating"];
const addingSteps = ["generalInfo", "specificInfo", "config"];

export const useProjects_states = () => {
  const [globalError, setGlobalError] = useState({
    isError: false,
    message: "",
  });
  const [currentSession, setCurrentSession] = useState("view_all");
  const [allProjects, setAllProjects] = useState(null);
  const [addingStep, setAddingStep] = useState(null);

  const [addingProject_type, setAddingProject_type] = useState("Web App");
  const [addingProject_generalInfo, setAddingProject_generalInfo] = useState(
    NEW_PROJECT_GENERAL_INFO
  );
  const [addingProject_specificInfo, setAddingProject_specificInfo] =
    useState(NEW_PROJECT_INFO);
  const [addingProject_config, setAddingProject_config] =
    useState(NEW_PROJECT_CONFIG);

  const [newProjects_validations, setNewProjects_validations] = useState(
    NEW_PROJECT_VALIDATIONS
  );

  return {
    states: {
      globalError,
      currentSession,
      allProjects,

      // Adding Project States
      addingStep,
      addingProject_type,
      addingProject_generalInfo,
      addingProject_specificInfo,
      addingProject_config,
      newProjects_validations,
    },

    setters: {
      setGlobalError,
      setCurrentSession,
      setAllProjects,

      // Adding Project Setters
      setAddingStep,
      setAddingProject_type,
      setAddingProject_generalInfo,
      setAddingProject_specificInfo,
      setAddingProject_config,
      setNewProjects_validations,
    },
  };
};
