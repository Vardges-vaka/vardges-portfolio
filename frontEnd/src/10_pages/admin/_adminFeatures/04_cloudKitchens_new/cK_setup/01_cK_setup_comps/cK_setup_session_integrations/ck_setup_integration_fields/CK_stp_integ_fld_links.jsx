const CK_stp_integ_fld_links = ({ states, handlers }) => {
  const links = states.values?.links ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);
  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Website URL</span>
        <input className="cK_setup_form_input" type="url" value={links.websiteUrl ?? ""} onChange={set("links.websiteUrl")} />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Portal URL</span>
        <input className="cK_setup_form_input" type="url" value={links.portalUrl ?? ""} onChange={set("links.portalUrl")} />
      </label>
    </section>
  );
};

export default CK_stp_integ_fld_links;
