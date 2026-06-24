import { useCallback, useEffect, useRef, useState } from "react";
import CK_gen_salesPlatform_get_fileReadUrl from "../../../../../../../05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_general/cloudKitchen_salesPlatform/cloudKitchen_salesPlatform_fields/CK_gen_salesPlatform_get_fileReadUrl.js";
import { isStorageObjectKey } from "../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import { hasSalesPlatformLogoUrl } from "../../02_cK_setup_hlpr/salesPlatformListRow_hlpr.js";

const buildLogoRequestsKey = (platforms = []) =>
  platforms
    .map((platform) => {
      const objectKey = platform.links?.logoUrl;
      if (!platform?._id || !isStorageObjectKey(objectKey)) return "";
      return `${platform._id}\0${objectKey}`;
    })
    .filter(Boolean)
    .sort()
    .join("\n");

/**
 * Resolves stored logo object keys for every sales platform in the list view.
 */
export const useSalesPlatformListLogoUrls = (platforms = []) => {
  const [urlMap, setUrlMap] = useState({});
  const urlMapRef = useRef(urlMap);

  urlMapRef.current = urlMap;

  const requestsKey = buildLogoRequestsKey(platforms);

  useEffect(() => {
    if (!requestsKey) return undefined;

    const requests = requestsKey
      .split("\n")
      .filter(Boolean)
      .map((entry) => {
        const [platformId, objectKey] = entry.split("\0");
        return { platformId, objectKey, cacheKey: entry };
      });

    const missing = requests.filter(({ cacheKey }) => !urlMapRef.current[cacheKey]);
    if (!missing.length) return undefined;

    let cancelled = false;

    (async () => {
      const entries = await Promise.all(
        missing.map(async ({ platformId, objectKey, cacheKey }) => {
          const res = await CK_gen_salesPlatform_get_fileReadUrl({
            id: platformId,
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

  const resolveSalesPlatformLogoUrl = useCallback(
    (platform = {}) => {
      if (!hasSalesPlatformLogoUrl(platform)) return "";

      const raw = platform.links.logoUrl.trim();

      if (
        raw.startsWith("blob:") ||
        raw.startsWith("data:") ||
        /^https?:\/\//i.test(raw)
      ) {
        return raw;
      }

      if (isStorageObjectKey(raw)) {
        const cacheKey = `${platform._id}\0${raw}`;
        return urlMap[cacheKey] || "";
      }

      return "";
    },
    [urlMap],
  );

  return { resolveSalesPlatformLogoUrl };
};
