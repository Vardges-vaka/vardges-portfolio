const CK_stp_integ_fld_status = ({ states, handlers }) => {
  const v = states.values ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Status</span>
        <input className="cK_setup_form_input" type="text" value={v.status ?? ""} onChange={set("status")} />
      </label>
    </section>
  );
};

export default CK_stp_integ_fld_status;
