import { useCallback } from "react";
import {
  // Crud
  CK_gen_salesPlatform_create,
  CK_gen_salesPlatform_getAll,
  CK_gen_salesPlatform_getOne,
  CK_gen_salesPlatform_delete,
  CK_gen_salesPlatform_updateAll,
  // Fields
  CK_gen_salesPlatform_update_name,
  CK_gen_salesPlatform_update_notes,
  CK_gen_salesPlatform_update_links,
  CK_gen_salesPlatform_update_kam,
  CK_gen_salesPlatform_update_loginCredentials,
  CK_gen_salesPlatform_update_support,
} from "../../../../../../../05_helpers/_helpers.index.js";

export const useCK_setup_salesPlatforms_apiHlpr = ({ TOAST }) => {
  //   const brand_create = useCallback(() => {}, []);
  // Crud
  const slsPlatform_create = useCallback(() => {}, []);
  const slsPlatform_getAll = useCallback(() => {}, []);
  const slsPlatform_getOne = useCallback(() => {}, []);
  const slsPlatform_delete = useCallback(() => {}, []);
  const slsPlatform_updateAll = useCallback(() => {}, []);
  // Fields
  const slsPlatform_update_name = useCallback(() => {}, []);
  const slsPlatform_update_notes = useCallback(() => {}, []);
  const slsPlatform_update_links = useCallback(() => {}, []);
  const slsPlatform_update_kam = useCallback(() => {}, []);
  const slsPlatform_update_loginCredentials = useCallback(() => {}, []);
  const slsPlatform_update_support = useCallback(() => {}, []);
  return {
    apiHelpers: {
      // Crud
      slsPlatform_create,
      slsPlatform_getAll,
      slsPlatform_getOne,
      slsPlatform_delete,
      slsPlatform_updateAll,
      // Fields
      slsPlatform_update_name,
      slsPlatform_update_notes,
      slsPlatform_update_links,
      slsPlatform_update_kam,
      slsPlatform_update_loginCredentials,
      slsPlatform_update_support,
    },
  };
};
