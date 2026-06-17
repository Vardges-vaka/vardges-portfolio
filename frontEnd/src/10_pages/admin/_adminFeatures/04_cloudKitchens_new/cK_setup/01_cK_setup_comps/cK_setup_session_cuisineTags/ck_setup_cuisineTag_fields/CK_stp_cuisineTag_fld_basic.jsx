import {
  Input_text,
  Input_textArea,
} from "../../../../../../../../01_components/_components.index.js";
import "../../../_styles/cK_setup_session_cuisineTags/ck_setup_cuisineTag_fields/cK_stp_cuisineTag_fld_basic.css";

const CK_stp_cuisineTag_fld_basic = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_stp_cuisineTag_fld_basic">

      <div className="cK_setup_form_row">
        <Input_text
          required
          labelProps={{ isActive: true, message: "Value (slug)" }}
          value={v.value ?? ""}
          onChange={set("value")}
          placeholder="e.g. italian"
          data_field_name="value"
          maxLength={60}
          lengthProps={{ isActive: true }}
        />
        <Input_text
          required
          labelProps={{ isActive: true, message: "Label" }}
          value={v.label ?? ""}
          onChange={set("label")}
          placeholder="e.g. Italian"
          data_field_name="label"
          maxLength={80}
          lengthProps={{ isActive: true }}
        />
      </div>

      <Input_textArea
        labelProps={{ isActive: true, message: "Description" }}
        maxLength={2000}
        lengthProps={{ isActive: true }}
        rows={3}
        placeholder="Optional description for this cuisine tag"
        value={v.description ?? ""}
        onChange={set("description")}
      />
    </section>
  );
};

export default CK_stp_cuisineTag_fld_basic;
