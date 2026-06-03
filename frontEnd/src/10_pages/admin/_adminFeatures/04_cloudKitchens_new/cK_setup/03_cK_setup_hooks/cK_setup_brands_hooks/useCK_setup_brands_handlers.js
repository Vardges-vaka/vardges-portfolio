import { useCallback } from "react";

export const useCK_setup_brands_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  TOAST,
  t,
}) => {
  const handleinitialfetch = useCallback(
    async () => {
      // const response = await apiHelpers.brand_getAll();
      // setters.setSalesPlatforms(response.data);
      TOAST.success({
        title: "Brands Fetched",
        message: `Brands fetched successfully`,
      });
    },
    [
      // apiHelpers.brand_getAll,
      // setters.setBrands
    ],
  );
  const handleAddnew = useCallback(async () => {
    console.log("useCK_setup_brands_handlers: handleAddnew ()");
    setters.setActiveOperation("adding");
  }, [setters.setActiveOperation]);
  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
    },
  };
};
