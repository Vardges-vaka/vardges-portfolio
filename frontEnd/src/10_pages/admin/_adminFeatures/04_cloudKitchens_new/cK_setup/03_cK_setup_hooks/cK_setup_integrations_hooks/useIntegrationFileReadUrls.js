import { useCallback, useEffect, useRef, useState } from "react";
import CK_gen_integration_get_fileReadUrl from "../../../../../../../05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_integration/cloudKitchen_integration_fields/CK_gen_integration_get_fileReadUrl.js";
import { isStorageObjectKey } from "../../02_cK_setup_hlpr/brandFiles_hlpr.js";

const collectObjectKeysKey = (items = []) =>
  [...items]
    .map((item) => item?.url)
    .filter((url) => isStorageObjectKey(url))
    .sort()
    .join("\0");

export const useIntegrationFileReadUrls = (
  integrationId,
  files,
  { enabled = true } = {},
) => {
  const [urlMap, setUrlMap] = useState({});
  const urlMapRef = useRef(urlMap);

  urlMapRef.current = urlMap;
  const objectKeysKey = collectObjectKeysKey(files?.items);

  useEffect(() => {
    if (!enabled || !integrationId || !objectKeysKey) {
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
          const res = await CK_gen_integration_get_fileReadUrl({
            id: integrationId,
            objectKey,
          });
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
  }, [enabled, integrationId, objectKeysKey]);

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
