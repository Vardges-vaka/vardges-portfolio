import { useState, useRef, useEffect } from "react";

export const useCloudStorage_ProviderRow = ({ provider, states, handlers }) => {
  const [urlEditing, setUrlEditing] = useState(false);
  const [urlValue, setUrlValue] = useState(provider.consoleUrl);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    setUrlValue(provider.consoleUrl);
  }, [provider.consoleUrl]);

  function handleSaveUrl() {
    handlers.onSaveUrl(urlValue.trim(), provider.id);
    setUrlEditing(false);
  }

  function handleCancelUrl() {
    setUrlValue(provider.consoleUrl);
    setUrlEditing(false);
  }

  function handleCopyUrl() {
    navigator.clipboard.writeText(provider.consoleUrl).catch(() => {});
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  }

  function handleLogoUploaded(file) {
    handlers.onLogoUploaded(file, provider.id); // opens the confirm modal — actual upload happens on modal confirm
  }

  const linktoConsole = () => {
    window.open(provider.consoleUrl, "_blank", "noopener,noreferrer");
  };

  const isMonitorOpen = states.monitorOpen === provider.id;
  const isUploadOpen = states.uploadOpen === provider.id;
  return {
    states: {
      urlEditing,
      urlValue,
      copied,
      isMonitorOpen,
      isUploadOpen,
    },
    handlers: {
      handleSaveUrl,
      handleCancelUrl,
      handleCopyUrl,
      handleLogoUploaded,
      linktoConsole,
    },
    setters: {
      setUrlEditing,
      setUrlValue,
      setCopied,
    },
  };
};
