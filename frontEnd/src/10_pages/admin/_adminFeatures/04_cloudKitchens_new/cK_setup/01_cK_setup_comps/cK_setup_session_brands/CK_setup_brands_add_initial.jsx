import { Input_text } from "../../../../../../../01_components/_components.index.js";
import { PRICE_RANGE_OPTIONS } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import { TAGLINE_INFO } from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../_styles/cK_setup_forms/cK_setup_addForm.css";

const CK_setup_brands_add_initial = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <div className="cK_setup_form">
      <Input_text
        required={true}
        labelProps={{
          isActive: true,
          message: "Brand name",
        }}
        value={v.name ?? ""}
        onChange={set("name")}
        placeholder="Enter your Brand's name"
        data_field_name="name"
      />

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Price range</span>
        <select
          className="cK_setup_form_input"
          value={v.priceRange ?? ""}
          onChange={set("priceRange")}>
          <option value="">— select —</option>
          {PRICE_RANGE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <Input_text
        required={true}
        labelProps={{
          isActive: true,
          message: "Tagline",
        }}
        hintsProps={{
          isActive: true,
          type: "hint",
          message: TAGLINE_INFO,
        }}
        value={v.tagline?.value ?? ""}
        onChange={set("tagline.value")}
        placeholder="Enter your Brand's Tagline"
      />
    </div>
  );
};

export default CK_setup_brands_add_initial;
