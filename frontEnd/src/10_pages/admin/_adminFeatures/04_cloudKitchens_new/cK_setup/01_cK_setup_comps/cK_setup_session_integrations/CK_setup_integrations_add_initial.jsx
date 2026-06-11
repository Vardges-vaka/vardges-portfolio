import "../../_styles/cK_setup_forms/cK_setup_addForm.css";

const CK_setup_integrations_add_initial = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <div className="cK_setup_form">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Provider <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.provider ?? ""}
          onChange={set("provider")}
        />
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Kind <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.kind ?? ""}
          onChange={set("kind")}
        />
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Account label</span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.accountLabel ?? ""}
          onChange={set("accountLabel")}
        />
      </label>
    </div>
  );
};

export default CK_setup_integrations_add_initial;
