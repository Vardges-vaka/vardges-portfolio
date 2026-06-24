import { Input_textArea } from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const CK_stp_integ_fld_notes = ({ states, handlers }) => {
  const set = (e) => handlers.onChange?.("notes", e.target.value);

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--notes">
      <Input_textArea
        labelProps={{ isActive: true, message: "Notes" }}
        rows={4}
        value={states.values?.notes ?? ""}
        onChange={set}
        placeholder="Internal notes about this integration"
        maxLength={1000}
        lengthProps={{ isActive: true }}
      />
    </section>
  );
};

export default CK_stp_integ_fld_notes;
