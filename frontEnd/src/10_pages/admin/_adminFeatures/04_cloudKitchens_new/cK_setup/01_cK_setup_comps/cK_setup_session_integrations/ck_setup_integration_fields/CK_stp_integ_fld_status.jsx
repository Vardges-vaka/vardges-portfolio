import { Select_static } from "../../../../../../../../01_components/_components.index.js";
import { INTEGRATION_STATUS_OPTIONS } from "../../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const CK_stp_integ_fld_status = ({ states, handlers }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--status">
      <Select_static
        labelProps={{ isActive: true, message: "Status" }}
        options={INTEGRATION_STATUS_OPTIONS}
        placeholder="Pick one…"
        value={v.status ?? ""}
        onChange={set("status")}
      />
    </section>
  );
};

export default CK_stp_integ_fld_status;
