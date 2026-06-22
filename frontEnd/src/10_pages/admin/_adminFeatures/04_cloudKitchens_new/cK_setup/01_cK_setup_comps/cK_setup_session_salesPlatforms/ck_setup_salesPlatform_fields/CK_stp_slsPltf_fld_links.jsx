const CK_stp_slsPltf_fld_links = ({ states, handlers }) => {
  const v = states.values ?? {};
  const links = v.links ?? {};
  const set = (name) => (e) => handlers.onChange?.(name, e.target.value);

  return (
    <section className="cK_setup_form_section">
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Logo URL</span>
        <input
          className="cK_setup_form_input"
          type="url"
          value={links.logoUrl ?? ""}
          onChange={set("links.logoUrl")}
        />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Website URL</span>
        <input
          className="cK_setup_form_input"
          type="url"
          value={links.websiteUrl ?? ""}
          onChange={set("links.websiteUrl")}
        />
      </label>
      <label className="cK_setup_form_field">
        <span className="cK_setup_form_label">Partner portal URL</span>
        <input
          className="cK_setup_form_input"
          type="url"
          value={links.partnerPortalUrl ?? ""}
          onChange={set("links.partnerPortalUrl")}
        />
      </label>
    </section>
  );
};

export default CK_stp_slsPltf_fld_links;
