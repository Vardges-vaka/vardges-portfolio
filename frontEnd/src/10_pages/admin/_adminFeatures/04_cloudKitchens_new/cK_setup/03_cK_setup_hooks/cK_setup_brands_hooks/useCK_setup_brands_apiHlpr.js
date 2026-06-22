import { useCallback } from "react";
import {
  CK_brnd_brand_create,
  CK_brnd_brand_getAll,
  CK_brnd_brand_getOne,
  CK_brnd_brand_delete,
  CK_brnd_brand_updateAll,
  CK_brnd_brand_update_name,
  CK_brnd_brand_update_tagline,
  CK_brnd_brand_update_files,
  CK_brnd_brand_update_socials,
  CK_brnd_brand_update_registeredIn,
  CK_brnd_brand_update_description,
  CK_brnd_brand_update_priceRange,
  CK_brnd_brand_update_cuisineTags,
  CK_brnd_brand_update_website,
  CK_brnd_brand_update_contracts,
  CK_brnd_brand_update_integrations,
  CK_brnd_brand_update_siblings,
  CK_brnd_brand_update_employees,
  CK_brnd_brand_update_equipments,
  CK_brnd_brand_update_branches,
  CK_brnd_brand_update_menus,
  CK_brnd_brand_update_competitors,
} from "../../../../../../../05_helpers/_helpers.index";

export const useCK_setup_brands_apiHlpr = () => {
  const brand_create = useCallback(
    (payload) => CK_brnd_brand_create(payload),
    [],
  );
  const brand_getAll = useCallback(() => CK_brnd_brand_getAll(), []);
  const brand_getOne = useCallback((payload) => CK_brnd_brand_getOne(payload), []);
  const brand_delete = useCallback((payload) => CK_brnd_brand_delete(payload), []);
  const brand_updateAll = useCallback(
    (payload) => CK_brnd_brand_updateAll(payload),
    [],
  );
  const brand_update_name = useCallback(
    (payload) => CK_brnd_brand_update_name(payload),
    [],
  );
  const brand_update_tagline = useCallback(
    (payload) => CK_brnd_brand_update_tagline(payload),
    [],
  );
  const brand_update_files = useCallback(
    (payload) => CK_brnd_brand_update_files(payload),
    [],
  );
  const brand_update_socials = useCallback(
    (payload) => CK_brnd_brand_update_socials(payload),
    [],
  );
  const brand_update_registeredIn = useCallback(
    (payload) => CK_brnd_brand_update_registeredIn(payload),
    [],
  );
  const brand_update_description = useCallback(
    (payload) => CK_brnd_brand_update_description(payload),
    [],
  );
  const brand_update_priceRange = useCallback(
    (payload) => CK_brnd_brand_update_priceRange(payload),
    [],
  );
  const brand_update_cuisineTags = useCallback(
    (payload) => CK_brnd_brand_update_cuisineTags(payload),
    [],
  );
  const brand_update_website = useCallback(
    (payload) => CK_brnd_brand_update_website(payload),
    [],
  );
  const brand_update_contracts = useCallback(
    (payload) => CK_brnd_brand_update_contracts(payload),
    [],
  );
  const brand_update_integrations = useCallback(
    (payload) => CK_brnd_brand_update_integrations(payload),
    [],
  );
  const brand_update_siblings = useCallback(
    (payload) => CK_brnd_brand_update_siblings(payload),
    [],
  );
  const brand_update_employees = useCallback(
    (payload) => CK_brnd_brand_update_employees(payload),
    [],
  );
  const brand_update_equipments = useCallback(
    (payload) => CK_brnd_brand_update_equipments(payload),
    [],
  );
  const brand_update_branches = useCallback(
    (payload) => CK_brnd_brand_update_branches(payload),
    [],
  );
  const brand_update_menus = useCallback(
    (payload) => CK_brnd_brand_update_menus(payload),
    [],
  );
  const brand_update_competitors = useCallback(
    (payload) => CK_brnd_brand_update_competitors(payload),
    [],
  );

  return {
    apiHelpers: {
      brand_create,
      brand_getAll,
      brand_getOne,
      brand_delete,
      brand_updateAll,
      brand_update_name,
      brand_update_tagline,
      brand_update_files,
      brand_update_socials,
      brand_update_registeredIn,
      brand_update_description,
      brand_update_priceRange,
      brand_update_cuisineTags,
      brand_update_website,
      brand_update_contracts,
      brand_update_integrations,
      brand_update_siblings,
      brand_update_employees,
      brand_update_equipments,
      brand_update_branches,
      brand_update_menus,
      brand_update_competitors,
    },
  };
};
