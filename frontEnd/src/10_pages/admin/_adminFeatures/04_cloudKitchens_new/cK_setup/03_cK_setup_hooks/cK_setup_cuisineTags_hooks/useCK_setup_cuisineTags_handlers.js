import { useCallback } from "react";

export const useCK_setup_cuisineTags_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  TOAST,
  t,
}) => {
  const handleinitialfetch = useCallback(
    async () => {
      // const response = await apiHelpers.cuisTag_getAll();
      // setters.setSalesPlatforms(response.data);
      TOAST.success({
        title: "Cuisine Tags Fetched",
        message: `Cuisine tags fetched successfully`,
      });
    },
    [
      // apiHelpers.cuisTag_getAll,
      // setters.setCuisineTags
    ],
  );
  const handleAddnew = useCallback(async () => {
    console.log("useCK_setup_cuisineTags_handlers: handleAddnew ()");
    setters.setActiveOperation("adding");
  }, [setters.setActiveOperation]);
  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
    },
  };
};