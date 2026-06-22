import { Integration } from "../../../../../../../06_models/_models.index.js";
import { cK_gen_makeCreateSrv } from "../../../../_cK_gen_shared/cK_gen_crud_srv_utils.js";

const displayName = " | cK_gen_integration_create_srv.js | ";

export const cK_gen_integration_create_srv = cK_gen_makeCreateSrv({
  Model: Integration,
  entityLabel: "Integration",
  displayName,
});
