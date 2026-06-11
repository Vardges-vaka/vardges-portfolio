import { useCallback } from "react";
import { setByPath } from "../../02_cK_setup_hlpr/_cK_setup_hlpr.index.js";
import { DFLT_F_D_CHANNEL } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";

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
      // setters.setChannels(response.data);
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

  const handleFormChange = useCallback(
    (name, value) => {
      setters.setChannelFormData((prev) => setByPath(prev, name, value));
    },
    [setters.setChannelFormData],
  );

  const handleCreateSubmit = useCallback(async () => {
    // const response = await apiHelpers.slsChannel_create(states.channelFormData);
    console.log("channels create submit:", states.channelFormData);
    TOAST.success({
      title: "Channel Created",
      message: `Channel created successfully`,
    });
    setters.setChannelFormData(DFLT_F_D_CHANNEL);
    setters.setActiveOperation("viewing");
  }, [
    states.channelFormData,
    setters.setChannelFormData,
    setters.setActiveOperation,
  ]);

  const handleCancelAdd = useCallback(() => {
    setters.setChannelFormData(DFLT_F_D_CHANNEL);
    setters.setActiveOperation("viewing");
  }, [setters.setChannelFormData, setters.setActiveOperation]);

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
