import { useCallback } from "react";

export const useCK_setup_integrations_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  TOAST,
  t,
}) => {
  const handleinitialfetch = useCallback(
    async () => {
      // const response = await apiHelpers.integration_getAll();
      // setters.setIntegrations(response.data);
      TOAST.success({
        title: "Integrations Fetched",
        message: `Integrations fetched successfully`,
      });
    },
    [
      // apiHelpers.integration_getAll,
      // setters.setIntegrations
    ],
  );
  const handleAddnew = useCallback(async () => {
    console.log("useCK_setup_integrations_handlers: handleAddnew ()");
    setters.setActiveOperation("adding");
  }, [setters.setActiveOperation]);
  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
    },
  };
};
