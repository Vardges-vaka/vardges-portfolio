import { useCallback, useEffect, useRef, useState } from "react";
import CK_brnd_brand_get_fileReadUrl from "../../../../../../../05_helpers/apiHelpers/admin/adminFeatures/cloudKitchen_apiHelpers/cloudKitchen_brand/cloudKitchen_brand/cloudKitchen_brand_fields/CK_brnd_brand_get_fileReadUrl.js";
import { isStorageObjectKey } from "../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import { getBrandListLogoItem } from "../../02_cK_setup_hlpr/brandListRow_hlpr.js";

const buildLogoRequestsKey = (brands = []) =>
  brands
    .map((brand) => {
      const logoItem = getBrandListLogoItem(brand);
      const objectKey = logoItem?.url;
      if (!brand?._id || !isStorageObjectKey(objectKey)) return "";
      return `${brand._id}\0${objectKey}`;
    })
    .filter(Boolean)
    .sort()
    .join("\n");

/**
 * Resolves display-logo object keys for every brand in the list view.
 */
export const useBrandListLogoUrls = (brands = []) => {
  const [urlMap, setUrlMap] = useState({});
  const urlMapRef = useRef(urlMap);

  urlMapRef.current = urlMap;

  const requestsKey = buildLogoRequestsKey(brands);

  useEffect(() => {
    if (!requestsKey) return undefined;

    const requests = requestsKey
      .split("\n")
      .filter(Boolean)
      .map((entry) => {
        const [brandId, objectKey] = entry.split("\0");
        return { brandId, objectKey, cacheKey: entry };
      });

    const missing = requests.filter(({ cacheKey }) => !urlMapRef.current[cacheKey]);
    if (!missing.length) return undefined;

    let cancelled = false;

    (async () => {
      const entries = await Promise.all(
        missing.map(async ({ brandId, objectKey, cacheKey }) => {
          const res = await CK_brnd_brand_get_fileReadUrl({ id: brandId, objectKey });
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

  const resolveBrandLogoUrl = useCallback(
    (brand = {}) => {
      const logoItem = getBrandListLogoItem(brand);
      const raw = logoItem?.url || "";

      if (!raw) return "";
      if (raw.startsWith("blob:") || /^https?:\/\//i.test(raw)) return raw;

      const cacheKey = `${brand._id}\0${raw}`;
      return urlMap[cacheKey] || "";
    },
    [urlMap],
  );

  return { resolveBrandLogoUrl };
};
