import { useCallback } from "react";
import {
  // Crud
  CK_gen_salesChannel_create,
  CK_gen_salesChannel_getAll,
  CK_gen_salesChannel_getOne,
  CK_gen_salesChannel_delete,
  CK_gen_salesChannel_updateAll,
  // Fields
  CK_gen_salesChannel_update_branch,
  CK_gen_salesChannel_update_brand,
  CK_gen_salesChannel_update_platform,
  CK_gen_salesChannel_update_storeUrl,
  CK_gen_salesChannel_update_storeIds,
  CK_gen_salesChannel_update_status,
  CK_gen_salesChannel_update_commissionPct,
  CK_gen_salesChannel_update_ratings,
  CK_gen_salesChannel_update_excludedMenuItems,
  CK_gen_salesChannel_update_notes,
} from "../../../../../../../05_helpers/_helpers.index";

export const useCK_setup_channels_apiHlpr = ({ TOAST }) => {
  //   const brand_create = useCallback(() => {}, []);
  /*

*/
  // crud
  const slsChannel_create = useCallback(() => {}, []);
  const slsChannel_getAll = useCallback(() => {}, []);
  const slsChannel_getOne = useCallback(() => {}, []);
  const slsChannel_delete = useCallback(() => {}, []);
  const slsChannel_updateAll = useCallback(() => {}, []);
  // Fields
  const slsChannel_update_branch = useCallback(() => {}, []);
  const slsChannel_update_brand = useCallback(() => {}, []);
  const slsChannel_update_platform = useCallback(() => {}, []);
  const slsChannel_update_storeUrl = useCallback(() => {}, []);
  const slsChannel_update_storeIds = useCallback(() => {}, []);
  const slsChannel_update_status = useCallback(() => {}, []);
  const slsChannel_update_commissionPct = useCallback(() => {}, []);
  const slsChannel_update_ratings = useCallback(() => {}, []);
  const slsChannel_update_excludedMenuItems = useCallback(() => {}, []);
  const slsChannel_update_notes = useCallback(() => {}, []);

  return {
    apiHelpers: {
      // crud
      slsChannel_create,
      slsChannel_getAll,
      slsChannel_getOne,
      slsChannel_delete,
      slsChannel_updateAll,
      // Fields
      slsChannel_update_branch,
      slsChannel_update_brand,
      slsChannel_update_platform,
      slsChannel_update_storeUrl,
      slsChannel_update_storeIds,
      slsChannel_update_status,
      slsChannel_update_commissionPct,
      slsChannel_update_ratings,
      slsChannel_update_excludedMenuItems,
      slsChannel_update_notes,
    },
  };
};
