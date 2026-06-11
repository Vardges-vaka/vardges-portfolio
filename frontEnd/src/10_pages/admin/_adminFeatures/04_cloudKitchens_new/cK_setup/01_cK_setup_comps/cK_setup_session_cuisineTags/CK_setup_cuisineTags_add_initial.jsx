import "../../_styles/cK_setup_forms/cK_setup_addForm.css";

const CK_setup_cuisineTags_add_initial = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <div className="cK_setup_form">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Value (slug) <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.value ?? ""}
          onChange={set("value")}
        />
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Label <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.label ?? ""}
          onChange={set("label")}
        />
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Kind</span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.kind ?? ""}
          onChange={set("kind")}
        />
      </label>
    </div>
  );
};

export default CK_setup_cuisineTags_add_initial;
