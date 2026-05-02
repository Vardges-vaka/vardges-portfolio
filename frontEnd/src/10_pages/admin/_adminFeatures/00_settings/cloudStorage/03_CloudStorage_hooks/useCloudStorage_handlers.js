import { useCallback } from "react";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../../../05_constants/cloudStorageProviders.js";

const MSG_TTL = 4000;

export const useCloudStorage_handlers = ({ states, setters, apiHelpers }) => {
  const {
    Settings_get,
    Settings_putProvider,
    Settings_uploadLogo,
    Settings_getLogo,
    Settings_deleteLogo,
  } = apiHelpers;

  const {
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
  } = setters;

  const { modal, storage, logoFiles, consoleUrlDraft } = states;

  // ─── internal helpers ────────────────────────────────────────────────────

  const setBusy = useCallback(
    (key, val) => setBusyMap((prev) => ({ ...prev, [key]: val })),
    [setBusyMap],
  );

  const setMsg = useCallback(
    (provider, text, kind) => {
      setMessages((prev) => ({ ...prev, [provider]: { text, kind } }));
      setTimeout(() => {
        setMessages((prev) => {
          if (prev[provider]?.text === text)
            return { ...prev, [provider]: null };
          return prev;
        });
      }, MSG_TTL);
    },
    [setMessages],
  );

  // ─── modal ───────────────────────────────────────────────────────────────

  const openModal = useCallback(
    (type, provider, pendingData = null) =>
      setModal({ isOpen: true, type, provider, pendingData }),
    [setModal],
  );

  const closeModal = useCallback(
    () => setModal({ isOpen: false, type: null, provider: null, pendingData: null }),
    [setModal],
  );

  // ─── core API calls ──────────────────────────────────────────────────────

  const loadLogoUrl = useCallback(
    async (provider) => {
      setLogoUrlsLoading((prev) => ({ ...prev, [provider]: true }));
      const res = await Settings_getLogo(provider);
      setLogoUrlsLoading((prev) => ({ ...prev, [provider]: false }));
      setLogoUrls((prev) => ({
        ...prev,
        [provider]: res.data?.readUrl || "",
      }));
    },
    [Settings_getLogo, setLogoUrls, setLogoUrlsLoading],
  );

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await Settings_get();
    if (!res.success || !res.data) {
      setError(res.message || "loadFailed");
      setStorage(null);
      setLoading(false);
      return;
    }
    const storageData = res.data.storage ?? {};
    setStorage(storageData);
    setConsoleUrlDraft(
      Object.fromEntries(
        CLOUD_STORAGE_PROVIDERS.map((p) => [p, storageData[p]?.consoleUrl || ""]),
      ),
    );
    setLoading(false);

    await Promise.all(
      CLOUD_STORAGE_PROVIDERS.map((p) =>
        storageData[p]?.logo ? loadLogoUrl(p) : Promise.resolve(),
      ),
    );
  }, [
    Settings_get,
    loadLogoUrl,
    setConsoleUrlDraft,
    setError,
    setLoading,
    setStorage,
  ]);

  const putProvider = useCallback(
    async (provider, fields) => {
      setBusy(`${provider}:put`, true);
      const res = await Settings_putProvider(provider, fields);
      setBusy(`${provider}:put`, false);
      if (!res.success) {
        setMsg(provider, res.message || "saveFailed", "error");
        return false;
      }
      if (res.data?.storage) setStorage(res.data.storage);
      return true;
    },
    [Settings_putProvider, setBusy, setMsg, setStorage],
  );

  const doUploadLogo = useCallback(
    async (provider, file) => {
      setBusy(`${provider}:logo:upload`, true);
      const res = await Settings_uploadLogo(provider, file);
      setBusy(`${provider}:logo:upload`, false);
      if (!res.success) {
        setMsg(provider, res.message || "uploadFailed", "error");
        return;
      }
      if (res.data?.storage) setStorage(res.data.storage);
      setLogoFiles((prev) => ({ ...prev, [provider]: null }));
      setMsg(provider, "logoUploaded", "ok");
      loadLogoUrl(provider);
    },
    [
      Settings_uploadLogo,
      setBusy,
      setMsg,
      setStorage,
      setLogoFiles,
      loadLogoUrl,
    ],
  );

  const doDeleteLogo = useCallback(
    async (provider) => {
      setBusy(`${provider}:logo:delete`, true);
      const res = await Settings_deleteLogo(provider);
      setBusy(`${provider}:logo:delete`, false);
      if (!res.success) {
        setMsg(provider, res.message || "deleteFailed", "error");
        return;
      }
      if (res.data?.storage) setStorage(res.data.storage);
      setLogoUrls((prev) => ({ ...prev, [provider]: "" }));
      setMsg(provider, "logoDeleted", "ok");
    },
    [Settings_deleteLogo, setBusy, setMsg, setStorage, setLogoUrls],
  );

  // ─── confirm modal ───────────────────────────────────────────────────────

  const confirmModal = useCallback(async () => {
    const { type, provider, pendingData } = modal;
    closeModal();

    switch (type) {
      case "enable":
        if (await putProvider(provider, { isEnabled: true }))
          setMsg(provider, "enabled", "ok");
        break;
      case "disable":
        if (await putProvider(provider, { isEnabled: false })) {
          setMsg(provider, "disabled", "ok");
          setLogoUrls((prev) => ({ ...prev, [provider]: "" }));
        }
        break;
      case "setDefault":
        if (await putProvider(provider, { isDefault: true }))
          setMsg(provider, "defaultSet", "ok");
        break;
      case "deleteLogo":
        await doDeleteLogo(provider);
        break;
      case "replaceLogo":
        await doUploadLogo(provider, pendingData);
        setLogoFiles((prev) => ({ ...prev, [provider]: null }));
        break;
    }
  }, [
    modal,
    closeModal,
    putProvider,
    doDeleteLogo,
    doUploadLogo,
    setMsg,
    setLogoUrls,
    setLogoFiles,
  ]);

  // ─── user-triggered actions ──────────────────────────────────────────────

  const handleToggle = useCallback(
    (provider) => {
      const isCurrentlyEnabled = storage?.[provider]?.isEnabled;
      openModal(isCurrentlyEnabled ? "disable" : "enable", provider);
    },
    [storage, openModal],
  );

  const handleSetDefault = useCallback(
    (provider) => openModal("setDefault", provider),
    [openModal],
  );

  const handleCustomExpTimeToggle = useCallback(
    async (provider) => {
      const current = storage?.[provider]?.customExpTime ?? false;
      if (await putProvider(provider, { customExpTime: !current }))
        setMsg(provider, current ? "customExpOff" : "customExpOn", "ok");
    },
    [storage, putProvider, setMsg],
  );

  const handleConsoleUrlChange = useCallback(
    (provider, val) =>
      setConsoleUrlDraft((prev) => ({ ...prev, [provider]: val })),
    [setConsoleUrlDraft],
  );

  const handleConsoleUrlSave = useCallback(
    async (provider) => {
      const url = consoleUrlDraft[provider] ?? "";
      if (await putProvider(provider, { consoleUrl: url }))
        setMsg(provider, "urlSaved", "ok");
    },
    [consoleUrlDraft, putProvider, setMsg],
  );

  const handleLogoFileChange = useCallback(
    (provider, file) =>
      setLogoFiles((prev) => ({ ...prev, [provider]: file ?? null })),
    [setLogoFiles],
  );

  const handleLogoUpload = useCallback(
    (provider) => {
      const file = logoFiles[provider];
      if (!file) return;
      const hasExisting = !!storage?.[provider]?.logo;
      if (hasExisting) openModal("replaceLogo", provider, file);
      else doUploadLogo(provider, file);
    },
    [logoFiles, storage, openModal, doUploadLogo],
  );

  const handleLogoDelete = useCallback(
    (provider) => openModal("deleteLogo", provider),
    [openModal],
  );

  return {
    handlers: {
      reload,
      openModal,
      closeModal,
      confirmModal,
      handleToggle,
      handleSetDefault,
      handleCustomExpTimeToggle,
      handleConsoleUrlChange,
      handleConsoleUrlSave,
      handleLogoFileChange,
      handleLogoUpload,
      handleLogoDelete,
    },
  };
};
