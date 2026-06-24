import { useCallback, useEffect, useRef, useState } from "react";
import CK_brnd_brand_get_fileReadUrl from "../../../../../../../05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_brand/cloudKitchen_brand/cloudKitchen_brand_fields/CK_brnd_brand_get_fileReadUrl.js";
import { isStorageObjectKey } from "../../02_cK_setup_hlpr/brandFiles_hlpr.js";

const collectObjectKeysKey = (items = []) =>
  [...items]
    .map((item) => item?.url)
    .filter((url) => isStorageObjectKey(url))
    .sort()
    .join("\0");

/**
 * Resolves cloud object keys to signed read URLs.
 * @param {string} brandId
 * @param {{ items?: object[] }} files
 * @param {{ enabled?: boolean }} options — pass enabled:false in edit mode to skip network calls
 */
export const useBrandFileReadUrls = (brandId, files, { enabled = true } = {}) => {
  const [urlMap, setUrlMap] = useState({});
  const urlMapRef = useRef(urlMap);

  urlMapRef.current = urlMap;

  // Recomputed each render, but effect only runs when this string changes (not on metadata edits).
  const objectKeysKey = collectObjectKeysKey(files?.items);

  useEffect(() => {
    if (!enabled || !brandId || !objectKeysKey) {
      return undefined;
    }

    const objectKeys = objectKeysKey.split("\0").filter(Boolean);
    const missingKeys = objectKeys.filter((key) => !urlMapRef.current[key]);

    if (!missingKeys.length) {
      return undefined;
    }

    let cancelled = false;

    (async () => {
      const entries = await Promise.all(
        missingKeys.map(async (objectKey) => {
          const res = await CK_brnd_brand_get_fileReadUrl({ id: brandId, objectKey });
          return [objectKey, res?.data?.readUrl || ""];
        }),
      );

      if (!cancelled) {
        setUrlMap((prev) => ({
          ...prev,
          ...Object.fromEntries(entries),
        }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [brandId, enabled, objectKeysKey]);

  const resolveFileUrl = useCallback(
    (url = "") => {
      if (!url) return "";
      if (isStorageObjectKey(url)) return urlMap[url] || "";
      return url;
    },
    [urlMap],
  );

  return { resolveFileUrl, urlMap };
};
