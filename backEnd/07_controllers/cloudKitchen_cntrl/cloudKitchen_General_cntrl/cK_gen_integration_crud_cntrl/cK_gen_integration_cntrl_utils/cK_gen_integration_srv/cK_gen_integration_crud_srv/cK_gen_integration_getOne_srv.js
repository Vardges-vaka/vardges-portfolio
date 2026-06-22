import { Integration } from "../../../../../../../06_models/_models.index.js";
import { cK_gen_makeGetOneSrv } from "../../../../_cK_gen_shared/cK_gen_crud_srv_utils.js";

const displayName = " | cK_gen_integration_getOne_srv.js | ";

export const cK_gen_integration_getOne_srv = cK_gen_makeGetOneSrv({
  Model: Integration,
  entityLabel: "Integration",
  displayName,
  populate: ["brands","branches","contract"],
});
