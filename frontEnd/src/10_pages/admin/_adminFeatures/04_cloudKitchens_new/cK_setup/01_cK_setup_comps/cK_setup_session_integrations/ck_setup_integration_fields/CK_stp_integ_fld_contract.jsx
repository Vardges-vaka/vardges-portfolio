import { Input_text } from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_integrations/ck_setup_integration_fields/cK_stp_integ_fld.css";

const CK_stp_integ_fld_contract = ({ states, handlers }) => {
  const set = (e) => handlers.onChange?.("contract", e.target.value || null);

  return (
    <section className="cK_stp_integ_fld cK_stp_integ_fld--contract">
      <Input_text
        labelProps={{ isActive: true, message: "Contract ID" }}
        hintsProps={{
          isActive: true,
          type: "hint",
          message: "Read-only relation preview. Full relation editor coming soon.",
        }}
        value={states.values?.contract ?? ""}
        readOnly={!states.isEditOpen}
        onChange={set}
        placeholder="MongoDB ObjectId"
      />
    </section>
  );
};

export default CK_stp_integ_fld_contract;
