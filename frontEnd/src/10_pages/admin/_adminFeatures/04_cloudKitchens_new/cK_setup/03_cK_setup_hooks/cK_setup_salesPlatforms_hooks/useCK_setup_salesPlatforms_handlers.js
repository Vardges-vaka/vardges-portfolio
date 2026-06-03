import { useCallback } from "react";

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
  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
    },
  };
};
