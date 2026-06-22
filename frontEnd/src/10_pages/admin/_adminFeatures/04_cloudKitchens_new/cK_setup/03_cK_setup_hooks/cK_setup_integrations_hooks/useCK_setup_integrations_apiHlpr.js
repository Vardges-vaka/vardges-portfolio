import { useCallback } from "react";
import {
  CK_gen_integration_create,
  CK_gen_integration_getAll,
  CK_gen_integration_getOne,
  CK_gen_integration_delete,
  CK_gen_integration_updateAll,
  CK_gen_integration_update_provider,
  CK_gen_integration_update_kind,
  CK_gen_integration_update_accountLabel,
  CK_gen_integration_update_description,
  CK_gen_integration_update_status,
  CK_gen_integration_update_lifecycle,
  CK_gen_integration_update_links,
  CK_gen_integration_update_payment,
  CK_gen_integration_update_loginCredentials,
  CK_gen_integration_update_kam,
  CK_gen_integration_update_support,
  CK_gen_integration_update_scheduledMaintenances,
  CK_gen_integration_update_brands,
  CK_gen_integration_update_branches,
  CK_gen_integration_update_contract,
  CK_gen_integration_update_files,
  CK_gen_integration_update_notes,
} from "../../../../../../../05_helpers/_helpers.index.js";

export const useCK_setup_integrations_apiHlpr = () => {
  const integration_create = useCallback(
    (payload) => CK_gen_integration_create(payload),
    [],
  );
  const integration_getAll = useCallback(() => CK_gen_integration_getAll(), []);
  const integration_getOne = useCallback(
    (payload) => CK_gen_integration_getOne(payload),
    [],
  );
  const integration_delete = useCallback(
    (payload) => CK_gen_integration_delete(payload),
    [],
  );
  const integration_updateAll = useCallback(
    (payload) => CK_gen_integration_updateAll(payload),
    [],
  );
  const integration_update_provider = useCallback(
    (payload) => CK_gen_integration_update_provider(payload),
    [],
  );
  const integration_update_kind = useCallback(
    (payload) => CK_gen_integration_update_kind(payload),
    [],
  );
  const integration_update_accountLabel = useCallback(
    (payload) => CK_gen_integration_update_accountLabel(payload),
    [],
  );
  const integration_update_description = useCallback(
    (payload) => CK_gen_integration_update_description(payload),
    [],
  );
  const integration_update_status = useCallback(
    (payload) => CK_gen_integration_update_status(payload),
    [],
  );
  const integration_update_lifecycle = useCallback(
    (payload) => CK_gen_integration_update_lifecycle(payload),
    [],
  );
  const integration_update_links = useCallback(
    (payload) => CK_gen_integration_update_links(payload),
    [],
  );
  const integration_update_payment = useCallback(
    (payload) => CK_gen_integration_update_payment(payload),
    [],
  );
  const integration_update_loginCredentials = useCallback(
    (payload) => CK_gen_integration_update_loginCredentials(payload),
    [],
  );
  const integration_update_kam = useCallback(
    (payload) => CK_gen_integration_update_kam(payload),
    [],
  );
  const integration_update_support = useCallback(
    (payload) => CK_gen_integration_update_support(payload),
    [],
  );
  const integration_update_scheduledMaintenances = useCallback(
    (payload) => CK_gen_integration_update_scheduledMaintenances(payload),
    [],
  );
  const integration_update_brands = useCallback(
    (payload) => CK_gen_integration_update_brands(payload),
    [],
  );
  const integration_update_branches = useCallback(
    (payload) => CK_gen_integration_update_branches(payload),
    [],
  );
  const integration_update_contract = useCallback(
    (payload) => CK_gen_integration_update_contract(payload),
    [],
  );
  const integration_update_files = useCallback(
    (payload) => CK_gen_integration_update_files(payload),
    [],
  );
  const integration_update_notes = useCallback(
    (payload) => CK_gen_integration_update_notes(payload),
    [],
  );

  return {
    apiHelpers: {
      integration_create,
      integration_getAll,
      integration_getOne,
      integration_delete,
      integration_updateAll,
      integration_update_provider,
      integration_update_kind,
      integration_update_accountLabel,
      integration_update_description,
      integration_update_status,
      integration_update_lifecycle,
      integration_update_links,
      integration_update_payment,
      integration_update_loginCredentials,
      integration_update_kam,
      integration_update_support,
      integration_update_scheduledMaintenances,
      integration_update_brands,
      integration_update_branches,
      integration_update_contract,
      integration_update_files,
      integration_update_notes,
    },
  };
};
