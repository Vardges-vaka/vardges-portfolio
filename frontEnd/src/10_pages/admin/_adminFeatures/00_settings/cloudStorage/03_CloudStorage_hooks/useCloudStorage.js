import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../../../05_constants/cloudStorageProviders.js";

import { useCloudStorage_states } from "./useCloudStorage_states.js";
import { useCloudStorage_apiHelpers } from "./useCloudStorage_apiHelpers.js";
import { useCloudStorage_handlers } from "./useCloudStorage_handlers.js";

export const useCloudStorage = () => {
  const { t } = useTranslation("settingsCloud");

  const { states, setters } = useCloudStorage_states();
  const { apiHelpers } = useCloudStorage_apiHelpers();
  const { handlers } = useCloudStorage_handlers({ states, setters, apiHelpers });

  useEffect(() => {
    handlers.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentDefault = CLOUD_STORAGE_PROVIDERS.find(
    (p) => states.storage?.[p]?.isDefault,
  ) ?? null;

  const cards = CLOUD_STORAGE_PROVIDERS.map((provider) => {
    const meta = states.storage?.[provider] ?? {
      isEnabled: false,
      isDefault: false,
      logo: "",
      consoleUrl: "",
      customExpTime: false,
    };
    const isBusy = (action) => !!states.busyMap[`${provider}:${action}`];

    return {
      CloudStorage_ProviderCard_props: {
        provider,
        meta,
        logoUrl: states.logoUrls[provider] ?? "",
        logoUrlLoading: states.logoUrlsLoading[provider] ?? false,
        logoFile: states.logoFiles[provider] ?? null,
        consoleUrlDraft: states.consoleUrlDraft[provider] ?? "",
        message: states.messages[provider] ?? null,
        isBusy,
        onToggle: () => handlers.handleToggle(provider),
        onSetDefault: () => handlers.handleSetDefault(provider),
        onCustomExpTimeToggle: () => handlers.handleCustomExpTimeToggle(provider),
        onConsoleUrlChange: (val) => handlers.handleConsoleUrlChange(provider, val),
        onConsoleUrlSave: () => handlers.handleConsoleUrlSave(provider),
        onLogoFileChange: (file) => handlers.handleLogoFileChange(provider, file),
        onLogoUpload: () => handlers.handleLogoUpload(provider),
        onLogoDelete: () => handlers.handleLogoDelete(provider),
        t,
      },
    };
  });

  const compProps = {
    CloudStorage_ConfirmModal_props: {
      isOpen: states.modal.isOpen,
      type: states.modal.type,
      provider: states.modal.provider,
      previousDefault: currentDefault
        ? t(`providers.${currentDefault}`, { defaultValue: currentDefault })
        : "—",
      t,
      onConfirm: handlers.confirmModal,
      onCancel: handlers.closeModal,
    },
    cards,
  };

  return { t, states, handlers, compProps };
};
