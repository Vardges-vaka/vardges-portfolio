import { Integration } from "../../../../../../../06_models/_models.index.js";
import { cK_gen_makeUpdateSrv } from "../../../../_cK_gen_shared/cK_gen_crud_srv_utils.js";

const displayName = " | cK_gen_integration_update_contract_srv.js | ";

export const cK_gen_integration_update_contract_srv = cK_gen_makeUpdateSrv({
  Model: Integration,
  entityLabel: "Integration",
  displayName,
});
