import { SalesPlatform } from "../../../../../../../06_models/_models.index.js";
import { cK_gen_makeGetOneSrv } from "../../../../_cK_gen_shared/cK_gen_crud_srv_utils.js";

const displayName = " | cK_gen_salesPlatform_getOne_srv.js | ";

export const cK_gen_salesPlatform_getOne_srv = cK_gen_makeGetOneSrv({
  Model: SalesPlatform,
  entityLabel: "Sales platform",
  displayName,
  populate: [],
});
