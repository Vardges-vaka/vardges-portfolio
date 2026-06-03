import { useState, useRef } from "react";
import {
  DFLT_F_D_INTEGRATION,
  DFLT_F_D_INTEGRATION_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
export const useCK_setup_integrations_states = () => {
  const [integrations, setIntegrations] = useState([]);
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("one");
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [integrationFormData, setIntegrationFormData] =
    useState(DFLT_F_D_INTEGRATION);
  const [integrationFormData_full, setIntegrationFormData_full] = useState(
    DFLT_F_D_INTEGRATION_FULL,
  );
  return {
    states: {
      activeOperation,
      activeViewingType,
      integrations,
      selectedIntegration,
      integrationFormData,
      integrationFormData_full,
    },
    setters: {
      setActiveOperation,
      setActiveViewingType,
      setIntegrations,
      setSelectedIntegration,
      setIntegrationFormData,
      setIntegrationFormData_full,
    },
    refs: {},
  };
};
