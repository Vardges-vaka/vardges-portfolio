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
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    provider: null,
    pendingData: null,
  });

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
    },
  };
};
