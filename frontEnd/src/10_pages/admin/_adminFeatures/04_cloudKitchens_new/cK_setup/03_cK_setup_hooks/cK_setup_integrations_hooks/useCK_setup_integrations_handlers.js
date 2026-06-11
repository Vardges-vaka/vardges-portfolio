import { useCallback } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import { DFLT_F_D_INTEGRATION } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

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

  const handleFormChange = useCallback(
    (name, value) => {
      setters.setIntegrationFormData((prev) => setByPath(prev, name, value));
    },
    [setters.setIntegrationFormData],
  );

  const handleCreateSubmit = useCallback(async () => {
    // const response = await apiHelpers.integration_create(states.integrationFormData);
    console.log("integrations create submit:", states.integrationFormData);
    TOAST.success({
      title: "Integration Created",
      message: `Integration created successfully`,
    });
    setters.setIntegrationFormData(DFLT_F_D_INTEGRATION);
    setters.setActiveOperation("viewing");
  }, [
    states.integrationFormData,
    setters.setIntegrationFormData,
    setters.setActiveOperation,
  ]);

  const handleCancelAdd = useCallback(() => {
    setters.setIntegrationFormData(DFLT_F_D_INTEGRATION);
    setters.setActiveOperation("viewing");
  }, [setters.setIntegrationFormData, setters.setActiveOperation]);

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
