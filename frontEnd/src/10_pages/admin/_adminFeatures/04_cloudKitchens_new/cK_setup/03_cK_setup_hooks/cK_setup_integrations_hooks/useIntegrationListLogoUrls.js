import { useCallback, useEffect, useRef, useState } from "react";
import CK_gen_integration_get_fileReadUrl from "../../../../../../../05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_integration/cloudKitchen_integration_fields/CK_gen_integration_get_fileReadUrl.js";
import { isStorageObjectKey } from "../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import { getIntegrationListLogoItem } from "../../02_cK_setup_hlpr/integrationListRow_hlpr.js";

const buildLogoRequestsKey = (integrations = []) =>
  integrations
    .map((integration) => {
      const logoItem = getIntegrationListLogoItem(integration);
      const objectKey = logoItem?.url;
      if (!integration?._id || !isStorageObjectKey(objectKey)) return "";
      return `${integration._id}\0${objectKey}`;
    })
    .filter(Boolean)
    .sort()
    .join("\n");

export const useIntegrationListLogoUrls = (integrations = []) => {
  const [urlMap, setUrlMap] = useState({});
  const urlMapRef = useRef(urlMap);

  urlMapRef.current = urlMap;

  const requestsKey = buildLogoRequestsKey(integrations);

  useEffect(() => {
    if (!requestsKey) return undefined;

    const requests = requestsKey
      .split("\n")
      .filter(Boolean)
      .map((entry) => {
        const [integrationId, objectKey] = entry.split("\0");
        return { integrationId, objectKey, cacheKey: entry };
      });

    const missing = requests.filter(({ cacheKey }) => !urlMapRef.current[cacheKey]);
    if (!missing.length) return undefined;

    let cancelled = false;

    (async () => {
      const entries = await Promise.all(
        missing.map(async ({ integrationId, objectKey, cacheKey }) => {
          const res = await CK_gen_integration_get_fileReadUrl({
            id: integrationId,
            objectKey,
          });
          return [cacheKey, res?.data?.readUrl || ""];
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
  }, [requestsKey]);

  const resolveIntegrationLogoUrl = useCallback(
    (integration = {}) => {
      const logoItem = getIntegrationListLogoItem(integration);
      const raw = logoItem?.url || "";

      if (!raw) return "";
      if (raw.startsWith("blob:") || /^https?:\/\//i.test(raw)) return raw;

      const cacheKey = `${integration._id}\0${raw}`;
      return urlMap[cacheKey] || "";
    },
    [urlMap],
  );

  return { resolveIntegrationLogoUrl };
};
