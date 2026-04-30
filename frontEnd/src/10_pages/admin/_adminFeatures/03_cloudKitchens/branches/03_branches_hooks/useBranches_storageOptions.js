import { useCallback, useEffect, useState } from "react";

import { Settings_get } from "../../../../../../05_helpers/apiHelpers/admin/adminFeatures/settings/_apiHelpers_adminSettings_cloudStorage.index.js";
import { CLOUD_STORAGE_PROVIDERS } from "../../../../../../05_constants/cloudStorageProviders.js";

/**
 * Loads global storage toggles for building branch file-provider pickers.
 * Each key matches Settings.storage[provider]. Shows all four providers in UI even when disabled.
 */
export const useBranches_storageOptions = () => {
  const [storage, setStorage] = useState(/** @type {Record<string, any> | null} */ (null));
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(/** @type {string | null} */ (null));

  const reload = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    const res = await Settings_get();
    if (!res.success || !res.data) {
      setLoadError(res.message || "Could not load storage settings");
      setStorage(null);
      setLoading(false);
      return;
    }
    setStorage(res.data.storage ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await Settings_get();
      if (cancelled) return;
      if (!res.success || !res.data) {
        setLoadError(res.message || "Could not load storage settings");
        setStorage(null);
      } else {
        setStorage(res.data.storage ?? null);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /** Normalised rows — always four providers, in product order. */
  const rows = CLOUD_STORAGE_PROVIDERS.map((key) => ({
    key,
    meta: storage?.[key] ?? {
      isEnabled: false,
      isDefault: false,
      logo: "",
      consoleUrl: "",
    },
  }));

  return { storage, loading, error: loadError, rows, reload };
};
