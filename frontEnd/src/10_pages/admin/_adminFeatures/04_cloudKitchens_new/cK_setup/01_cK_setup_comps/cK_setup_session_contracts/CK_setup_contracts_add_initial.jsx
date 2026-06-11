import {
  CONTRACT_KIND_OPTIONS,
  CONTRACT_OWNER_TYPE_OPTIONS,
} from "../../05_cK_setup_cnst/_cK_setup_cnst.index.js";
import "../../_styles/cK_setup_forms/cK_setup_addForm.css";

const CK_setup_contracts_add_initial = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <div className="cK_setup_form">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Title <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.title ?? ""}
          onChange={set("title")}
        />
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Kind <span className="cK_setup_form_req">*</span>
        </span>
        <select
          className="cK_setup_form_input"
          value={v.kind ?? ""}
          onChange={set("kind")}>
          <option value="">— select —</option>
          {CONTRACT_KIND_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Owner type <span className="cK_setup_form_req">*</span>
        </span>
        <select
          className="cK_setup_form_input"
          value={v.ownerType ?? ""}
          onChange={set("ownerType")}>
          <option value="">— select —</option>
          {CONTRACT_OWNER_TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Counterparty name <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.counterparty?.name ?? ""}
          onChange={set("counterparty.name")}
        />
      </label>
    </div>
  );
};

export default CK_setup_contracts_add_initial;
