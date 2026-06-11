import { useCallback } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import { DFLT_F_D_SALES_PLATFORM } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

export const useCK_setup_salesPlatforms_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  TOAST,
  t,
}) => {
  const handleinitialfetch = useCallback(
    async () => {
      // const response = await apiHelpers.salesPlatform_getAll();
      // setters.setSalesPlatforms(response.data);
      TOAST.success({
        title: "Sales Platforms Fetched",
        message: `Sales platforms fetched successfully`,
      });
    },
    [
      // apiHelpers.salesPlatform_getAll,
      // setters.setSalesPlatforms
    ],
  );
  const handleAddnew = useCallback(async () => {
    console.log("useCK_setup_salesPlatforms_handlers: handleAddnew ()");
    setters.setActiveOperation("adding");
  }, [setters.setActiveOperation]);

  const handleFormChange = useCallback(
    (name, value) => {
      setters.setSalesPlatformFormData((prev) => setByPath(prev, name, value));
    },
    [setters.setSalesPlatformFormData],
  );

  const handleCreateSubmit = useCallback(async () => {
    // const response = await apiHelpers.salesPlatform_create(states.salesPlatformFormData);
    console.log("salesPlatforms create submit:", states.salesPlatformFormData);
    TOAST.success({
      title: "Sales Platform Created",
      message: `Sales platform created successfully`,
    });
    setters.setSalesPlatformFormData(DFLT_F_D_SALES_PLATFORM);
    setters.setActiveOperation("viewing");
  }, [
    states.salesPlatformFormData,
    setters.setSalesPlatformFormData,
    setters.setActiveOperation,
  ]);

  const handleCancelAdd = useCallback(() => {
    setters.setSalesPlatformFormData(DFLT_F_D_SALES_PLATFORM);
    setters.setActiveOperation("viewing");
  }, [setters.setSalesPlatformFormData, setters.setActiveOperation]);

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
