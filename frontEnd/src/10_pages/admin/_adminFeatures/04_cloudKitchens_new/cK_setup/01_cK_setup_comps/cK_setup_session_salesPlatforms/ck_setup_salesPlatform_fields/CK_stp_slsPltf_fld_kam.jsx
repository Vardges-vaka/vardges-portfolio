const CK_stp_slsPltf_fld_kam = ({ states, handlers }) => {
  const v = states.values ?? {};
  const kam = v.kam ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">KAM name</span>
        <input
          className="cK_setup_form_input"
          type="text"
          value={kam.name ?? ""}
          onChange={set("kam.name")}
        />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">KAM email</span>
        <input
          className="cK_setup_form_input"
          type="email"
          value={kam.email ?? ""}
          onChange={set("kam.email")}
        />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">KAM phone</span>
        <input
          className="cK_setup_form_input"
          type="tel"
          value={kam.phone ?? ""}
          onChange={set("kam.phone")}
        />
      </label>
    </section>
  );
};

export default CK_stp_slsPltf_fld_kam;
