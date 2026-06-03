import { useCallback } from "react";
import {
  // Crud
  CK_gen_integration_create,
  CK_gen_integration_getAll,
  CK_gen_integration_getOne,
  CK_gen_integration_delete,
  CK_gen_integration_updateAll,
  // Fields
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
} from "../../../../../../../05_helpers/_helpers.index";

export const useCK_setup_integrations_apiHlpr = ({ TOAST }) => {
  // crud
  const integration_create = useCallback(() => {}, []);
  const integration_getAll = useCallback(() => {}, []);
  const integration_getOne = useCallback(() => {}, []);
  const integration_delete = useCallback(() => {}, []);
  const integration_updateAll = useCallback(() => {}, []);
  // Fields
  const integration_update_provider = useCallback(() => {}, []);
  const integration_update_kind = useCallback(() => {}, []);
  const integration_update_accountLabel = useCallback(() => {}, []);
  const integration_update_description = useCallback(() => {}, []);
  const integration_update_status = useCallback(() => {}, []);
  const integration_update_lifecycle = useCallback(() => {}, []);
  const integration_update_links = useCallback(() => {}, []);
  const integration_update_payment = useCallback(() => {}, []);
  const integration_update_loginCredentials = useCallback(() => {}, []);
  const integration_update_kam = useCallback(() => {}, []);
  const integration_update_support = useCallback(() => {}, []);
  const integration_update_scheduledMaintenances = useCallback(() => {}, []);
  const integration_update_brands = useCallback(() => {}, []);
  const integration_update_branches = useCallback(() => {}, []);
  const integration_update_contract = useCallback(() => {}, []);
  const integration_update_files = useCallback(() => {}, []);
  const integration_update_notes = useCallback(() => {}, []);

  return {
    apiHelpers: {
      // crud
      integration_create,
      integration_getAll,
      integration_getOne,
      integration_delete,
      integration_updateAll,
      // Fields
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
