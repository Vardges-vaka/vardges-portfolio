import { useCallback } from "react";

export const useCK_setup_channels_handlers = ({
  states,
  setters,
  refs,
  apiHelpers,
  TOAST,
  t,
}) => {
  const handleinitialfetch = useCallback(
    async () => {
      // const response = await apiHelpers.slsChannel_getAll();
      // setters.setSalesPlatforms(response.data);
      TOAST.success({
        title: "Channels Fetched",
        message: `Channels fetched successfully`,
      });
    },
    [
      // apiHelpers.slsChannel_getAll,
      // setters.setChannels
    ],
  );
  const handleAddnew = useCallback(async () => {
    console.log("useCK_setup_channels_handlers: handleAddnew ()");
    setters.setActiveOperation("adding");
  }, [setters.setActiveOperation]);
  return {
    handlers: {
      handleinitialfetch,
      handleAddnew,
    },
  };
};