const CK_stp_integ_fld_identity = ({ states, handlers }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Provider</span>
        <input className="cK_setup_form_input" type="text" value={v.provider ?? ""} onChange={set("provider")} />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Kind</span>
        <input className="cK_setup_form_input" type="text" value={v.kind ?? ""} onChange={set("kind")} />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Account label</span>
        <input className="cK_setup_form_input" type="text" value={v.accountLabel ?? ""} onChange={set("accountLabel")} />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Description</span>
        <textarea className="cK_setup_form_input cK_setup_form_textarea" rows={3} value={v.description ?? ""} onChange={set("description")} />
      </label>
    </section>
  );
};

export default CK_stp_integ_fld_identity;
