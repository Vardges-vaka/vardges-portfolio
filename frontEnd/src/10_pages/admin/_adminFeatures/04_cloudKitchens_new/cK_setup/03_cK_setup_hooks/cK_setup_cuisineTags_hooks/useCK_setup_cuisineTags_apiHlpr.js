import { useCallback } from "react";
import {
  // Crud
  CK_gen_cuisineTag_create,
  CK_gen_cuisineTag_getAll,
  CK_gen_cuisineTag_getOne,
  CK_gen_cuisineTag_delete,
  CK_gen_cuisineTag_updateAll,
  // Fields
  CK_gen_cuisineTag_update_value,
  CK_gen_cuisineTag_update_label,
  CK_gen_cuisineTag_update_description,
  CK_gen_cuisineTag_update_platforms,
  CK_gen_cuisineTag_update_kind,
  CK_gen_cuisineTag_update_source,
} from "../../../../../../../05_helpers/_helpers.index";

export const useCK_setup_cuisineTags_apiHlpr = ({ TOAST }) => {
  //   const brand_create = useCallback(() => {}, []);

  // Crud
  const cuisTag_create = useCallback(
    (payload) => CK_gen_cuisineTag_create(payload),
    [],
  );
  const cuisTag_getAll = useCallback(() => CK_gen_cuisineTag_getAll(), []);
  const cuisTag_getOne = useCallback(() => {}, []);
  const cuisTag_delete = useCallback(() => {}, []);
  const cuisTag_updateAll = useCallback(
    (payload) => CK_gen_cuisineTag_updateAll(payload),
    [],
  );
  // Fields
  const cuisTag_update_value = useCallback(() => {}, []);
  const cuisTag_update_label = useCallback(() => {}, []);
  const cuisTag_update_description = useCallback(() => {}, []);
  const cuisTag_update_platforms = useCallback(() => {}, []);
  const cuisTag_update_kind = useCallback(() => {}, []);
  const cuisTag_update_source = useCallback(() => {}, []);

  return {
    apiHelpers: {
      // Crud
      cuisTag_create,
      cuisTag_getAll,
      cuisTag_getOne,
      cuisTag_delete,
      cuisTag_updateAll,
      // Fields
      cuisTag_update_value,
      cuisTag_update_label,
      cuisTag_update_description,
      cuisTag_update_platforms,
      cuisTag_update_kind,
      cuisTag_update_source,
    },
  };
};
