const CK_stp_slsPltf_fld_basic = ({ states, handlers }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Platform name</span>
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
    </section>
  );
};

export default CK_stp_slsPltf_fld_basic;
