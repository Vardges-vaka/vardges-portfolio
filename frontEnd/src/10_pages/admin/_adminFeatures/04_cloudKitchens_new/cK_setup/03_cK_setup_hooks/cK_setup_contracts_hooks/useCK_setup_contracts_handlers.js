import { useCallback } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import { DFLT_F_D_CONTRACT } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

export const useCK_setup_contracts_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  TOAST,
  t,
}) => {
  const handleinitialfetch = useCallback(
    async () => {
      // const response = await apiHelpers.contract_getAll();
      // setters.setContracts(response.data);
      TOAST.success({
        title: "Contracts Fetched",
        message: `Contracts fetched successfully`,
      });
    },
    [
      // apiHelpers.contract_getAll,
      // setters.setContracts
    ],
  );
  const handleAddnew = useCallback(async () => {
    console.log("useCK_setup_contracts_handlers: handleAddnew ()");
    setters.setActiveOperation("adding");
  }, [setters.setActiveOperation]);

  const handleFormChange = useCallback(
    (name, value) => {
      setters.setContractFormData((prev) => setByPath(prev, name, value));
    },
    [setters.setContractFormData],
  );

  const handleCreateSubmit = useCallback(async () => {
    // const response = await apiHelpers.contract_create(states.contractFormData);
    console.log("contracts create submit:", states.contractFormData);
    TOAST.success({
      title: "Contract Created",
      message: `Contract created successfully`,
    });
    setters.setContractFormData(DFLT_F_D_CONTRACT);
    setters.setActiveOperation("viewing");
  }, [
    states.contractFormData,
    setters.setContractFormData,
    setters.setActiveOperation,
  ]);

  const handleCancelAdd = useCallback(() => {
    setters.setContractFormData(DFLT_F_D_CONTRACT);
    setters.setActiveOperation("viewing");
  }, [setters.setContractFormData, setters.setActiveOperation]);

  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
      handleFormChange,
      handleCreateSubmit,
      handleCancelAdd,
    },
  };
};
