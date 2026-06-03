import { useCallback } from "react";
import {
  // Crud
  CK_gen_contract_create,
  CK_gen_contract_getAll,
  CK_gen_contract_getOne,
  CK_gen_contract_delete,
  CK_gen_contract_updateAll,
  // Fields
  CK_gen_contract_update_title,
  CK_gen_contract_update_description,
  CK_gen_contract_update_kind,
  CK_gen_contract_update_ownerType,
  CK_gen_contract_update_ownerId,
  CK_gen_contract_update_counterparty,
  CK_gen_contract_update_file,
  CK_gen_contract_update_effectiveFrom,
  CK_gen_contract_update_effectiveTo,
  CK_gen_contract_update_autoRenew,
  CK_gen_contract_update_terminationNoticeDays,
  CK_gen_contract_update_status,
  CK_gen_contract_update_commissionPct,
  CK_gen_contract_update_additionalCharges,
  CK_gen_contract_update_commitments,
  CK_gen_contract_update_payment,
  CK_gen_contract_update_history,
  CK_gen_contract_update_notes,
} from "../../../../../../../05_helpers/_helpers.index";

export const useCK_setup_contracts_apiHlpr = ({ TOAST }) => {
  // crud
  const contract_create = useCallback(() => {}, []);
  const contract_getAll = useCallback(() => {}, []);
  const contract_getOne = useCallback(() => {}, []);
  const contract_delete = useCallback(() => {}, []);
  const contract_updateAll = useCallback(() => {}, []);
  // Fields
  const contract_update_title = useCallback(() => {}, []);
  const contract_update_description = useCallback(() => {}, []);
  const contract_update_kind = useCallback(() => {}, []);
  const contract_update_ownerType = useCallback(() => {}, []);
  const contract_update_ownerId = useCallback(() => {}, []);
  const contract_update_counterparty = useCallback(() => {}, []);
  const contract_update_file = useCallback(() => {}, []);
  const contract_update_effectiveFrom = useCallback(() => {}, []);
  const contract_update_effectiveTo = useCallback(() => {}, []);
  const contract_update_autoRenew = useCallback(() => {}, []);
  const contract_update_terminationNoticeDays = useCallback(() => {}, []);
  const contract_update_status = useCallback(() => {}, []);
  const contract_update_commissionPct = useCallback(() => {}, []);
  const contract_update_additionalCharges = useCallback(() => {}, []);
  const contract_update_commitments = useCallback(() => {}, []);
  const contract_update_payment = useCallback(() => {}, []);
  const contract_update_history = useCallback(() => {}, []);
  const contract_update_notes = useCallback(() => {}, []);

  return {
    apiHelpers: {
      // crud
      contract_create,
      contract_getAll,
      contract_getOne,
      contract_delete,
      contract_updateAll,
      // Fields
      contract_update_title,
      contract_update_description,
      contract_update_kind,
      contract_update_ownerType,
      contract_update_ownerId,
      contract_update_counterparty,
      contract_update_file,
      contract_update_effectiveFrom,
      contract_update_effectiveTo,
      contract_update_autoRenew,
      contract_update_terminationNoticeDays,
      contract_update_status,
      contract_update_commissionPct,
      contract_update_additionalCharges,
      contract_update_commitments,
      contract_update_payment,
      contract_update_history,
      contract_update_notes,
    },
  };
};
