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
    Settings_getMonitor,
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
    setOpenMonitorPanel,
    setOpenLogoPanel,
    setMonitorData,
    setMonitorLoading,
  } = setters;

  const {
    modal,
    storage,
    logoFiles,
    consoleUrlDraft,
    monitorData,
    monitorLoading,
  } = states;

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

  const closeModal = useCallback(() => setModal(null), [setModal]);

  const confirmModal = useCallback(async () => {
    if (modal?.onConfirm) await modal.onConfirm();
    closeModal();
  }, [modal, closeModal]);

  // ─── monitor data ─────────────────────────────────────────────────────────

  const loadMonitorData = useCallback(
    async (provider, refresh = false) => {
      setMonitorLoading((prev) => ({ ...prev, [provider]: true }));
      const res = await Settings_getMonitor(provider, refresh);
      setMonitorLoading((prev) => ({ ...prev, [provider]: false }));
      if (res.success && res.data) {
        setMonitorData((prev) => ({ ...prev, [provider]: res.data }));
      }
    },
    [Settings_getMonitor, setMonitorData, setMonitorLoading],
  );

  // ─── panel toggles ───────────────────────────────────────────────────────

  const toggleMonitorPanel = useCallback(
    (id) => {
      setOpenMonitorPanel((cur) => {
        const opening = cur !== id;
        if (opening && !monitorData[id] && !monitorLoading[id]) {
          loadMonitorData(id);
        }
        return opening ? id : null;
      });
    },
    [setOpenMonitorPanel, monitorData, monitorLoading, loadMonitorData],
  );

  const toggleLogoPanel = useCallback(
    (id) => setOpenLogoPanel((cur) => (cur === id ? null : id)),
    [setOpenLogoPanel],
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
      setOpenLogoPanel(null);
      setMsg(provider, "logoUploaded", "ok");
      loadLogoUrl(provider);
    },
    [
      Settings_uploadLogo,
      setBusy,
      setMsg,
      setStorage,
      setLogoFiles,
      setOpenLogoPanel,
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

  // ─── user-triggered actions ──────────────────────────────────────────────

  const handleToggle = useCallback(
    (provider) => {
      const isEnabled = storage?.[provider]?.isEnabled;
      const providerLabel = provider;
      if (isEnabled) {
        setModal({
          title: `Disable ${providerLabel}?`,
          body: `Are you sure you want to <strong>disable</strong> <strong>${providerLabel}</strong> as a storage provider?`,
          danger: true,
          onConfirm: async () => {
            if (await putProvider(provider, { isEnabled: false })) {
              setMsg(provider, "disabled", "ok");
              setLogoUrls((prev) => ({ ...prev, [provider]: "" }));
            }
          },
        });
      } else {
        setModal({
          title: `Enable ${providerLabel}?`,
          body: `Are you sure you want to <strong>enable</strong> <strong>${providerLabel}</strong> as a storage provider?`,
          danger: false,
          onConfirm: async () => {
            if (await putProvider(provider, { isEnabled: true }))
              setMsg(provider, "enabled", "ok");
          },
        });
      }
    },
    [storage, setModal, putProvider, setMsg, setLogoUrls],
  );

  const handleSetDefault = useCallback(
    (provider) => {
      const currentDefault = CLOUD_STORAGE_PROVIDERS.find(
        (p) => storage?.[p]?.isDefault,
      );
      setModal({
        title: `Set ${provider} as default?`,
        body: `This will make <strong>${provider}</strong> the default upload target.${
          currentDefault && currentDefault !== provider
            ? ` <strong>${currentDefault}</strong> will lose its default status.`
            : ""
        }`,
        danger: false,
        onConfirm: async () => {
          if (await putProvider(provider, { isDefault: true }))
            setMsg(provider, "defaultSet", "ok");
        },
      });
    },
    [storage, setModal, putProvider, setMsg],
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
    async (provider, url) => {
      const resolvedUrl = url ?? consoleUrlDraft[provider] ?? "";
      if (await putProvider(provider, { consoleUrl: resolvedUrl }))
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
      doUploadLogo(provider, file);
    },
    [logoFiles, doUploadLogo],
  );

  const handleLogoDelete = useCallback(
    (provider) => {
      setModal({
        title: `Delete logo for ${provider}?`,
        body: `This will permanently remove the logo for <strong>${provider}</strong>.`,
        danger: true,
        onConfirm: async () => doDeleteLogo(provider),
      });
    },
    [setModal, doDeleteLogo],
  );

  const handleLogoUploadRequest = useCallback(
    (provider, file) => {
      const isReplace = !!storage?.[provider]?.logo;
      setModal({
        title: isReplace ? `Replace logo for ${provider}?` : `Upload logo for ${provider}?`,
        body: isReplace
          ? `This will <strong>replace</strong> the existing logo for <strong>${provider}</strong>.`
          : `Upload this file as the logo for <strong>${provider}</strong>?`,
        danger: false,
        onConfirm: () => doUploadLogo(provider, file),
      });
    },
    [storage, setModal, doUploadLogo],
  );

  return {
    handlers: {
      reload,
      closeModal,
      confirmModal,
      toggleMonitorPanel,
      toggleLogoPanel,
      loadMonitorData,
      handleToggle,
      handleSetDefault,
      handleCustomExpTimeToggle,
      handleConsoleUrlChange,
      handleConsoleUrlSave,
      handleLogoFileChange,
      handleLogoUpload,
      handleLogoDelete,
      handleLogoUploadRequest,
      doUploadLogo,
    },
  };
};
