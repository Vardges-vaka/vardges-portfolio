import { useCallback, useEffect, useState } from "react";
import CK_gen_salesPlatform_get_fileReadUrl from "../../../../../../../05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_salesPlatform/cloudKitchen_salesPlatform_fields/CK_gen_salesPlatform_get_fileReadUrl.js";
import { isStorageObjectKey } from "../../02_cK_setup_hlpr/brandFiles_hlpr.js";

/**
 * Resolves a single sales-platform logo object key to a signed read URL.
 * @param {string} salesPlatformId
 * @param {string} logoUrl
 * @param {{ enabled?: boolean }} options — pass enabled:false in edit mode to skip network calls
 */
export const useSalesPlatformLogoReadUrl = (
  salesPlatformId,
  logoUrl = "",
  { enabled = true } = {},
) => {
  const [readUrl, setReadUrl] = useState("");

  const objectKey = isStorageObjectKey(logoUrl) ? logoUrl.trim() : "";

  useEffect(() => {
    if (!enabled || !salesPlatformId || !objectKey) {
      setReadUrl("");
      return undefined;
    }

    let cancelled = false;

    (async () => {
      const res = await CK_gen_salesPlatform_get_fileReadUrl({
        id: salesPlatformId,
        objectKey,
      });

      if (!cancelled) {
        setReadUrl(res?.data?.readUrl || "");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled, objectKey, salesPlatformId]);

  const resolveLogoUrl = useCallback(
    (url = logoUrl) => {
      const raw = typeof url === "string" ? url.trim() : "";
      if (!raw) return "";
      if (
        raw.startsWith("blob:") ||
        raw.startsWith("data:") ||
        /^https?:\/\//i.test(raw)
      ) {
        return raw;
      }
      if (isStorageObjectKey(raw)) return readUrl || "";
      return "";
    },
    [logoUrl, readUrl],
  );

  return { resolveLogoUrl, readUrl };
};
