import { useState, useRef } from "react";
import {
  DFLT_F_D_CHANNEL,
  DFLT_F_D_CHANNEL_FULL,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
export const useCK_setup_channels_states = () => {
  const [channels, setChannels] = useState([]);
  const [activeOperation, setActiveOperation] = useState("viewing");
  const [activeViewingType, setActiveViewingType] = useState("one");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channelFormData, setChannelFormData] = useState(DFLT_F_D_CHANNEL);
  const [channelFormData_full, setChannelFormData_full] = useState(
    DFLT_F_D_CHANNEL_FULL,
  );
  return {
    states: {
      activeOperation,
      activeViewingType,
      channels,
      selectedChannel,
      channelFormData,
      channelFormData_full,
    },
    setters: {
      setActiveOperation,
      setActiveViewingType,
      setChannels,
      setSelectedChannel,
      setChannelFormData,
      setChannelFormData_full,
    },
    refs: {},
  };
};
