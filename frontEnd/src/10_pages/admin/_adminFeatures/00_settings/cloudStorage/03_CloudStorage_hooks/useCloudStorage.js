import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../../../05_constants/cloudStorageProviders.js";
import {
  LOGO_COLORS,
  SHORT_NAMES,
  IMPLEMENTED_PROVIDERS,
} from "../05_CloudStorage_cnst/_CloudStorage_cnst.index.js";
import {
  getCloudStorageFilesSummary,
  getCloudStoragePaymentSummary,
  getCloudStorageUsageSummary,
} from "../02_CloudStorage_helpers/_CloudStorage_helpers.index.js";

import { useCloudStorage_states } from "./useCloudStorage_states.js";
import { useCloudStorage_apiHelpers } from "./useCloudStorage_apiHelpers.js";
import { useCloudStorage_handlers } from "./useCloudStorage_handlers.js";

const getProviderSortRank = (provider) => {
  if (provider.isDefault) return 0;
  if (provider.enabled) return 1;
  return 2;
};

export const useCloudStorage = () => {
  const { t } = useTranslation("settingsCloud");

  const { states, setters } = useCloudStorage_states();
  const { apiHelpers } = useCloudStorage_apiHelpers();
  const { handlers } = useCloudStorage_handlers({
    states,
    setters,
    apiHelpers,
  });

  useEffect(() => {
    handlers.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!states.storage) return;

    CLOUD_STORAGE_PROVIDERS.forEach((p) => {
      if (!IMPLEMENTED_PROVIDERS.includes(p)) return;
      if (states.monitorData[p] || states.monitorLoading[p]) return;
      handlers.loadMonitorData(p);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.storage]);

  const providers = CLOUD_STORAGE_PROVIDERS.map((p, providerOrder) => {
    const monitoring = states.monitorData[p] ?? null;

    return {
      id: p,
      name: t(`providers.${p}`, { defaultValue: p }),
      shortName: SHORT_NAMES[p],
      enabled: states.storage?.[p]?.isEnabled ?? false,
      isDefault: states.storage?.[p]?.isDefault ?? false,
      customExpiry: states.storage?.[p]?.customExpTime ?? false,
      consoleUrl: states.storage?.[p]?.consoleUrl ?? "",
      hasLogo: !!states.storage?.[p]?.logo,
      logoUrl: states.logoUrls[p] ?? "",
      logoColor: LOGO_COLORS[p],
      implemented: IMPLEMENTED_PROVIDERS.includes(p),
      monitoring,
      filesSummary: getCloudStorageFilesSummary(monitoring),
      usageSummary: getCloudStorageUsageSummary(monitoring),
      paymentSummary: getCloudStoragePaymentSummary(monitoring),
      monitorLoading: states.monitorLoading[p] ?? false,
      isLogoUploading: !!states.busyMap[`${p}:logo:upload`],
      providerOrder,
    };
  }).sort((a, b) => {
    const rankDiff = getProviderSortRank(a) - getProviderSortRank(b);
    return rankDiff || a.providerOrder - b.providerOrder;
  });
  const CS_ProviderRow_props = {
    states: {
      monitorOpen: states.openMonitorPanel,
      uploadOpen: states.openLogoPanel,
    },
    handlers: {
      onToggleMonitor: (id) => handlers.toggleMonitorPanel(id),
      onToggleUpload: (id) => handlers.toggleLogoPanel(id),
      onToggleEnabled: (id) => handlers.handleToggle(id),
      onSetDefault: (id) => handlers.handleSetDefault(id),
      onToggleExpiry: (id) => handlers.handleCustomExpTimeToggle(id),
      onSaveUrl: (url, id) => handlers.handleConsoleUrlSave(id, url),
      onLogoUploaded: (file, id) => handlers.handleLogoUploadRequest(id, file),
      onCopyUrl: (provider, setCopied, copyTimerRef) =>
        handlers.handleCopyUrl(provider, setCopied, copyTimerRef),
    },
    compProps: {},
  };

  const CS_table_props = {
    states: {
      loading: states.loading,
      providers: providers,
    },
    handlers: {
      onToggleMonitor: (id) => handlers.toggleMonitorPanel(id),
      onToggleUpload: (id) => handlers.toggleLogoPanel(id),
      onToggleEnabled: (id) => handlers.handleToggle(id),
      onSetDefault: (id) => handlers.handleSetDefault(id),
      onToggleExpiry: (id) => handlers.handleCustomExpTimeToggle(id),
      onSaveUrl: (url, id) => handlers.handleConsoleUrlSave(id, url),
      onLogoUploaded: (file, id) => handlers.handleLogoUploadRequest(id, file),
    },
    compProps: {
      CS_ProviderRow_props: CS_ProviderRow_props,
    },
  };

  /*

      <CloudStorage_table
        loading={states.loading}
        compProps={compProps}
        openMonitorPanel={states.openMonitorPanel}
        openLogoPanel={states.openLogoPanel}
        onToggleMonitor={}
        onToggleUpload={}
        onToggleEnabled={}
        onSetDefault={(id) => handlers.handleSetDefault(id)}
        onToggleExpiry={(id) => handlers.handleCustomExpTimeToggle(id)}
        onSaveUrl={(url, id) => handlers.handleConsoleUrlSave(id, url)}
        onLogoUploaded={(file, id) =>
          handlers.handleLogoUploadRequest(id, file)
        }
      />

*/

  const CS_ConfirmModal_props = {
    states: {
      isOpen: !!states.modal,
      title: states.modal?.title ?? "",
      body: states.modal?.body ?? "",
      isDanger: states.modal?.danger ?? false,
    },
    handlers: {
      onConfirm: handlers.confirmModal,
      onCancel: handlers.closeModal,
    },
  };

  const compProps = {
    providers,
    CS_table_props: CS_table_props,
    CS_ConfirmModal_props: CS_ConfirmModal_props,
  };

  return { t, states, handlers, compProps };
};
