import {
  Input_text,
  Input_textArea,
} from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_salesPlatforms/ck_setup_salesPlatform_fields/cK_stp_slsPltf_fld.css";

const CK_stp_slsPltf_fld_basic = ({ states, handlers }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_slsPltf_fld cK_stp_slsPltf_fld--basic">
      <Input_text
        required
        labelProps={{ isActive: true, message: "Platform name" }}
        value={v.name ?? ""}
        onChange={set("name")}
        placeholder="e.g. Talabat"
        maxLength={80}
        lengthProps={{ isActive: true }}
      />

      <Input_textArea
        labelProps={{ isActive: true, message: "Notes" }}
        rows={2}
        value={v.notes ?? ""}
        onChange={set("notes")}
        placeholder="Internal notes about this platform"
        maxLength={500}
        lengthProps={{ isActive: true }}
      />
    </section>
  );
};

export default CK_stp_slsPltf_fld_basic;
