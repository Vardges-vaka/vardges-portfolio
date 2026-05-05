import { useState } from "react";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../../../05_constants/cloudStorageProviders.js";

const initMap = (val) =>
  Object.fromEntries(CLOUD_STORAGE_PROVIDERS.map((p) => [p, val]));

export const useCloudStorage_states = () => {
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [logoUrls, setLogoUrls] = useState(() => initMap(""));
  const [logoUrlsLoading, setLogoUrlsLoading] = useState(() => initMap(false));
  const [logoFiles, setLogoFiles] = useState(() => initMap(null));
  const [consoleUrlDraft, setConsoleUrlDraft] = useState(() => initMap(""));
  const [busyMap, setBusyMap] = useState({});
  const [messages, setMessages] = useState(() => initMap(null));
  const [modal, setModal] = useState(null);
  const [openMonitorPanel, setOpenMonitorPanel] = useState(null);
  const [openLogoPanel, setOpenLogoPanel] = useState(null);
  const [monitorData, setMonitorData] = useState(() => initMap(null));
  const [monitorLoading, setMonitorLoading] = useState(() => initMap(false));

  // const [urlEditing, setUrlEditing] = useState(false);
  // const [urlValue, setUrlValue] = useState(null); // provider.consoleUrl
  // const [copied, setCopied] = useState(false);
  // const copyTimerRef = useRef(null);

  return {
    states: {
      storage,
      loading,
      error,
      logoUrls,
      logoUrlsLoading,
      logoFiles,
      consoleUrlDraft,
      busyMap,
      messages,
      modal,
      openMonitorPanel,
      openLogoPanel,
      monitorData,
      monitorLoading,
      // New Ones
      // urlEditing,
      // urlValue,
      // copied,

      // // Refs
      // copyTimerRef,
    },
    setters: {
      setStorage,
      setLoading,
      setError,
      setLogoUrls,
      setLogoUrlsLoading,
      setLogoFiles,
      setConsoleUrlDraft,
      setBusyMap,
      setMessages,
      setModal,
      setOpenMonitorPanel,
      setOpenLogoPanel,
      setMonitorData,
      setMonitorLoading,
      // New Ones
      // setUrlEditing,
      // setUrlValue,
      // setCopied,
    },
    // reff: {
    //   copyTimerRef,
    // },
  };
};
