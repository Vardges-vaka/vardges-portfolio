import { useState, useRef } from "react";
import {
  DFLT_F_D_CONTRACT,
  DFLT_F_D_CONTRACT_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
export const useCK_setup_contracts_states = () => {
  const [contracts, setContracts] = useState([]);
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("one");
  const [selectedContract, setSelectedContract] = useState(null);
  const [contractFormData, setContractFormData] = useState(DFLT_F_D_CONTRACT);
  const [contractFormData_full, setContractFormData_full] = useState(
    DFLT_F_D_CONTRACT_FULL,
  );
  return {
    states: {
      activeOperation,
      activeViewingType,
      contracts,
      selectedContract,
      contractFormData,
      contractFormData_full,
    },
    setters: {
      setActiveOperation,
      setActiveViewingType,
      setContracts,
      setSelectedContract,
      setContractFormData,
      setContractFormData_full,
    },
    refs: {},
  };
};
