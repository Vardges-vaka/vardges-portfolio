import {
  Input_text,
  Select_static,
} from "../../../../../../../01_components/_components.index.js";
import { CUISINE_TYPES } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../_styles/cK_setup_forms/cK_setup_addForm.css";

const CK_setup_cuisineTags_add_initial = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  const kindOptions = CUISINE_TYPES.map((ct) => ({
    value: ct.value,
    label: ct.label,
    leftIcon: ct.logo,
  }));

  return (
    <div className="cK_setup_form">
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

      <Select_static
        optionsType="leftIcon"
        labelProps={{ isActive: true, message: "Kind" }}
        options={kindOptions}
        placeholder="Pick kind…"
        value={v.kind ?? ""}
        onChange={set("kind")}
      />
    </div>
  );
};

export default CK_setup_cuisineTags_add_initial;
