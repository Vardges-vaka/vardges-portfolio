import { SalesPlatform } from "../../../../../../../06_models/_models.index.js";
import { cK_gen_makeGetAllSrv } from "../../../../_cK_gen_shared/cK_gen_crud_srv_utils.js";

const displayName = " | cK_gen_salesPlatform_getAll_srv.js | ";

export const cK_gen_salesPlatform_getAll_srv = cK_gen_makeGetAllSrv({
  Model: SalesPlatform,
  entityLabel: "Sales platform",
  displayName,
  populate: [],
});
