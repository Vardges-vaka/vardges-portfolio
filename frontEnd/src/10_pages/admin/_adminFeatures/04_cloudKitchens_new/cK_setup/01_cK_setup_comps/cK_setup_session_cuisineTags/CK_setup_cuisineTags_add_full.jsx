import "../../_styles/cK_setup_forms/cK_setup_addForm.css";

const SOURCE_OPTIONS = [
  { value: "scraped", label: "Scraped" },
  { value: "KAM", label: "KAM" },
  { value: "manual", label: "Manual" },
  { value: "other", label: "Other" },
];

const CK_setup_cuisineTags_add_full = ({ states, handlers, t }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <div className="cK_setup_form">
      <div className="cK_setup_form_row">
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
      </div>

      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Description</span>
        <textarea
          className="cK_setup_form_input cK_setup_form_textarea"
          rows={2}
          value={v.description ?? ""}
          onChange={set("description")}
        />
      </label>

      <div className="cK_setup_form_row">
        <label className="cK_setup_form_field">
          <span className="cK_setup_form_label">Kind</span>
          <input
            className="cK_setup_form_input"
            type="text"
            value={v.kind ?? ""}
            onChange={set("kind")}
          />
        </label>
        <label className="cK_setup_form_field">
          <span className="cK_setup_form_label">Source</span>
          <select
            className="cK_setup_form_input"
            value={v.source ?? ""}
            onChange={set("source")}>
            <option value="">— select —</option>
            {SOURCE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default CK_setup_cuisineTags_add_full;
