import { useCallback } from "react";
import {
  CK_gen_salesPlatform_create,
  CK_gen_salesPlatform_getAll,
  CK_gen_salesPlatform_getOne,
  CK_gen_salesPlatform_delete,
  CK_gen_salesPlatform_updateAll,
  CK_gen_salesPlatform_update_name,
  CK_gen_salesPlatform_update_notes,
  CK_gen_salesPlatform_update_links,
  CK_gen_salesPlatform_update_kam,
  CK_gen_salesPlatform_update_loginCredentials,
  CK_gen_salesPlatform_update_support,
} from "../../../../../../../05_helpers/_helpers.index.js";

export const useCK_setup_salesPlatforms_apiHlpr = () => {
  const slsPlatform_create = useCallback(
    (payload) => CK_gen_salesPlatform_create(payload),
    [],
  );
  const slsPlatform_getAll = useCallback(
    () => CK_gen_salesPlatform_getAll(),
    [],
  );
  const slsPlatform_getOne = useCallback(
    (payload) => CK_gen_salesPlatform_getOne(payload),
    [],
  );
  const slsPlatform_delete = useCallback(
    (payload) => CK_gen_salesPlatform_delete(payload),
    [],
  );
  const slsPlatform_updateAll = useCallback(
    (payload) => CK_gen_salesPlatform_updateAll(payload),
    [],
  );
  const slsPlatform_update_name = useCallback(
    (payload) => CK_gen_salesPlatform_update_name(payload),
    [],
  );
  const slsPlatform_update_notes = useCallback(
    (payload) => CK_gen_salesPlatform_update_notes(payload),
    [],
  );
  const slsPlatform_update_links = useCallback(
    (payload) => CK_gen_salesPlatform_update_links(payload),
    [],
  );
  const slsPlatform_update_kam = useCallback(
    (payload) => CK_gen_salesPlatform_update_kam(payload),
    [],
  );
  const slsPlatform_update_loginCredentials = useCallback(
    (payload) => CK_gen_salesPlatform_update_loginCredentials(payload),
    [],
  );
  const slsPlatform_update_support = useCallback(
    (payload) => CK_gen_salesPlatform_update_support(payload),
    [],
  );

  return {
    apiHelpers: {
      slsPlatform_create,
      slsPlatform_getAll,
      slsPlatform_getOne,
      slsPlatform_delete,
      slsPlatform_updateAll,
      slsPlatform_update_name,
      slsPlatform_update_notes,
      slsPlatform_update_links,
      slsPlatform_update_kam,
      slsPlatform_update_loginCredentials,
      slsPlatform_update_support,
    },
  };
};
