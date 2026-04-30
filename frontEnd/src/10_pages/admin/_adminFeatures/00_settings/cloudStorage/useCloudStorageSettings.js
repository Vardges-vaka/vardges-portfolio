import { useCallback, useEffect, useState } from "react";

import Settings_get from "../../../../../05_helpers/apiHelpers/admin/adminFeatures/settings/Settings_get.js";
import Settings_patchStorage from "../../../../../05_helpers/apiHelpers/admin/adminFeatures/settings/Settings_patchStorage.js";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../../05_constants/cloudStorageProviders.js";

/**
 * Loads / mutates Settings.storage toggles (`isEnabled`, `isDefault`).
 * Mirrors backend normalization: at least one default among enabled when any enabled.
 */
export const useCloudStorageSettings = () => {
  const [storage, setStorage] = useState(/** @type {Record<string, any> | null} */ (null));
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState(/** @type {string | null} */ (null));
  const [error, setError] = useState(/** @type {string | null} */ (null));

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
    setStorage(res.data.storage ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  /** @param {"isEnabled"|"isDefault"} toggled */
  const patch = async (provider, toggled, nextBool) => {
    setBusyKey(`${provider}:${toggled}`);
    setError(null);

    /** @type {{ provider: string, isEnabled?: boolean, isDefault?: boolean }} */
    const payload = { provider };
    if (toggled === "isEnabled") payload.isEnabled = nextBool;
    else payload.isDefault = nextBool;

    const res = await Settings_patchStorage(payload);
    setBusyKey(null);

    if (!res.success || !res.data?.storage) {
      setError(res.message || "patchFailed");
      return;
    }

    setStorage(res.data.storage);
  };

  const rows = CLOUD_STORAGE_PROVIDERS.map((key) => ({
    key,
    meta: storage?.[key] ?? {
      isEnabled: false,
      isDefault: false,
      logo: "",
      consoleUrl: "",
    },
  }));

  return {
    loading,
    error,
    busyKey,
    rows,
    reload,
    patchToggle: patch,
    setError,
  };
};
