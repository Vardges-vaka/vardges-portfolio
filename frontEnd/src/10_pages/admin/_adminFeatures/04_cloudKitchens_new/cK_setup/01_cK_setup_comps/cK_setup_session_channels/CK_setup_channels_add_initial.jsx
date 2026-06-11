import "../../_styles/cK_setup_forms/cK_setup_addForm.css";

const CK_setup_channels_add_initial = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <div className="cK_setup_form">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Brand (id) <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.brand ?? ""}
          onChange={set("brand")}
        />
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Branch (id) <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.branch ?? ""}
          onChange={set("branch")}
        />
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">
          Platform (id) <span className="cK_setup_form_req">*</span>
        </span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.platform ?? ""}
          onChange={set("platform")}
        />
      </label>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Store URL</span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={v.storeUrl ?? ""}
          onChange={set("storeUrl")}
        />
      </label>
    </div>
  );
};

export default CK_setup_channels_add_initial;
