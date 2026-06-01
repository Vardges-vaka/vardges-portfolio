import { useCallback } from "react";
import {
  // crud
  CK_brnd_competitor_create,
  CK_brnd_competitor_getAll,
  CK_brnd_competitor_getOne,
  CK_brnd_competitor_delete,
  CK_brnd_competitor_updateAll,
  //   fields
  CK_brnd_competitor_update_name,
  CK_brnd_competitor_update_description,
  CK_brnd_competitor_update_menus,
  CK_brnd_competitor_update_priceRange,
  CK_brnd_competitor_update_cuisineTags,
  CK_brnd_competitor_update_files,
  CK_brnd_competitor_update_contact,
  CK_brnd_competitor_update_socialMedia,
  CK_brnd_competitor_update_globalObservations,
  CK_brnd_competitor_update_branches,
} from "../../../../../../05_helpers/_helpers.index.js";

export const useCK_competitors_apiHelpers = () => {
  //   crud
  const cmp_create = useCallback(() => {}, []);
  const cmp_getAll = useCallback(() => {}, []);
  const cmp_getOne = useCallback(() => {}, []);
  const cmp_delete = useCallback(() => {}, []);
  const cmp_updateAll = useCallback(() => {}, []);
  //   fields
  const cmp_update_name = useCallback(() => {}, []);
  const cmp_update_description = useCallback(() => {}, []);
  const cmp_update_menus = useCallback(() => {}, []);
  const cmp_update_priceRange = useCallback(() => {}, []);
  const cmp_update_cuisineTags = useCallback(() => {}, []);
  const cmp_update_files = useCallback(() => {}, []);
  const cmp_update_contact = useCallback(() => {}, []);
  const cmp_update_socialMedia = useCallback(() => {}, []);
  const cmp_update_globalObservations = useCallback(() => {}, []);
  const cmp_update_branches = useCallback(() => {}, []);

  return {
    apiHelpers: {
      //   crud
      cmp_create,
      cmp_getAll,
      cmp_getOne,
      cmp_delete,
      cmp_updateAll,
      //   fields
      cmp_update_name,
      cmp_update_description,
      cmp_update_menus,
      cmp_update_priceRange,
      cmp_update_cuisineTags,
      cmp_update_files,
      cmp_update_contact,
      cmp_update_socialMedia,
      cmp_update_globalObservations,
      cmp_update_branches,
    },
  };
};
