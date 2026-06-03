import { useCallback } from "react";

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
  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
    },
  };
};
