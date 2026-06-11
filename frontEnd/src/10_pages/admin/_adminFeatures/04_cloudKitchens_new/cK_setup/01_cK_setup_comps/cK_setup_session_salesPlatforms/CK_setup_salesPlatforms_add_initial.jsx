import "../../_styles/cK_setup_forms/cK_setup_addForm.css";

const CK_setup_salesPlatforms_add_initial = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <div className="cK_setup_form">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Platform name <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.name ?? ""}
          onChange={set("name")}
        />
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Notes</span>
        <textarea
          className="cK_setup_form_input cK_setup_form_textarea"
          rows={3}
          value={v.notes ?? ""}
          onChange={set("notes")}
        />
      </label>
    </div>
  );
};

export default CK_setup_salesPlatforms_add_initial;
