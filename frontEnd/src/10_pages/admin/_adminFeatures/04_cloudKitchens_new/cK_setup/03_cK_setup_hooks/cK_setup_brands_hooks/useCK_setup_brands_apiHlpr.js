import { useCallback } from "react";
import {
  // Crud
  CK_brnd_brand_create,
  CK_brnd_brand_getAll,
  CK_brnd_brand_getOne,
  CK_brnd_brand_delete,
  CK_brnd_brand_updateAll,
  // Fields
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

export const useCK_setup_brands_apiHlpr = ({ TOAST }) => {
  const brand_create = useCallback(
    (payload) => CK_brnd_brand_create(payload),
    [],
  );
  const brand_getAll = useCallback(() => CK_brnd_brand_getAll(), []);
  const brand_getOne = useCallback(() => {}, []);
  const brand_delete = useCallback(() => {}, []);
  const brand_updateAll = useCallback(
    (payload) => CK_brnd_brand_updateAll(payload),
    [],
  );
  const brand_update_name = useCallback(() => {}, []);
  const brand_update_tagline = useCallback(() => {}, []);
  const brand_update_files = useCallback(() => {}, []);
  const brand_update_socials = useCallback(() => {}, []);
  const brand_update_registeredIn = useCallback(() => {}, []);
  const brand_update_description = useCallback(() => {}, []);
  const brand_update_priceRange = useCallback(() => {}, []);
  const brand_update_cuisineTags = useCallback(() => {}, []);
  const brand_update_website = useCallback(() => {}, []);
  const brand_update_contracts = useCallback(() => {}, []);
  const brand_update_integrations = useCallback(() => {}, []);
  const brand_update_siblings = useCallback(() => {}, []);
  const brand_update_employees = useCallback(() => {}, []);
  const brand_update_equipments = useCallback(() => {}, []);
  const brand_update_branches = useCallback(() => {}, []);
  const brand_update_menus = useCallback(() => {}, []);
  const brand_update_competitors = useCallback(() => {}, []);
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
